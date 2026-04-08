import { useEffect, useState } from "react";

export function useApplications(user, currentView, showToast, setCurrentView) {
  const [savedJobs, setSavedJobs] = useState([]);
  const [savedPage, setSavedPage] = useState(1);
  const [savedMetadata, setSavedMetadata] = useState(null);

  useEffect(() => {
    async function fetchApplications() {
      if (!user || currentView !== "saved") {
        setSavedJobs([]);
        return;
      }
      try {
        const res = await fetch(
          `api/applications?page=${savedPage}&page_size=6`,
          { credentials: "include" },
        );
        const data = await res.json();
        setSavedJobs(data.applications);
        setSavedMetadata(data.metadata);
      } catch (error) {
        console.log("Erro ao buscar candidatura", error);
      }
    }
    fetchApplications();
  }, [user, currentView, savedPage]);

  async function handleSaveJob(job) {
    if (!user) {
      showToast("Você precisa estar logado para salvar vagas", "error");
      setCurrentView("login");
      return;
    }
    try {
      const res = await fetch(`api/applications`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: job.id,
        }),
      });

      if (!res.ok) {
        showToast("Erro ao salvar vaga", "error");
      }
      const newJob = await res.json();
      setSavedJobs((prev) => [...prev, newJob]);
      showToast("Vaga salva no seu painel");
    } catch {
      showToast("Erro de conexão com servidor", "error");
    }
  }

  async function handleStatusChange(jobId, newStatus) {
    setSavedJobs((prev) =>
      prev.map((job) =>
        job.application_id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
    try {
      const res = await fetch(`api/applications/${jobId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!res.ok) showToast("Falha ao atualizar status", "error");
    } catch {
      setSavedJobs((prev) =>
        prev.map((job) =>
          job.application_id === jobId ? { ...job, status: job.status } : job,
        ),
      );
    }
  }

  return {
    savedJobs,
    savedPage,
    setSavedPage,
    savedMetadata,
    handleSaveJob,
    handleStatusChange,
  };
}
