import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { isValidEmail } from "../utils/validate-event";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri — Giriş";
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!isValidEmail(email)) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setDone(Object.keys(found).length === 0);
  }

  return (
    <>
      {done && (
        <p className="basari" role="status">
          Giriş bilgileri geçerli. (Sunucu olmadığı için gerçek giriş yapılmaz.)
        </p>
      )}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="alan">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && (
            <span className="hata" role="alert">
              {errors.email}
            </span>
          )}
        </div>
        <div className="alan">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && (
            <span className="hata" role="alert">
              {errors.password}
            </span>
          )}
        </div>
        <p>
          <button type="submit">Giriş yap</button>
        </p>
      </form>
      <p className="form-linkler">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </>
  );
}

export default LoginPage;
