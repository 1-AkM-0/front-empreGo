import { useEffect, useState } from "react";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`api/jobs?page=${page}&page_size=6`);
        const data = await res.json();
        setJobs(data.jobs);
        setMetadata(data.metadata);
      } catch (error) {
        console.log("Erro ao buscar vagas: ", error);
      }
    }
    fetchJobs();
  }, [page]);

  return { jobs, page, setPage, metadata };
}
