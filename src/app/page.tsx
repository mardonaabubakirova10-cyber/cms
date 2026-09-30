import Link from 'next/link';
import { Layers, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-6 ring-1 ring-indigo-500/20">
        <Layers className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
        Visual Site Builder
      </h1>
      <p className="max-w-xl text-lg text-slate-400 mb-8">
        Block-based visual builder with multi-language support, custom design tokens, and static site export.
      </p>
      <Link
        href="/editor/demo"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]"
      >
        Открыть конструктор <ArrowRight className="w-5 h-5" />
      </Link>
    </main>
  );
}
