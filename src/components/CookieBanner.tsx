export default function CookieBanner() {
  return (
    <div className="fixed inset-x-0 bottom-0">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 pb-4">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-md px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
              🍪
            </div>
            <p className="text-slate-600">
              Cookie Time – We use cookies to enhance your experience. Learn more in our{' '}
              <button className="underline underline-offset-2 hover:text-slate-900">
                Cookie Policy
              </button>
              .
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition">
              Reject
            </button>
            <button className="px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

