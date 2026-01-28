import { useState } from 'react'

export default function RiskAnalysisPanel() {
  const [studentId, setStudentId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<unknown | null>(null)

  const handleCheckRisk = async () => {
    const trimmed = studentId.trim()
    if (!trimmed || loading) return
    if (!/^\d+$/.test(trimmed)) {
      setError('Please enter a valid numeric student ID.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Use the Vite proxy: /students/* → https://maurita-affine-elouise.ngrok-free.dev/*
      const url = `/students/${trimmed}`
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const data = await res.json()
      setResult(data)
    } catch (e) {
      console.error('Error calling student risk API:', e)
      setError('Something went wrong while fetching dropout risk. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
      <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
        Risk analysis
      </h2>
      <p className="text-sm text-slate-600 mt-1">
        Enter a student ID to see their dropout risk and explanation.
      </p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
          Student ID
        </label>
        <input
          type="number"
          min={0}
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          placeholder="e.g. 5"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            We&apos;ll call the student risk service with this ID.
          </p>
          <button
            type="button"
            onClick={handleCheckRisk}
            disabled={loading || !studentId.trim()}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs sm:text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition"
          >
            {loading ? 'Checking…' : 'Check risk'}
          </button>
        </div>
      </div>

      {(error || result !== null) && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800">
          {error ? (
            <p className="text-red-600 text-sm">{error}</p>
          ) : (
            (() => {
              const anyResult = result as any
              const risk: string | null =
                typeof anyResult?.dropout_risk === 'string' ? anyResult.dropout_risk : null
              const explanationContent: string | null =
                typeof anyResult?.explanation?.choices?.[0]?.message?.content === 'string'
                  ? anyResult.explanation.choices[0].message.content
                  : null

              let badgeClasses =
                'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold'
              if (risk?.toLowerCase() === 'low') {
                badgeClasses += ' bg-emerald-100 text-emerald-800'
              } else if (risk?.toLowerCase() === 'medium') {
                badgeClasses += ' bg-amber-100 text-amber-800'
              } else if (risk?.toLowerCase() === 'high') {
                badgeClasses += ' bg-rose-100 text-rose-800'
              } else {
                badgeClasses += ' bg-slate-100 text-slate-800'
              }

              return (
                <div className="space-y-3">
                  {risk && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-[0.18em]">
                        Dropout risk
                      </span>
                      <span className={badgeClasses}>{risk}</span>
                    </div>
                  )}

                  {explanationContent && (
                    <div className="text-xs sm:text-sm leading-normal whitespace-pre-wrap">
                      {(() => {
                        // Parse **text** into bold formatting
                        const parts = explanationContent.split(/(\*\*.*?\*\*)/g)
                        return parts.map((part, idx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            // Remove the ** markers and render as bold
                            const boldText = part.slice(2, -2)
                            return (
                              <strong key={idx} className="font-semibold">
                                {boldText}
                              </strong>
                            )
                          }
                          return <span key={idx}>{part}</span>
                        })
                      })()}
                    </div>
                  )}
                </div>
              )
            })()
          )}
        </div>
      )}
    </div>
  )
}

