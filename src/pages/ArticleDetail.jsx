import { useParams, useNavigate } from "react-router-dom";
import { articles } from "../data/articles";
import { Box, Button } from "@mui/material";
import { Typography } from "@mui/material";
export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

const article = articles.find((a) => String(a.id) === id);
  const others = articles.filter((a) => a.id !== Number(id));
if (!article) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Không tìm thấy bài viết</h2>
      <button onClick={() => navigate("/")}>
        Quay về trang chủ
      </button>
    </div>
  );
}
  return (
    <Box style={{ padding: 16 }}>

      <Button onClick={() => navigate(-1)} variant="outlined">
        ← Trang trước
      </Button>
 <Typography variant="h5" sx={{ mb: 2 }}>
        {article.title}
      </Typography>
      <img src={article.image} width="100%" />

      <h2>{article.title}</h2>
      <p>{article.createdAt}</p>

      <p>{article.content}</p>

      {/* VIDEO demo */}
      <video controls width="100%">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
      </video>

      <h3 style={{ marginTop: 30 }}>Tin khác</h3>

      {others.map((item) => (
        <div
          key={item.id}
          onClick={() => navigate(`/article/${item.id}`)}
          style={{
            display: "flex",
            marginBottom: 10,
            cursor: "pointer",
          }}
        >
          <img src={item.image} width={80} />
          <div style={{ marginLeft: 10 }}>{item.title}</div>
        </div>
      ))}
    </Box>
  );
}
