import { useEffect, useState } from 'react'

const slides = [
  {
    title: 'What is Magic Bus?',
    body: 'Magic Bus works with young people to take them on a journey from childhood to livelihood and out of poverty through life skills education and employability skilling. [source](https://www.magicbus.org/#)',
  },
  {
    title: 'Childhood to Livelihood approach',
    body: 'Our Childhood to Livelihood approach tackles poverty-related issues, helping adolescents stay in school, build life skills and connect to sustainable livelihood opportunities. [source](https://www.magicbus.org/#)',
  },
  {
    title: 'Adolescent programmes',
    body: 'Activity-based sessions in schools and communities build confidence, resilience and leadership so adolescents can complete secondary education and make informed life choices. [source](https://www.magicbus.org/#)',
  },
  {
    title: 'Livelihood programmes',
    body: 'Youth skilling, career guidance and connect-with-work programmes equip young people with job-ready skills and link them to employment and entrepreneurship opportunities. [source](https://www.magicbus.org/#)',
  },
]

type QuizQuestion = {
  id: number
  question: string
  options: string[]
}

const quizPool: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the core mission of Magic Bus?',
    options: [
      'Providing sports coaching only',
      'Taking young people from childhood to livelihood and out of poverty',
      'Offering short-term loans to youth',
      'Running college entrance exams',
    ],
  },
  {
    id: 2,
    question: 'Which age group does Magic Bus primarily work with?',
    options: ['Infants', 'Adolescents and youth', 'Senior citizens', 'Corporates only'],
  },
  {
    id: 3,
    question: 'Which of these is a key part of Magic Bus programmes?',
    options: ['Life skills education', 'Space travel training', 'Stock trading tips', 'Car repair workshops'],
  },
  {
    id: 4,
    question: 'Where does Magic Bus mainly operate?',
    options: ['India and select international locations', 'Only in Europe', 'Only in South America', 'Worldwide in every country'],
  },
  {
    id: 5,
    question: 'How does Magic Bus help youth find jobs?',
    options: [
      'Youth skilling and connect-with-work programmes',
      'Selling online courses only',
      'Providing free gadgets',
      'Investing in real estate',
    ],
  },
]

function pickRandomQuestions(pool: QuizQuestion[], count: number): QuizQuestion[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuizQuestions(pickRandomQuestions(quizPool, 3))
      setShowQuiz(true)
    }, 60_000)
    return () => clearTimeout(timer)
  }, [])

  const handleQuizChange = (questionId: number, option: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: option }))
  }

  const handleQuizSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setHasSubmittedQuiz(true)
    setTimeout(() => {
      setShowQuiz(false)
    }, 800)
  }

  const answeredCount = quizQuestions.filter((q) => quizAnswers[q.id]).length
  const progress = quizQuestions.length ? (answeredCount / quizQuestions.length) * 100 : 0

  const slide = slides[currentSlide]

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900 flex flex-col">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 lg:px-0 flex items-center justify-between py-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">MB</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">Magic Bus</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <button className="hover:text-slate-900 transition">Product</button>
            <button className="hover:text-slate-900 transition">Why us</button>
            <button className="hover:text-slate-900 transition">About us</button>
            <button className="hover:text-slate-900 transition">Cases</button>
            <button className="hover:text-slate-900 transition">Blog</button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="hidden md:inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
              onClick={() => {
                setQuizQuestions(pickRandomQuestions(quizPool, 3))
                setQuizAnswers({})
                setHasSubmittedQuiz(false)
                setShowQuiz(true)
              }}
            >
              Take quiz
            </button>
            <button className="hidden sm:inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition">
              Book a demo
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition">
              English
              <span className="ml-1 text-xs">▾</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
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

        {/* What is Magic Bus - Slideshow */}
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
                programmes that improve education, build life skills and connect youth to sustainable livelihoods. [source](https://www.magicbus.org/#)
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
                      onClick={() => setCurrentSlide(index)}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-0 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-medium text-slate-700 mb-1">Magic Bus (demo)</p>
            <p>Supporting young people across India on their journey from childhood to livelihood. [source](https://www.magicbus.org/#)</p>
          </div>
          <div className="flex gap-6">
            <button className="hover:text-slate-800 transition">Privacy</button>
            <button className="hover:text-slate-800 transition">Terms</button>
            <button className="hover:text-slate-800 transition">Contact</button>
          </div>
        </div>
      </footer>

      {/* Cookie banner */}
      {/* Cookie banner */}
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

      {/* Quiz popup */}
      {showQuiz && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="max-w-lg w-full rounded-3xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.28)] border border-slate-200 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-1">
                  Quick quiz
                </p>
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                  How well do you know Magic Bus?
                </h3>
              </div>
              <button
                className="text-slate-400 hover:text-slate-700 text-xl leading-none"
                onClick={() => setShowQuiz(false)}
                aria-label="Close quiz"
              >
                ×
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500">
                  {answeredCount}/{quizQuestions.length} answered
                </span>
                <span className="text-xs text-slate-500">Progress</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleQuizSubmit} className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
              {quizQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-5 sm:py-4"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-1">
                    Question {index + 1}
                  </p>
                  <p className="text-sm font-medium text-slate-900 mb-3">{question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option) => {
                      const checked = quizAnswers[question.id] === option
                      return (
                        <label
                          key={option}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs sm:text-sm cursor-pointer transition ${
                            checked
                              ? 'border-emerald-400 bg-white'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={checked}
                            onChange={() => handleQuizChange(question.id, option)}
                            className="h-3.5 w-3.5 accent-emerald-500"
                          />
                          <span className="text-slate-700">{option}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-500">
                  This is just a demo — your answers are not stored.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={answeredCount < quizQuestions.length}
                >
                  {hasSubmittedQuiz ? 'Thanks!' : 'Submit quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
