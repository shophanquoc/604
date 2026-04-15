// import { useParams, useNavigate } from "react-router-dom";
// import { articles } from "../data/articles";
// import { Box, Button } from "@mui/material";
// import { Typography } from "@mui/material";
// export default function ArticleDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

// const article = articles.find((a) => String(a.id) === id);
//   const others = articles.filter((a) => a.id !== Number(id));
// if (!article) {
//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Không tìm thấy bài viết</h2>
//       <button onClick={() => navigate("/")}>
//         Quay về trang chủ
//       </button>
//     </div>
//   );
// }
//   return (
//     <Box style={{ padding: 16 }}>

//       <Button onClick={() => navigate(-1)} variant="outlined">
//         ← Trang trước
//       </Button>
//  <Typography variant="h5" sx={{ mb: 2 }}>
//         {article.title}
//       </Typography>
//       <img src={article.image} width="100%" />

//       <h2>{article.title}</h2>
//       <p>{article.createdAt}</p>

//       <p>{article.content}</p>

//       {/* VIDEO demo */}
//       <video controls width="100%">
//         <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
//       </video>

//       <h3 style={{ marginTop: 30 }}>Tin khác</h3>

//       {others.map((item) => (
//         <div
//           key={item.id}
//           onClick={() => navigate(`/article/${item.id}`)}
//           style={{
//             display: "flex",
//             marginBottom: 10,
//             cursor: "pointer",
//           }}
//         >
//           <img src={item.image} width={80} />
//           <div style={{ marginLeft: 10 }}>{item.title}</div>
//         </div>
//       ))}
//     </Box>
//   );
// }

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'

const ArticleDetail = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase.from('articles').select('*').eq('id', id).single()
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setArticle(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
  if (error) return <Alert severity="error">{error}</Alert>
  if (!article) return <Alert severity="warning">Không tìm thấy bài viết</Alert>

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {article.image && (
        <Box component="img" src={article.image} alt={article.title}
          sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 1, mb: 2 }}
          loading="lazy" />
      )}
      <Typography variant="h4" fontWeight="bold" gutterBottom>{article.title}</Typography>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        {new Date(article.created_at).toLocaleDateString('vi-VN')}
        {article.category && ` • ${article.category}`}
      </Typography>
      <Box sx={{ mt: 2, '& img': { maxWidth: '100%', height: 'auto' } }}
        dangerouslySetInnerHTML={{ __html: article.content }} />
    </Box>
  )
}

export default ArticleDetail