export const statusOptions = {
  "applied": "Aplicada",
  "interview": "Entrevista",
  "approved": "Aprovado",
  "rejected": "Rejeitado"
}

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

export function getStatusColor(status) {
  switch (status) {
    case "applied": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "interview": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "approved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "rejected": return "bg-red-500/10 text-red-400 border-red-500/20";
  }
}

export function getRelativeTime(time) {
  const date = new Date(time + "Z")
  let diffSeconds = Math.floor((new Date() - date) / 1000)
  const rtf1 = new Intl.RelativeTimeFormat("pt", { numeric: "auto" });

  if (diffSeconds < 60) {
    return rtf1.format(-diffSeconds, "seconds")
  }

  if (diffSeconds < 60 * 60) {
    let minutes = Math.round(diffSeconds / 60)
    return rtf1.format(-minutes, "minutes")
  }
  if (diffSeconds < 60 * 60 * 24) {
    let hora = Math.round(diffSeconds / (60 * 60))
    return rtf1.format(-hora, "hours")
  }

  let dia = Math.round(diffSeconds / (60 * 60 * 24))
  return rtf1.format(-dia, "day")
}

export function getBRTime(time) {
  const date = new Date(time + "Z")
  return date.toLocaleString()
}

export function getStatusName(status) {
  if (status === "Aplicada ") return "applied"
  if (status === "Entrevista") return "interview"
  if (status === "Aprovado") return "approved"
  if (status === "Rejeitado") return "rejected"
}
