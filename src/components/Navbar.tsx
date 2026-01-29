import { useNavigate } from 'react-router-dom'

interface NavbarProps {
  onTakeQuizClick?: () => void
}

export default function Navbar({ onTakeQuizClick }: NavbarProps) {
  const navigate = useNavigate()

  return (
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
          onClick={() => onTakeQuizClick?.()}
          >
            Take quiz
          </button>
        <button
          className="hidden sm:inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
          onClick={() => navigate('/admin')}
        >
          Admin
        </button>
        <button
          className="hidden sm:inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
          onClick={() => navigate('/onboarding')}
        >
          Onboarding
        </button>
          <button
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
            onClick={() => navigate('/user')}
          >
            User
          </button>
          <button className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition">
            English
            <span className="ml-1 text-xs">▾</span>
          </button>
        </div>
      </div>
    </header>
  )
}

