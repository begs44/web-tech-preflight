import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { isValidEmail } from "../utils/validate-event";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri — Şifremi Unuttum";
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Geçerli bir e-posta girin.");
      setDone(false);
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <>
      {done && (
        <p className="basari" role="status">
          Sıfırlama bağlantısı {email.trim()} adresine gönderilmiş gibi
          davranıldı. (Sunucu yok.)
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
            aria-invalid={error ? true : undefined}
          />
          {error && (
            <span className="hata" role="alert">
              {error}
            </span>
          )}
        </div>
        <p>
          <button type="submit">Sıfırlama bağlantısı gönder</button>
        </p>
      </form>
      <p className="form-linkler">
        <Link to="/login">← Girişe dön</Link>
      </p>
    </>
  );
}

export default ForgotPasswordPage;
