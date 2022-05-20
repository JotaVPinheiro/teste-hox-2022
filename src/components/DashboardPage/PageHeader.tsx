import { User } from "phosphor-react";

export function PageHeader() {
  return(
    <header className="w-screen h-16 bg-yellow-700 flex items-center p-4 justify-between">
      <a href="">
        <span>Nome do Site</span>
      </a>
      <a href="">
        <User />
      </a>
    </header>
  )
}