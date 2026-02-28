import { MessageSquare } from "lucide-react";
export default function DiscordBanner() {
  const serverLink = "https://discord.gg/kHHfVGBV"
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-4">
      <div className="bg-linear-to-r from-[#1E1B4B] via-[#2E1065] to-[#4C1D95] border border-indigo-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-indigo-900/20">
        <div className="flex items-center gap-4">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <MessageSquare className="w-6 h-6 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Junte-se à nossa comunidade no Discord</h3>
            <p className="text-indigo-200/70 text-sm mt-1">
              Receba alertas de vagas em tempo real.
            </p>
          </div>
        </div>
        <a href={serverLink} target="_blank" rel="noreferrer" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md flex items-center gap-2 whitespace-nowrap">
          <MessageSquare className="w-4 h-4" />
          Entrar no Discord
        </a>
      </div>
    </div>
  );
}
