import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleNotch } from "phosphor-react";

import { useAppDispatch } from "../../redux/hooks";
import { logIn } from "../../redux/userSlice";
import { verifyLogin } from "../../auth";

function initialState() {
  return { email: "", password: "" };
}

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setIsLoading(true);
    const token = verifyLogin(values);

    if (!token) {
      setValues(initialState);
      return;
    }

    setIsLoading(false);
    dispatch(logIn(token));
    navigate("/");
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <form onSubmit={handleLogin}>
      <fieldset className="flex flex-col gap-2 p-10">
        <span className="flex justify-center text-3xl pb-6">Login</span>
        <label className="text-sm " htmlFor="email">
          E-mail:
        </label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={onChange}
          value={values.email}
          placeholder="admin@hox.rs"
          className="w-full rounded-lg ring-[1px] ring-gray-600 placeholder:text-gray-500 text-sm text-white p-3 bg-transparent hover:ring-gray-500 focus:ring-indigo-600 focus:ring-2 outline-none"
        />
        <label className="mt-2 text-sm" htmlFor="password">
          Senha:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={onChange}
          value={values.password}
          placeholder="admin"
          className="w-full rounded-lg ring-[1px] ring-gray-600 placeholder:text-gray-500 text-sm text-white p-3 bg-transparent hover:ring-gray-500 focus:ring-indigo-600 focus:ring-2 outline-none"
        />
        <button
          type="submit"
          className="flex justify-center items-center mt-2 w h-12 rounded-lg bg-indigo-600 text-md shadow-md outline-none hover:bg-opacity-50 focus:bg-opacity-50 transition-colors"
        >
          {isLoading ? (
            <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
          ) : (
            "Entrar"
          )}
        </button>
      </fieldset>
    </form>
  );
}
