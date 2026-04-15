// import { useState, useEffect } from "react";
// import { ThemeProvider, createTheme, CssBaseline, Fab } from "@mui/material";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Activities from "./pages/Activities";
// import ActivityDetail from "./pages/ActivityDetail";
// import MainLayout from "./layouts/MainLayout";
// import Home from "./pages/Home";
// import ArticleDetail from "./pages/ArticleDetail";
// import Leaders from "./pages/Leaders";
// import NotFound from "./pages/NotFound";
// import ErrorPage from "./pages/ErrorPage";

// import { AuthProvider } from "./contexts/AuthContext";
// import Login from "./pages/Login";
// import Admin from "./pages/Admin";
// import AdminEditor from "./pages/AdminEditor";

// export default function App() {
//   const [showTop, setShowTop] = useState(false);
//   const [dark, setDark] = useState(
//     () => localStorage.getItem("dark") === "true",
//   );

//   useEffect(() => {
//     localStorage.setItem("dark", dark);
//   }, [dark]);

//   // scroll top button
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowTop(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // dark mode class
//   useEffect(() => {
//     if (dark) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   }, [dark]);

//   const theme = createTheme({
//     palette: {
//       mode: dark ? "dark" : "light",
//       primary: {
//         main: "#d32f2f",
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />

//       {/* ✅ ROUTES CHUẨN */}
//       <Routes>
//         <Route path="/" element={<MainLayout dark={dark} setDark={setDark} />}>
//           <Route index element={<Home />} />
//           <Route path="article/:id" element={<ArticleDetail />} />
//           <Route path="leaders" element={<Leaders />} />
//           <Route path="activities" element={<Activities />} />
//           <Route path="activities/:id" element={<ActivityDetail />} />
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>

//       {/* 🔝 SCROLL TOP */}
//       {showTop && (
//         <Fab
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//           }}
//           color="primary"
//         >
//           <KeyboardArrowUpIcon />
//         </Fab>
//       )}
//     </ThemeProvider>
//   );
// }


import { useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Routes, Route } from "react-router-dom";

import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import Leaders from "./pages/Leaders";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminEditor from "./pages/AdminEditor";

export default function App() {
  const [showTop, setShowTop] = useState(false);
  

  
  // scroll top button
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 ;
//only light mode for now,  
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#d32f2f",
      },
    },
  }); 
  

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          {/* 🌐 PUBLIC LAYOUT */}
          <Route
            path="/"
            element={<MainLayout   />}
          >
            <Route index element={<Home />} />
            <Route path="article/:id" element={<ArticleDetail />} />
            <Route path="leaders" element={<Leaders />} />
            <Route path="activities" element={<Activities />} />
            <Route path="activities/:id" element={<ActivityDetail />} />
          </Route>

          {/* 🔐 AUTH */}
          <Route path="/login" element={<Login />} />

          {/* ⚙️ ADMIN */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:type/:id" element={<AdminEditor />} />

          {/* ⚠️ ERROR */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* 🔝 SCROLL TOP */}
        {showTop && (
          <Fab
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
            }}
            color="primary"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        )}
      </ThemeProvider>
    </AuthProvider>
  );
}