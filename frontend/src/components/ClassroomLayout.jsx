// components/ClassroomLayout.jsx
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ClassroomLayout({ children, onExit }) {
  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="shrink-0 h-14 md:h-16 px-4 flex items-center gap-3 bg-slate-900 border-b border-slate-800">
        <img src="/logo.svg" alt="Logo" className="h-7" />
        <div className="flex-1">
          <div className="font-semibold">React Mastery – Live Class</div>
          <div className="text-xs text-slate-400">Instructor: John Doe</div>
        </div>
        <div className="text-sm text-emerald-400">LIVE</div>
      </header>

      <Separator />

      {/* Zoom Area */}
      <main className="relative flex-1 overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">{children}</div>
      </main>

      {/* Bottom Bar */}
      <footer className="shrink-0 h-14 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-3">
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Notes
          </Button>
          <Button variant="secondary" size="sm">
            Ask Doubt
          </Button>
        </div>
        <Button variant="destructive" size="sm" onClick={onExit}>
          Exit Class
        </Button>
      </footer>
    </div>
  );
}
