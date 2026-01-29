import { slides } from '../constants'

interface SlideshowProps {
  currentSlide: number
  onSlideChange: (index: number) => void
}

export default function Slideshow({ currentSlide, onSlideChange }: SlideshowProps) {
  const slide = slides[currentSlide]

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-12 lg:py-16 grid lg:grid-cols-[1.1fr,1.2fr] gap-10 items-center">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 mb-3">
            What is Magic Bus
          </h2>
          <p className="text-3xl font-semibold tracking-tight mb-4">
            From childhood to livelihood, out of poverty.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-lg">
            Magic Bus tackles poverty-related issues affecting young people in underserved communities with
            programmes that improve education, build life skills and connect youth to sustainable livelihoods.
          </p>
          <p className="text-xs text-slate-500">
            The highlights on the right rotate automatically every 3 seconds.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 shadow-sm p-6 sm:p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-slate-500">
                Magic Bus highlights
              </span>
              <span className="text-xs text-slate-500">
                {currentSlide + 1}/{slides.length}
              </span>
            </div>
            <div className="transition-opacity duration-500">
              <h3 className="text-lg font-semibold mb-2">{slide.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{slide.body}</p>
            </div>

            {/* Progress dots */}
            <div className="mt-6 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onSlideChange(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentSlide ? 'w-8 bg-slate-900' : 'w-3 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

