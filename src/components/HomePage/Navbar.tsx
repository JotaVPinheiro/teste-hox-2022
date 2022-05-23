import { SignOut } from "phosphor-react";
import { setToken } from "../../auth";

export function Navbar() {
  function handleLogout() {
    setToken("");
    window.location.reload();
  }

  return (
    <header className="w-full h-14 bg-indigo-600 flex items-center p-4 justify-between">
      <a href="">
        <span className="text-lg font-bold">Página Inicial</span>
      </a>
      <button onClick={handleLogout}>
        <SignOut
          weight="bold"
          className="text-lg hover:text-red-400 transition-colors"
        />
      </button>
    </header>
  );
}
