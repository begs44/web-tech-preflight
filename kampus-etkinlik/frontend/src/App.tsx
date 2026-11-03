import "./App.css";
import { useEffect } from "react";
import { Route, Routes, useLocation, useMatch } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import { useEvents } from "./context/EventsContext";
import AddEventPage from "./pages/AddEventPage";
import AdminPage from "./pages/AdminPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventsPage from "./pages/EventsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import { findEventById } from "./utils/filter-events";

interface Heading {
  title: string;
  text?: string;
}

const NOT_FOUND: Heading = { title: "Sayfa bulunamadı" };

function App() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const isHome = useMatch("/");
  const isEvents = useMatch("/events");
  const detail = useMatch("/events/:id");
  const isAdmin = useMatch("/admin");
  const isAdd = useMatch("/admin/add");
  const edit = useMatch("/admin/:id/edit");
  const isLogin = useMatch("/login");
  const isRegister = useMatch("/register");
  const isForgot = useMatch("/forgot-password");

  const eventId = detail?.params.id ?? edit?.params.id ?? "";
  const event = findEventById(events, eventId);

  // Bandın başlığı açık sayfaya göre değişir; id'si olmayan etkinlikte 404 başlığı gösterilir.
  function getHeading(): Heading {
    if (isHome) {
      return {
        title: "Kampüs Etkinlikleri",
        text: "Fakültedeki seminer, atölye, söyleşi ve sosyal etkinlikleri tek yerden takip edin.",
      };
    }
    if (isEvents) {
      return {
        title: "Tüm Etkinlikler",
        text: "Kampüste düzenlenecek tüm etkinlikler; arayın ya da kategoriye göre süzün.",
      };
    }
    if (detail) {
      return event
        ? { title: event.title, text: `${event.category} · ${event.location}` }
        : NOT_FOUND;
    }
    if (isAdmin) return { title: "Etkinlik Yönetimi" };
    if (isAdd) return { title: "Etkinlik Ekle" };
    if (edit) {
      return event
        ? { title: "Etkinlik Güncelle", text: `Seçili etkinlik: ${event.title}` }
        : NOT_FOUND;
    }
    if (isLogin) return { title: "Giriş Yap" };
    if (isRegister) return { title: "Kayıt Ol" };
    if (isForgot) return { title: "Şifremi Unuttum" };
    return NOT_FOUND;
  }

  const heading = getHeading();

  // Sayfa değişince başa dön.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="site-ust">
        <Header title={heading.title} text={heading.text} />
        <Navigation />
      </div>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add" element={<AddEventPage />} />
          <Route path="/admin/:id/edit" element={<EditEventPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
