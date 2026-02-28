export const statusOptions = ["Aplicada", "Entrevista", "Aprovado", "Rejeitado"]

export function getTypeColor(type) {
  switch (type) {
    case "backend": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "frontend": return "bg-teal-500/10 text-teal-400 border-teal-500/20";
    case "fullstack": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}

export function getSourceBadge(source) {
  if (source === "gupy") return <span className="text-[10px] font-medium text-pink-400 bg-pink-500/10 px-2 py-1 rounded-md border border-pink-500/10">Gupy</span>;
  if (source === "linkedin") return <span className="text-[10px] font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/10">LinkedIn</span>;
  return <span className="text-[10px] font-medium text-gray-400 bg-gray-500/10 px-2 py-1 rounded-md border border-gray-500/10">{source}</span>;
}

function getStatusColor(status) {
  switch (status) {
    case "Aplicada": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "Entrevista": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "Aprovado": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Rejeitado": return "bg-red-500/10 text-red-400 border-red-500/20";
  }
}
