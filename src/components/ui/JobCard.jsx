import { ExternalLink, Clock, Check } from "lucide-react";
import { getSourceBadge, getTypeColor } from "../../utils/helpers";

export default function JobCard({ job, isSaved, user, handleSaveJob }) {
  return (
    <div className="bg-[#131823] rounded-2xl p-6 border border-slate-800/60 shadow-sm hover:border-slate-700 transition-colors flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 leading-tight mb-1 group-hover:text-emerald-400 transition-colors">
              {job.title}
            </h3>
          </div>
          {getSourceBadge(job.source)}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${getTypeColor(job.type)}`}>
            {job.type}
          </span>
          <div className="flex items-center text-slate-500 text-xs gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{job.created_at}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-auto pt-4 border-t border-slate-800/50">
        <a href={job.link} target="_blank" rel="noreferrer" className="bg-[#1E2433] hover:bg-[#252C3D] text-slate-300 text-sm font-medium py-2 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700/50">
          <ExternalLink className="w-4 h-4" /> Link
        </a>
        <button onClick={() => handleSaveJob(job)} disabled={isSaved && user} className={`px-5 py-2 rounded-xl text-sm font-medium border flex items-center justify-center gap-2 transition-all flex-1 ${isSaved && user ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 cursor-not-allowed' : 'bg-transparent text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10'}`}>
          {isSaved && user ? <><Check className="w-4 h-4" /> Aplicada</> : <><Check className="w-4 h-4" /> Aplicar</>}
        </button>
      </div>
    </div>
  );
}
