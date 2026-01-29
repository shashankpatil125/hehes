import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import RiskAnalysisPanel from '../components/admin/RiskAnalysisPanel'
import ViewAnalyticsPanel from '../components/admin/ViewAnalyticsPanel'

type DashboardTabKey = 'analytics' | 'risk'

function MusicIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="7" cy="18" r="3" />
      <circle cx="19" cy="16" r="3" />
    </svg>
  )
}

function VideoIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M16 13l5 3V8l-5 3" />
      <rect x="3" y="6" width="13" height="12" rx="2" />
    </svg>
  )
}

export default function AdminDashboard() {
  const tabs = useMemo(
    () =>
      [
        {
          key: 'analytics' as const,
          label: 'View analytics',
          Icon: MusicIcon,
        },
        {
          key: 'risk' as const,
          label: 'Risk analysis',
          Icon: VideoIcon,
        },
      ] as const,
    [],
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = searchParams.get('tab') as DashboardTabKey | null
  const [activeTab, setActiveTab] = useState<DashboardTabKey>(
    tabFromUrl && ['analytics', 'risk'].includes(tabFromUrl) ? tabFromUrl : 'analytics',
  )

  useEffect(() => {
    if (tabFromUrl && ['analytics', 'risk'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl)
    }
  }, [tabFromUrl])

  const handleTabChange = (tab: DashboardTabKey) => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900 flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-10 flex-1 w-full">
        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2">
              Admin dashboard
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Analytics</h1>
          </div>
        </div>

        {/* Segmented tabs */}
        <div className="inline-flex w-full max-w-2xl rounded-3xl bg-slate-200/70 p-2">
          {tabs.map(({ key, label, Icon }) => {
            const isActive = activeTab === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleTabChange(key)}
                className={[
                  'flex-1 inline-flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm sm:text-base font-semibold transition',
                  isActive
                    ? 'bg-white text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.12)]'
                    : 'text-slate-500 hover:text-slate-700',
                ].join(' ')}
                aria-pressed={isActive}
              >
                <Icon className={['h-5 w-5', isActive ? 'text-slate-900' : 'text-slate-400'].join(' ')} />
                <span>{label}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-8">
          {activeTab === 'analytics' && <ViewAnalyticsPanel />}
          {activeTab === 'risk' && <RiskAnalysisPanel />}
        </div>
      </div>
    </div>
  )
}


