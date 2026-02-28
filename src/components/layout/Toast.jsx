export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5 border ${toast.type === "error" ? "bg-red-950/80 border-red-900 text-red-200" : "bg-emerald-950/80 border-emerald-900 text-emerald-200"} backdrop-blur-sm`}>
      {toast.type === "error" ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
}
