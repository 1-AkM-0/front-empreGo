import { useState, useEffect } from 'react';
import Toast from './components/layout/Toast';
import Navbar from './components/layout/Navbar';
import DiscordBanner from './components/layout/DiscordBanner';
import LoginView from './components/views/LoginView';
import FeedView from './components/views/FeedView';
import SavedJobsView from './components/views/SavedJobsView';

export default function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const [metadata, setMetadata] = useState(null);
  const [savedPage, setSavedPage] = useState(1);
  const [savedMetadata, setSavedMetadata] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch(`api/jobs?page=${page}&page_size=6`)
      const data = await res.json()
      setJobs(data.jobs);
      setMetadata(data.metadata)
    }
    fetchJobs()
  }, [page]);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`api/auth/me`, {
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
        const res = await fetch(`api/applications?page=${savedPage}&page_size=6`, { credentials: "include" })
        const data = await res.json()
        setSavedJobs(data.applications);
        setSavedMetadata(data.metadata)
      } else {
        setSavedJobs([]);
      }
    }
    fetchApplications()
  }, [user, currentView, savedPage]);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleLogin() {
    window.location.href = `api/auth/github`;
    setCurrentView('feed');
    showToast("Login realizado com sucesso!");
  }

  async function handleLogout() {
    await fetch(`api/auth/logout`, { method: "POST", credentials: "include" })
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
      const res = await fetch(`api/applications`, {
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
        setSavedJobs([...savedJobs, newSaved]);
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
      await fetch(`api/applications/${jobId}`, {
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
        {currentView === 'feed' && <FeedView jobs={jobs} savedJobs={savedJobs} user={user} handleSaveJob={handleSaveJob} page={page} setPage={setPage} metadata={metadata} />}
        {currentView === 'saved' && <SavedJobsView savedJobs={savedJobs} handleStatusChange={handleStatusChange} setCurrentView={setCurrentView} page={savedPage} setPage={setSavedPage} metadata={savedMetadata} />}
      </main>
    </div>
  );
}
