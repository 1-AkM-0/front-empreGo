import { Briefcase, Check, Bookmark, LogOut, Github } from 'lucide-react';
export default function Navbar({ currentView, setCurrentView, user, handleLogout }) {
  return (
    <nav className="bg-[#0B0F19] border-b border-slate-800/50 sticky top-0 z-10 py-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-400 p-2 rounded-xl">
              <Briefcase className="text-[#0B0F19] w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-emerald-400 tracking-tight">empreGo</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <button onClick={() => setCurrentView('feed')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentView === 'feed' ? 'bg-slate-800/50 text-emerald-400 border border-slate-700/50' : 'text-slate-400 hover:text-slate-200'}`}>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Explorar</span>
            </button>
            {user && (
              <button onClick={() => setCurrentView('saved')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentView === 'saved' ? 'bg-slate-800/50 text-emerald-400 border border-slate-700/50' : 'text-slate-400 hover:text-slate-200'}`}>
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Minhas Vagas</span>
              </button>
            )}
            {user ? (
              <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors px-2 py-2 text-sm font-medium">
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            ) : (
              <button onClick={() => setCurrentView('login')} className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors px-2 py-2 text-sm font-medium">
                <Github className="w-4 h-4" />
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
