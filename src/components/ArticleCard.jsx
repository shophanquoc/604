import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";

export default function ArticleCard({ article, onClick }) {
  return (
    <Card sx={{ mb: 2 }} onClick={onClick}>
      <CardMedia
        component="img"
        height="160"
        image={article.image}
      />

      <CardContent>
        <Typography variant="h6">
          {article.title}
        </Typography>

        <Typography variant="caption">
          {article.category} • {article.createdAt}
        </Typography>
      </CardContent>
    </Card>
  );
}