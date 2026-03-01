import { useState, useEffect } from 'react';
import Toast from './components/layout/Toast';
import Navbar from './components/layout/Navbar';
import DiscordBanner from './components/layout/DiscordBanner';
import LoginView from './components/views/LoginView';
import FeedView from './components/views/FeedView';
import SavedJobsView from './components/views/SavedJobsView';
const URL = import.meta.env.VITE_API_URL

export default function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch(`${URL}/v1/jobs/`)
      const jobsResponse = await res.json()
      setJobs(jobsResponse);
    }
    fetchJobs()
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${URL}/v1/auth/me`, {
        credentials: "include"
      })
      const userResponse = await res.json()
      if (res.ok) setUser(userResponse)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    async function fetchApplications() {
      if (user && currentView === "saved") {
        const res = await fetch(`${URL}/v1/applications/`, { credentials: "include" })
        const applications = await res.json()
        setSavedJobs(applications);
      } else {
        setSavedJobs([]);
      }
    }
    fetchApplications()
  }, [user, currentView]);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleLogin() {
    window.location.href = `${URL}/v1/auth/github`;
    setCurrentView('feed');
    showToast("Login realizado com sucesso!");
  }

  async function handleLogout() {
    await fetch(`${URL}/v1/auth/logout`, { method: "POST", credentials: "include" })
    setUser(null);
    setCurrentView('feed');
    showToast("Você saiu da conta.");
  }



  async function handleSaveJob(job) {
    if (!user) {
      showToast("Você precisa entrar para salvar vagas.", "error");
      setCurrentView('login');
      return;
    }

    try {
      const res = await fetch(`${URL}/v1/applications/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          job_id: job.id
        })
      });

      if (res.ok) {
        const newSaved = await res.json()
        const completeApplication = { job_title: job.title, job_status: "Aplicada", job_source: job.source, job_type: job.type, job_link: job.link, job_created_at: newSaved.created_at }

        setSavedJobs([...savedJobs, completeApplication]);
        showToast("Vaga salva no seu painel!");
      } else {
        showToast("Erro ao salvar a vaga. Tente novamente.", "error");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      showToast("Erro de conexão com o servidor.", "error");
    }
  }

  async function handleStatusChange(jobId, newStatus) {

    setSavedJobs(savedJobs.map(job =>
      job.application_id === jobId ? { ...job, status: newStatus } : job
    ));

    try {
      await fetch(`${URL}/v1/applications/${jobId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: newStatus
        })
      })

    } catch (error) {
      setSavedJobs(savedJobs.map(job =>
        job.application_id === jobId ? { ...job, status: job.status } : job
      ));
    }
  }

  if (currentView === 'login') {
    return <LoginView handleLogin={handleLogin} setCurrentView={setCurrentView} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Toast toast={toast} />
      <Navbar currentView={currentView} setCurrentView={setCurrentView} user={user} handleLogout={handleLogout} />
      <DiscordBanner />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'feed' && <FeedView jobs={jobs} savedJobs={savedJobs} user={user} handleSaveJob={handleSaveJob} />}
        {currentView === 'saved' && <SavedJobsView savedJobs={savedJobs} handleStatusChange={handleStatusChange} setCurrentView={setCurrentView} />}
      </main>
    </div>
  );
}
