interface LoginProps {
  email: string;
  password: string;
}

export function setToken(token: string) {
  window.localStorage.setItem("token", token);
}

export function getToken() {
  const token = window.localStorage.getItem("token");
  return token || "";
}

export function verifyLogin({ email, password }: LoginProps) {
  if (email != "admin@hox.rs" || password != "admin") return null;

  const token = "me_contrata.por.favor";
  setToken(token)

  return token;
}
