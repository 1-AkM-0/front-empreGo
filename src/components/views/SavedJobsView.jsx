import { Bookmark, Check } from "lucide-react";
import SavedJobCard from "../ui/SaveJobCard";

export default function SavedJobsView({ savedJobs, handleStatusChange, setCurrentView }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Bookmark className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-slate-100">Minhas Vagas</h2>
        </div>
        <p className="text-slate-400 text-sm">Acompanhe as suas candidaturas e altere os status para se organizar.</p>
      </div>
      {savedJobs.length === 0 ? (
        <div className="text-center py-20 bg-[#131823] rounded-3xl border border-dashed border-slate-700/50">
          <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-slate-200 mb-1">Nenhuma candidatura registrada</h3>
          <p className="text-slate-500 mb-6 text-sm">Vá para a aba de explorar e comece a aplicar nas vagas.</p>
          <button onClick={() => setCurrentView('feed')} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all">
            Explorar Vagas
          </button>
        </div>
      ) : (
        <div className="grid gap-5">
          {savedJobs.map(job => (
            <SavedJobCard key={job.id} job={job} handleStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
}
