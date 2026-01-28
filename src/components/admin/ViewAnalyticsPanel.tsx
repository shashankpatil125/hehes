import { useState } from 'react'

export default function ViewAnalyticsPanel() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [answer, setAnswer] = useState<unknown | null>(null)

  const handleAsk = async () => {
    const trimmed = question.trim()
    if (!trimmed || loading) return

    setLoading(true)
    setError(null)
    setAnswer(null)

    try {
      const payload = { question: trimmed }
      const res = await fetch(
        'https://moonily-straticulate-jammie.ngrok-free.dev/campaign-recommendations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const data = await res.json()
      setAnswer(data)
    } catch (e) {
      console.error('Error calling campaign-recommendations API:', e)
      setError('Something went wrong while fetching recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
            Search campaign recommendations
          </h2>
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
          Question
        </label>
        <textarea
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 min-h-[80px] resize-vertical"
          placeholder="Ask about your campaign performance, e.g. “How can I improve click-through rate for my latest campaign?”"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            We&apos;ll send this question to the campaign recommendations engine.
          </p>
          <button
            type="button"
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs sm:text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition"
          >
            {loading ? 'Asking…' : 'Ask'}
          </button>
        </div>
      </div>

      {(error || answer !== null) && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800">
          {error ? (
            <p className="text-red-600 text-sm">{error}</p>
          ) : (
            (() => {
              const anyAnswer = answer as any

              const rawLlmResponse: string | null =
                typeof anyAnswer?.llm_response === 'string' ? anyAnswer.llm_response : null
              const chartType: string | null =
                anyAnswer?.chart_type != null ? String(anyAnswer.chart_type) : null
              const chartBase64: string | null =
                typeof anyAnswer?.chart_base64 === 'string' && anyAnswer.chart_base64
                  ? anyAnswer.chart_base64
                  : null

              let recommendedDistricts: any[] = []

              if (rawLlmResponse) {
                // Strip Markdown ```json fences if present
                let cleaned = rawLlmResponse.trim()
                if (cleaned.startsWith('```')) {
                  cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, '')
                  if (cleaned.endsWith('```')) {
                    cleaned = cleaned.replace(/```$/, '')
                  }
                }
                try {
                  const parsed = JSON.parse(cleaned)
                  if (Array.isArray(parsed?.recommended_districts)) {
                    recommendedDistricts = parsed.recommended_districts
                  }
                } catch (parseErr) {
                  console.error('Failed to parse llm_response JSON:', parseErr, rawLlmResponse)
                }
              }

              return (
                <div className="space-y-4">
                  {chartType && chartBase64 && (
                    <div className="flex flex-col items-center">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-[0.18em] mb-2 text-center">
                        {chartType} chart
                      </p>
                      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white w-3/4">
                        <img
                          src={`data:image/png;base64,${chartBase64}`}
                          alt="Campaign recommendations chart"
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  )}

                  {recommendedDistricts.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-left">
                            <th className="px-3 py-2 font-semibold text-slate-700">District</th>
                            <th className="px-3 py-2 font-semibold text-slate-700">Why</th>
                            <th className="px-3 py-2 font-semibold text-slate-700">
                              Priority schools
                            </th>
                            <th className="px-3 py-2 font-semibold text-slate-700">
                              Recommended action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {recommendedDistricts.map((row, idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                            >
                              <td className="align-top px-3 py-2 font-medium text-slate-900">
                                {row?.district ?? '—'}
                              </td>
                              <td className="align-top px-3 py-2 text-slate-700">
                                {row?.why ?? '—'}
                              </td>
                              <td className="align-top px-3 py-2 text-slate-700">
                                {row?.priority_schools ?? '—'}
                              </td>
                              <td className="align-top px-3 py-2 text-slate-700">
                                {row?.recommended_action ?? '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      No structured recommendations were found in the response.
                    </p>
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