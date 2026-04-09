import { useParams, useNavigate } from "react-router-dom";
import { activities } from "../data/activities";
import { Button } from "@mui/material";

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = activities.find(a => a.id === Number(id));
  const others = activities.filter(a => a.id !== Number(id));

  if (!item) return <div>Không có dữ liệu</div>;

  return (
    <div style={{ padding: 16 }}>

      <Button onClick={() => navigate(-1)} variant="outlined">
        ← Trang trước
      </Button>

      <img src={item.image} width="100%" />

      <h2>{item.title}</h2>
      <p>{item.createdAt}</p>

      <p>{item.content}</p>

      <h3 style={{ marginTop: 30 }}>Hoạt động khác</h3>

      {others.map(o => (
        <div
          key={o.id}
          onClick={() => navigate(`/activities/${o.id}`)}
          style={{
            display: "flex",
            marginBottom: 10,
            cursor: "pointer"
          }}
        >
          <img src={o.image} width={80} />
          <div style={{ marginLeft: 10 }}>{o.title}</div>
        </div>
      ))}

    </div>
  );
}