import { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import Concept from "./components/Concept.jsx";
import Features from "./components/Features.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import SignupForm from "./components/SignupForm.jsx";
import Footer from "./components/Footer.jsx";
import Admin from "./components/Admin.jsx";

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "#admin") {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-[#0b0a1a] text-slate-100 font-sans antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/10 blur-[120px]" />
      </div>

      <Hero />
      <main>
        <Concept />
        <Features />
        <HowItWorks />
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
}
