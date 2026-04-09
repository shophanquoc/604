import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout({ dark, setDark }) {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      {/* HEADER */}
      <Header onMenu={() => setSidebar(true)} />

      {/* SIDEBAR */}
      <Sidebar
        open={sidebar}
        onClose={() => setSidebar(false)}
        onLogin={() => alert("Open login")}
        dark={dark}          // ✅ QUAN TRỌNG
        setDark={setDark}    // ✅ QUAN TRỌNG
      />

      {/* CONTENT */}
      <div style={{ marginTop: 64, minHeight: "80vh" }}>
        <Outlet />
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}