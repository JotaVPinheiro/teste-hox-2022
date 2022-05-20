import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyLogin } from "../../auth";
import { logIn } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function initialState() {
  return { email: "", password: "" };
}

export function LoginForm() {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(event: any) {
    const token = verifyLogin(values);

    if (!token) {
      event.preventDefault();
      setValues(initialState);
      return;
    }

    dispatch(logIn(token));
    navigate("/");
  }

  function onChange(event: any) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  }

  return (
    <form onSubmit={handleLogin}>
      <fieldset className="flex flex-col justify-center gap-3 p-10">
        <span className="flex justify-center text-3xl pb-6">Login</span>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="E-mail"
          onChange={onChange}
          value={values.email}
          className="w-full rounded-full border-2 border-emerald-500 text-sm 
            text-white p-3 bg-transparent placeholder:text-sm outline-none"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          onChange={onChange}
          value={values.password}
          className="w-full rounded-full border-2 border-emerald-500 text-sm 
            text-white p-3 bg-transparent placeholder:text-sm outline-none"
        />
        <button
          type="submit"
          className="w-36 h-12 rounded-full border-2 border-teal-500 text-sm"
        >
          Entrar
        </button>
      </fieldset>
    </form>
  );
}
