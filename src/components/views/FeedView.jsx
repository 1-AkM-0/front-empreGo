import { Search } from "lucide-react";
import JobCard from "../ui/JobCard";

export default function FeedView({ jobs, savedJobs, user, handleSaveJob, page, setPage, metadata }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Search className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-slate-100">Explorar Vagas</h2>
          </div>
          <p className="text-slate-400 text-sm">Encontre as melhores oportunidades na área de tecnologia.</p>
        </div>
        {!user && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs px-4 py-2.5 rounded-xl font-medium">
            Faça login para aplicar nas vagas.
          </div>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} isSaved={savedJobs.some(sj => sj.job_id === job.id)} user={user} handleSaveJob={handleSaveJob} />
        ))}
      </div>

      {metadata && metadata.last_page > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === metadata.first_page}
            className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm disabled:opacity-30 hover:border-emerald-500 hover:text-emerald-400 transition-colors disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>

          <span className="text-slate-500 text-sm">
            {metadata.current_page} / {metadata.last_page}
          </span>

          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page === metadata.last_page}
            className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm disabled:opacity-30 hover:border-emerald-500 hover:text-emerald-400 transition-colors disabled:cursor-not-allowed"
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
}
