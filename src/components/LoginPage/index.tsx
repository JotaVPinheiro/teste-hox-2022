import { LoginForm } from "./LoginForm";

export function LoginPage() {
  return(
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="bg-zinc-900 rounded-md w-96">
        <LoginForm></LoginForm>
      </div>
    </div>
  )
}