import { Briefcase, Github, X } from "lucide-react";

export default function LoginView({ handleLogin, setCurrentView }) {
  return (
    <div className="bg-indigo-950 min-h-lvh">
      <div className="min-h-[80vh] flex items-center justify-center p-4 ">
        <div className="bg-[#131823] p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-slate-800/60 relative">
          <button onClick={() => setCurrentView('feed')} className="absolute top-5 right-5 text-slate-500 hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Briefcase className="text-emerald-400 w-10 h-10" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-100 mb-3 tracking-tight">empreGo</h1>
          <p className="text-slate-400 mb-10 text-sm leading-relaxed">Faça login para registrar suas candidaturas, gerenciar seu status e organizar seu processo seletivo.</p>
          <button onClick={handleLogin} className="w-full bg-slate-100 hover:bg-white text-slate-900 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-md">
            <Github className="w-5 h-5" />
            Entrar com GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

