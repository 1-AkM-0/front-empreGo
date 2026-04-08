import { useState } from 'react';
import Toast from './components/layout/Toast';
import Navbar from './components/layout/Navbar';
import DiscordBanner from './components/layout/DiscordBanner';
import LoginView from './components/views/LoginView';
import FeedView from './components/views/FeedView';
import SavedJobsView from './components/views/SavedJobsView';
import { useToast } from './hooks/useToast';
import { useAuth } from './hooks/useAuth';
import { useJobs } from './hooks/useJobs';
import { useApplications } from './hooks/useApplications';

export default function App() {
  const [currentView, setCurrentView] = useState('feed');

  const { toast, showToast } = useToast()
  const { user, handleLogin, handleLogout } = useAuth(showToast, setCurrentView)
  const { jobs, page, setPage, metadata } = useJobs()
  const { savedJobs, savedPage, setSavedPage, savedMetadata, handleSaveJob, handleStatusChange } = useApplications(user, currentView, showToast, setCurrentView)


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
