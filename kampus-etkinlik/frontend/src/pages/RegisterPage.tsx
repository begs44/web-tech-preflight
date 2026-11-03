import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { isValidEmail } from "../utils/validate-event";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

type RegisterErrors = Partial<Record<keyof RegisterData, string>>;

const emptyData: RegisterData = { name: "", email: "", password: "", confirm: "" };

function RegisterPage() {
  const [data, setData] = useState<RegisterData>(emptyData);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri — Kayıt Ol";
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: RegisterErrors = {};
    if (data.name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!isValidEmail(data.email)) found.email = "Geçerli bir e-posta girin.";
    if (data.password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (data.confirm !== data.password) found.confirm = "Şifreler eşleşmiyor.";
    setErrors(found);
    setDone(Object.keys(found).length === 0);
  }

  function input(name: keyof RegisterData, label: string, type: string) {
    return (
      <div className="alan">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={data[name]}
          onChange={handleChange}
          aria-invalid={errors[name] ? true : undefined}
        />
        {errors[name] && (
          <span className="hata" role="alert">
            {errors[name]}
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      <h2 className="bolum-baslik">Kayıt Ol</h2>
      {done && (
        <p className="basari" role="status">
          Kayıt bilgileri geçerli. (Sunucu olmadığı için hesap oluşturulmaz.)
        </p>
      )}
      <form className="form" onSubmit={handleSubmit} noValidate>
        {input("name", "Ad Soyad", "text")}
        {input("email", "E-posta", "email")}
        {input("password", "Şifre", "password")}
        {input("confirm", "Şifre (tekrar)", "password")}
        <p>
          <button type="submit">Kayıt Ol</button>
        </p>
      </form>
      <p className="form-linkler">
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </p>
    </>
  );
}

export default RegisterPage;
