import { useNavigate } from "react-router-dom";
import { activities } from "../data/activities";
import ArticleCard from "../components/ArticleCard";
import { Box, Button, Typography } from "@mui/material";

export default function Activities() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Hoạt động đơn vị
      </Typography>
      <Button onClick={() => navigate("/")} variant="outlined" sx={{ mb: 2 }}>
        ← Trang trước
      </Button>

      {activities.map(item => (
        <ArticleCard
          key={item.id}
          article={item}
          onClick={() => navigate(`/activities/${item.id}`)}
        />
      ))}
    </Box>
  );
}