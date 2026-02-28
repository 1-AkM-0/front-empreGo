import { Check, ChevronDown, ExternalLink } from "lucide-react";
import { getSourceBadge, getTypeColor } from "../../utils/helpers";

export default function SavedJobCard({ job, handleStatusChange }) {
  return (
    <div className="bg-[#131823] rounded-2xl overflow-hidden border border-slate-800/60 shadow-sm transition-all hover:border-slate-700">
      <div className="p-6 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center">
        <div className="flex-1">
          <div className="flex justify-between items-start md:items-center mb-2">
            <h3 className="text-lg font-bold text-slate-100">{job.title}</h3>
            {getSourceBadge(job.source)}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${getTypeColor(job.type)}`}>
              {job.type}
            </span>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Aplicada em: {job.created_at}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-slate-800/50">
          <div className="relative flex-1 md:flex-none min-w-37.5">
            <select value={job.status} onChange={(e) => handleStatusChange(job.id, e.target.value)} className={`w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium border cursor-pointer outline-none transition-colors ${getStatusColor(job.status)}`}>
              {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none opacity-50" />
          </div>
          <a href={job.link} target="_blank" rel="noreferrer" className="bg-[#1E2433] hover:bg-[#252C3D] text-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-slate-700/50 flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" /> Link
          </a>
        </div>
      </div>
    </div>
  );
}
