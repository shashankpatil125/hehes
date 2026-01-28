export default function Footer() {
  return (
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
  )
}

