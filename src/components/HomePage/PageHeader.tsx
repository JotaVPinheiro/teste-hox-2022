import { SignOut } from "phosphor-react";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/userSlice";

export function PageHeader() {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logOut());
    window.location.reload();
  }

  return (
    <header className="w-screen h-16 bg-yellow-700 flex items-center p-4 justify-between">
      <a href="">
        <span>Nome do Site</span>
      </a>
      <button onClick={handleLogout}>
        <SignOut />
      </button>
    </header>
  );
}
