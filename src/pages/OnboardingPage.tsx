import Navbar from '../components/Navbar'
import OnboardingProcessPanel from '../components/admin/OnboardingProcessPanel'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900 flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-10 flex-1 w-full">
        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2">
              Onboarding
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Onboarding Process
            </h1>
          </div>
        </div>

        <OnboardingProcessPanel />
      </div>
    </div>
  )
}

