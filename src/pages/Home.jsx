import { useState } from "react";
import { articles as data } from "../data/articles";
import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";
import CategoryFilter from "../components/CategoryFilter";
import Slider from "../components/Slider";
import Sidebar from "../components/Sidebar";
import LoginModal from "../components/LoginModal";
import Hero from "../components/Hero";
import NavbarTabs from "../components/NavbarTabs";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [sidebar, setSidebar] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  let filtered = data.filter((item) =>
    item.title.toLowerCase().includes(keyword.toLowerCase()),
  );
  if (category !== "all") {
    filtered = filtered.filter((item) => item.category === category);
  }

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      {/* toàn bộ Home */}
      <div>
        <Header onSearch={setKeyword} onMenu={() => setSidebar(true)} />

        <Hero />
        <NavbarTabs />

        <Sidebar
          open={sidebar}
          onClose={() => setSidebar(false)}
          onLogin={() => setLoginOpen(true)}
        />

        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={() => alert("Login OK")}
        />

        {/* SLIDER */}
        <div style={{ padding: 10 }}>
          <Slider articles={data} onClick={(item) => alert(item.title)} />
        </div>

        <CategoryFilter
          categories={[...new Set(data.map((i) => i.category))]}
          onSelect={setCategory}
        />

        <div style={{ padding: 16 }}>
          {filtered.map((item) => (
            <ArticleCard
              key={item.id}
              article={item}
              onClick={() => navigate(`/article/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </Box>
  );
}
