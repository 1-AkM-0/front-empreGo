import { Check, ChevronDown, ExternalLink } from "lucide-react";

import { getSourceBadge, getStatusColor, getTypeColor, statusOptions, getBRTime } from "../../utils/helpers";

export default function SavedJobCard({ job, handleStatusChange }) {
  return (
    <div className="bg-[#131823] rounded-2xl overflow-hidden border border-slate-800/60 shadow-sm transition-all hover:border-slate-700" >
      <div className="p-6 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <h3 className="text-lg font-bold text-slate-100 leading-tight">
              {job.job_title}
            </h3>
            {getSourceBadge(job.job_source)}
          </div>

          <p className="text-slate-400 text-sm">{job.job_company}</p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${getTypeColor(job.type)}`}>
              {job.job_type}
            </span>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Aplicada em: {getBRTime(job.application_created_at)}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-slate-800/50 shrink-0">
          <div className="relative flex-1 md:flex-none md:w-40">
            <select
              value={job.status}
              onChange={(e) => handleStatusChange(job.application_id, e.target.value)}
              className={`w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium border cursor-pointer outline-none transition-colors ${getStatusColor(job.status)}`}
            >
              {Object.entries(statusOptions).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none opacity-50 text-slate-300" />
          </div>
          <a
            href={job.job_link}
            target="_blank"
            rel="noreferrer"
            className="bg-[#1E2433] hover:bg-[#252C3D] text-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-slate-700/50 flex items-center justify-center gap-2 shrink-0"
          >
            <ExternalLink className="w-4 h-4" /> Link
          </a>
        </div>
      </div>
    </div >
  );
}
