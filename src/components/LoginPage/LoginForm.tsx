export function LoginForm() {

  return(
    <form 
      action="" 
      method="post"
    >
      <fieldset className="flex flex-col justify-center gap-3 p-10">
        <span className="flex justify-center text-3xl pb-6">Login</span>
          <input
            id="email" 
            name="email" 
            type="text"
            placeholder="E-mail"
            className="w-full rounded-full border-2 border-emerald-500 text-sm 
            text-white p-3 bg-transparent placeholder:text-sm outline-none" 
          />
          <input
            id="password" 
            name="password" 
            type="text"
            placeholder="Senha"
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
  )
}