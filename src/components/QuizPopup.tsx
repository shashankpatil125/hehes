import { type FormEvent } from 'react'
import { AGE_OPTIONS, EDUCATION_OPTIONS, INTEREST_OPTIONS, MAX_INTERESTS } from '../constants'

interface QuizPopupProps {
  show: boolean
  onClose: () => void
  ageRange: string
  education: string
  interests: string[]
  hasSubmitted: boolean
  onAgeChange: (value: string) => void
  onEducationChange: (value: string) => void
  onInterestToggle: (option: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function QuizPopup({
  show,
  onClose,
  ageRange,
  education,
  interests,
  hasSubmitted,
  onAgeChange,
  onEducationChange,
  onInterestToggle,
  onSubmit,
}: QuizPopupProps) {
  const interestsValid = interests.length > 0 && interests.length <= MAX_INTERESTS
  const answeredCount =
    (ageRange ? 1 : 0) + (education ? 1 : 0) + (interests.length > 0 ? 1 : 0)
  const progress = (answeredCount / 3) * 100

  if (!show) return null

  return (
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
            onClick={onClose}
            aria-label="Close quiz"
          >
            ×
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500">
              {answeredCount}/3 answered
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

        <form onSubmit={onSubmit} className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          {/* Q1: Age range */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-1">
              Question 1
            </p>
            <p className="text-sm font-medium text-slate-900 mb-3">
              What is your age range?
            </p>
            <div className="relative">
              <select
                value={ageRange}
                onChange={(e) => onAgeChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:outline-none"
              >
                <option value="">Select age range</option>
                {AGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
                ▾
              </span>
            </div>
          </div>

          {/* Q2: Education */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-1">
              Question 2
            </p>
            <p className="text-sm font-medium text-slate-900 mb-3">
              What is your highest level of education?
            </p>
            <div className="relative">
              <select
                value={education}
                onChange={(e) => onEducationChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:outline-none"
              >
                <option value="">Select education</option>
                {EDUCATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
                ▾
              </span>
            </div>
          </div>

          {/* Q3: Interests multi-select */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-1">
              Question 3
            </p>
            <p className="text-sm font-medium text-slate-900 mb-2">
              What are you most interested in? (Select up to {MAX_INTERESTS})
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Tap to select or deselect interests. Your selections will appear below.
            </p>
            <div
              className={`relative mb-2 rounded-xl border bg-white px-3 py-2 shadow-sm min-h-[80px] max-h-40 overflow-y-auto ${
                interests.length === 0
                  ? 'border-slate-200'
                  : interestsValid
                  ? 'border-emerald-400'
                  : 'border-rose-300'
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((option) => {
                  const selected = interests.includes(option)
                  const disabled = !selected && interests.length >= MAX_INTERESTS
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onInterestToggle(option)}
                      disabled={disabled}
                      className={`rounded-full border px-3 py-1 text-xs sm:text-xs transition ${
                        selected
                          ? 'border-emerald-400 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500">
                Selected {interests.length}/{MAX_INTERESTS} interests
              </p>
              {!interestsValid && interests.length > 0 && (
                <p className="text-[11px] text-rose-500">
                  You can select up to {MAX_INTERESTS} interests.
                </p>
              )}
            </div>

          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-slate-500">
              This is just a demo — your answers are not stored.
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={answeredCount < 3 || !interestsValid}
            >
              {hasSubmitted ? 'Thanks!' : 'Submit quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

