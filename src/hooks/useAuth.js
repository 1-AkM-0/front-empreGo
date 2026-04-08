import { useEffect, useState } from "react";

export function useAuth(showToast, setCurrentView) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`api/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = res.json();
          setUser(data);
        }
      } catch (error) {
        console.log("Erro ao buscar usuário: ", error);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    const pending = sessionStorage.getItem("auth_pending");
    if (!pending) return;
    sessionStorage.removeItem("auth_pending");

    async function checkSession() {
      try {
        const res = await fetch(`api/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          showToast("Erro ao fazer login. Tente novamente", "error");
          setCurrentView("login");
        }
        const data = res.json();
        setUser(data);
        showToast("Login realizado com sucesso");
        setCurrentView("feed");
      } catch {
        showToast("Erro ao tentar fazer login", "error");
        setCurrentView("login");
      }
    }
    checkSession();
  }, [setCurrentView, showToast]);

  function handleLogin() {
    sessionStorage.setItem("auth_pending", "true");
    window.location.href = `api/auth/github`;
  }

  async function handleLogout() {
    await fetch(`api/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
    setCurrentView("feed");
    showToast("Você saiu da conta");
  }
  return { user, setUser, handleLogin, handleLogout };
}
