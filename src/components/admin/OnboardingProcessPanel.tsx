import { useMemo, useState } from 'react'

type OnboardingStepKey = 'invitationSent' | 'documentationProcess' | 'credentialsSent' | 'onboarded'

type OnboardingRow = {
  mobile: string
} & Record<OnboardingStepKey, boolean>

const COLUMNS: Array<{ key: OnboardingStepKey; label: string }> = [
  { key: 'invitationSent', label: 'Invitation sent' },
  { key: 'documentationProcess', label: 'Documentation process' },
  { key: 'credentialsSent', label: 'User credentials sent' },
  { key: 'onboarded', label: 'User onboarded done successfully' },
]

function CheckboxCell(props: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <div className="flex items-center justify-center">
      <label className="inline-flex items-center justify-center cursor-pointer select-none">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={props.checked}
          onChange={(e) => props.onChange(e.target.checked)}
          aria-label={props.label}
        />
        <span className="h-5 w-5 rounded-md border border-slate-300 bg-white flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-checked:bg-emerald-500 peer-checked:border-emerald-500">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100"
            aria-hidden="true"
          >
            <path
              d="M16.25 5.75l-7.5 8.5-3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </label>
    </div>
  )
}

export default function OnboardingProcessPanel() {
  const initialRows = useMemo<OnboardingRow[]>(
    () => [
      {
        mobile: '9876543210',
        invitationSent: true,
        documentationProcess: true,
        credentialsSent: false,
        onboarded: false,
      },
      {
        mobile: '9123456789',
        invitationSent: true,
        documentationProcess: false,
        credentialsSent: false,
        onboarded: false,
      },
      {
        mobile: '9988776655',
        invitationSent: true,
        documentationProcess: true,
        credentialsSent: true,
        onboarded: false,
      },
      {
        mobile: '9001122334',
        invitationSent: true,
        documentationProcess: true,
        credentialsSent: true,
        onboarded: true,
      },
    ],
    [],
  )

  const [rows, setRows] = useState<OnboardingRow[]>(initialRows)

  const toggle = (mobile: string, key: OnboardingStepKey, value: boolean) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.mobile !== mobile) return row
        return { ...row, [key]: value }
      }),
    )
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
      <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
        Onboarding process
      </h2>
      <p className="text-sm text-slate-600 mt-1">
        Sample onboarding status tracker (toggle checkboxes to simulate progress).
      </p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-3 font-semibold text-slate-700">Mobile number</th>
                {COLUMNS.map((c) => (
                  <th key={c.key} className="px-3 py-3 font-semibold text-slate-700 text-center">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.mobile} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-3 py-3 font-medium text-slate-900 whitespace-nowrap">
                    {row.mobile}
                  </td>
                  {COLUMNS.map((c) => (
                    <td key={c.key} className="px-3 py-3">
                      <CheckboxCell
                        checked={row[c.key]}
                        onChange={(checked) =>
                          toggle(row.mobile, c.key, checked)
                        }
                        label={`${c.label} for ${row.mobile}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


