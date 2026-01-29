import Navbar from '../components/Navbar'

interface ProgressStage {
  stage: string
  description: string
  duration: string
}

// Single user's interest path (e.g., from user profile/quiz)
const USER_INTEREST = 'Software' // This would come from user data/API

const PROGRESS_PATH: ProgressStage[] = [
  {
    stage: 'Foundation',
    description: 'Basic programming concepts and logic building',
    duration: '2 weeks',
  },
  {
    stage: 'Core Skills',
    description: 'Learn a programming language (Python/JavaScript)',
    duration: '2 weeks',
  },
  {
    stage: 'Projects',
    description: 'Build real-world applications and portfolio',
    duration: '2 weeks',
  },
  {
    stage: 'Internship',
    description: 'Gain industry experience and mentorship',
    duration: '2 weeks',
  },
]

// Total duration for complete path: 1.5-2 months (6-8 weeks total)
const TOTAL_DURATION = '1.5-2 months'

// Current progress stage (0-indexed) - user is currently at "Core Skills" (index 1)
const CURRENT_STAGE_INDEX = 1

// Courses for Technology/Software interest
const COURSES = [
  { name: 'Digital basics expert', status: 'completed' },
  { name: 'Introduction to AI', status: 'completed' },
  { name: 'AI in daily life', status: 'in-progress' },
  { name: 'Coding fundamentals', status: 'not-started' },
]

// Soft skills developed
const SOFT_SKILLS = [
  'Communication',
  'Problem Solving',
  'Teamwork',
  'Time Management',
  'Critical Thinking',
]

export default function UserPage() {
  const progressPath = PROGRESS_PATH

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900 flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-10 flex-1 w-full">
        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2">
              Student Progress
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Your Learning Path
            </h1>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100">
              <span className="text-sm font-medium text-slate-700">Your Interest:</span>
              <span className="text-sm font-semibold text-slate-900">{USER_INTEREST}</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-6">
              Your Progress Path
            </h2>

            {/* Timeline Chart */}
            <div className="relative">
              {/* Vertical line - ends exactly at Internship circle center */}
              <div
                className="absolute left-4 top-0 w-0.5"
                style={{
                  height: `calc(${((progressPath.length - 1) / progressPath.length) * 100}% + 1rem)`,
                  background: 'linear-gradient(to bottom, #10b981 0%, #10b981 50%, #e2e8f0 50%, #e2e8f0 100%)',
                }}
              />

              {/* Progress stages */}
              <div className="space-y-8">
                {progressPath.map((step, index) => {
                  const isCompleted = index < CURRENT_STAGE_INDEX
                  const isCurrent = index === CURRENT_STAGE_INDEX

                  return (
                    <div key={index} className="relative flex items-start gap-6">
                      {/* Circle indicator */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={[
                            'h-8 w-8 rounded-full border-2 flex items-center justify-center',
                            isCompleted
                              ? 'bg-emerald-500 border-emerald-500'
                              : isCurrent
                                ? 'bg-emerald-500 border-emerald-500 ring-4 ring-emerald-100'
                                : 'bg-white border-slate-300',
                          ].join(' ')}
                        >
                          {isCompleted ? (
                            <svg
                              className="h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : isCurrent ? (
                            <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-slate-300" />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3
                                className={[
                                  'text-base font-semibold',
                                  isCurrent ? 'text-emerald-700' : 'text-slate-900',
                                ].join(' ')}
                              >
                                {step.stage}
                              </h3>
                              {isCurrent && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                  Current
                                </span>
                              )}
                              {isCompleted && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                                  Completed
                                </span>
                              )}
                            </div>
                            <p
                              className={[
                                'text-sm mt-1',
                                isCurrent ? 'text-slate-700' : 'text-slate-600',
                              ].join(' ')}
                            >
                              {step.description}
                            </p>
                          </div>
                          <span
                            className={[
                              'text-xs font-medium whitespace-nowrap',
                              isCurrent ? 'text-emerald-600' : 'text-slate-500',
                            ].join(' ')}
                          >
                            {step.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Current Status:</span> You are currently working
                  on <span className="font-semibold text-emerald-700">{progressPath[CURRENT_STAGE_INDEX]?.stage}</span> stage.
                  Keep up the great progress!
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  <span className="font-semibold">Total Path Duration:</span> {TOTAL_DURATION} to complete all stages and become job-ready.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Completed Section */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-6">
            Courses Completed
          </h2>

          {/* Courses Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-4 top-0 w-0.5"
              style={{
                height: `calc(${((COURSES.length - 1) / COURSES.length) * 100}% + 1rem)`,
                background: 'linear-gradient(to bottom, #10b981 0%, #10b981 60%, #fbbf24 60%, #fbbf24 80%, #e2e8f0 80%, #e2e8f0 100%)',
              }}
            />

            <div className="space-y-6">
              {COURSES.map((course, index) => {
                const isCompleted = course.status === 'completed'
                const isInProgress = course.status === 'in-progress'
                const isNotStarted = course.status === 'not-started'

                return (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Circle indicator */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={[
                          'h-8 w-8 rounded-full border-2 flex items-center justify-center',
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-500'
                            : isInProgress
                              ? 'bg-amber-500 border-amber-500 ring-4 ring-amber-100'
                              : 'bg-white border-slate-300',
                        ].join(' ')}
                      >
                        {isCompleted ? (
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : isInProgress ? (
                          <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-slate-300" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-slate-900">
                              {course.name}
                            </h3>
                            {isCompleted && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                                Completed
                              </span>
                            )}
                            {isInProgress && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                In Progress
                              </span>
                            )}
                            {isNotStarted && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                Not Started
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Soft Skills Developed Section */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-6">
            Soft Skills Developed
          </h2>

          <div className="flex flex-wrap gap-3">
            {SOFT_SKILLS.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200"
              >
                <svg
                  className="h-4 w-4 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm font-medium text-emerald-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

