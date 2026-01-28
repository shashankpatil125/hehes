interface ResultPopupProps {
  show: boolean
  onClose: () => void
  resultData: unknown | null
}

export default function ResultPopup({ show, onClose, resultData }: ResultPopupProps) {
  if (!show) return null

  const anyResult = resultData as any
  // The API response is stored in resultData.recommendation
  // Recommendation might be a JSON string that needs parsing (double-encoded JSON)
  let rec: any = {}
  
  // First, get the recommendation value (could be nested or direct)
  let recommendationValue = anyResult?.recommendation ?? anyResult
  
  // Handle the case where the entire response is a string
  if (typeof recommendationValue === 'string') {
    try {
      // Try to parse the JSON string
      // The API returns: "{\n    \"salary\": \"35K-50K\", ...}" which is a JSON string
      rec = JSON.parse(recommendationValue)
    } catch (e) {
      console.error('Failed to parse recommendation string:', e, 'Value:', recommendationValue)
      rec = {}
    }
  } else if (recommendationValue && typeof recommendationValue === 'object') {
    // If it's already an object, check if it has the fields directly
    if (recommendationValue.salary || recommendationValue.growth_potential || recommendationValue.industry_sector) {
      rec = recommendationValue
    } else {
      rec = {}
    }
  }
  
  // Extract actual values from API response - handle both string and number types
  const salaryText =
    rec?.salary !== undefined && rec?.salary !== null && rec?.salary !== ''
      ? String(rec.salary)
      : null
  const growthText =
    rec?.growth_potential !== undefined && rec?.growth_potential !== null && rec?.growth_potential !== ''
      ? String(rec.growth_potential)
      : null
  const sectorText =
    rec?.industry_sector !== undefined && rec?.industry_sector !== null && rec?.industry_sector !== ''
      ? String(rec.industry_sector)
      : null
  
  // Debug log to see what we're extracting
  if (resultData) {
    console.log('Result data:', resultData)
    console.log('Recommendation value (before parse):', recommendationValue)
    console.log('Parsed recommendation:', rec)
    console.log('Extracted - salaryText:', salaryText, 'growthText:', growthText, 'sectorText:', sectorText)
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="max-w-lg w-full rounded-3xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.28)] border border-slate-200 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-1">
              Based on alumni journeys
            </p>
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">
              Your possible pathway from childhood to livelihood
            </h3>
          </div>
          <button
            className="text-slate-400 hover:text-slate-700 text-xl leading-none"
            onClick={onClose}
            aria-label="Close result"
          >
            ×
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          This message is based on young people like you who were part of Magic Bus. Think of it
          as a friendly hint about what your future could look like.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-5 sm:py-4 mb-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">
            Simple story for you
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white border border-slate-200 px-3 py-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">
                💰 Salary
              </p>
              <p className="text-sm font-medium text-slate-900 break-words">
                {salaryText ?? '—'}
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-3 py-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">
                📈 Growth
              </p>
              <p className="text-sm font-medium text-slate-900 break-words">
                {growthText ?? '—'}
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-3 py-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">
                🏢 Sector
              </p>
              <p className="text-sm font-medium text-slate-900 break-words">
                {sectorText ?? '—'}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          There is no one perfect road. Like our alumni, you can try, learn and slowly find the
          work that makes you feel proud and happy.
        </p>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

