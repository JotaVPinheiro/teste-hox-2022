import { LoginForm } from "../components/LoginPage/LoginForm";

export function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 rounded-lg w-96 shadow-md">
        <LoginForm />
      </div>
    </div>
  );
}
