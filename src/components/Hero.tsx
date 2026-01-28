export default function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 py-12 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
      {/* Left column: hero */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-4">
          Magic Bus for organisations
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] leading-tight font-semibold tracking-tight mb-6">
          Put{' '}
          <span className="underline decoration-[3px] decoration-lime-400 underline-offset-[10px]">
            people
          </span>{' '}
          first
        </h1>
        <p className="text-base leading-relaxed text-slate-600 mb-8 max-w-xl">
          Magic Bus works with young people to move them out of poverty, helping adolescents finish secondary education and enabling youth to secure sustainable jobs through life skills and employability skilling. [source](https://www.magicbus.org/#)
        </p>

        {/* Email + CTA */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center max-w-md rounded-full border border-slate-200 bg-white shadow-sm overflow-hidden">
            <input
              type="email"
              placeholder="Enter work email"
              className="flex-1 px-5 py-3 text-sm outline-none placeholder:text-slate-400"
            />
            <button className="sm:ml-1 mt-2 sm:mt-0 sm:w-auto w-full px-6 py-3 text-sm font-semibold bg-emerald-400 hover:bg-emerald-500 text-slate-900 transition">
              Get involved
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 border-t border-slate-200 pt-8 mt-4">
          <div>
            <p className="text-3xl font-semibold mb-1">4M+</p>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Young people reached
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold mb-1">30+</p>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              States &amp; UTs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span className="text-slate-300">★</span>
            </div>
            <div className="text-sm text-slate-700">
              <span className="font-semibold">4.5</span>
              <span className="ml-1 text-xs text-slate-500">Average user rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right column: illustration placeholder */}
      <section className="relative">
        <div className="rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] px-8 py-10 lg:px-10 lg:py-12">
          <div className="h-64 sm:h-72 lg:h-80 grid place-items-center">
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden">
              <div className="absolute inset-6 rounded-2xl border border-dashed border-slate-200" />
              <div className="absolute left-8 top-8 h-10 w-32 rounded-2xl bg-white shadow-sm border border-slate-200" />
              <div className="absolute right-10 top-16 h-20 w-40 rounded-2xl bg-white shadow-sm border border-slate-200" />
              <div className="absolute left-10 bottom-10 h-16 w-40 rounded-2xl bg-white shadow-sm border border-slate-200" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

