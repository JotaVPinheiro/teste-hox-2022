interface LoginProps {
  email: string;
  password: string;
}

export function verifyLogin({ email, password }: LoginProps) {
  if (email != "admin@hox.rs" || password != "admin") return null;

  const token = "me_contrata.por.favor";

  return token;
}
