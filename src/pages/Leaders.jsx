import { Typography, Button, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLeaders } from "../hooks/useLeaders";

export default function Leaders() {
  const navigate = useNavigate();

  const [roleFilter, setRoleFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  // ✅ gọi hook trước
  const { leaders, loading, error } = useLeaders();

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  // ✅ dùng leaders sau khi đã có dữ liệu
  const roles = [...new Set(leaders.map((l) => l.role))];

  const filtered =
    roleFilter === "all"
      ? leaders
      : leaders.filter((l) => l.role === roleFilter);

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Thủ trưởng đơn vị qua các giai đoạn
      </Typography>

      <div style={{ marginBottom: 20 }}>
        <Button
          variant={roleFilter === "all" ? "contained" : "outlined"}
          onClick={() => setRoleFilter("all")}
          sx={{ mr: 1 }}
        >
          Tất cả
        </Button>

        {roles.map((r, i) => (
          <Button
            key={i}
            variant={roleFilter === r ? "contained" : "outlined"}
            onClick={() => setRoleFilter(r)}
            sx={{ mr: 1 }}
          >
            {r}
          </Button>
        ))}
      </div>

      <div style={{ position: "relative", marginLeft: 20 }}>
        {/* line */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 0,
            bottom: 0,
            width: 2,
            background: "#ccc",
          }}
        />

        {filtered.map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 30,
              cursor: "pointer",
            }}
            onClick={() => setSelected(l)}
          >
            {/* dot */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "red",
                marginRight: 20,
              }}
            />

            {/* card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                padding: 10,
                borderRadius: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={l.avatar}
                width={50}
                style={{ borderRadius: "50%", marginRight: 10 }}
              />

              <div>
                <div style={{ fontWeight: "bold" }}>{l.name}</div>
                <div>{l.role}</div>
                <div style={{ fontSize: 12, color: "#777" }}>
                  {l.years}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              width: 300,
              textAlign: "center",
            }}
          >
            <img
              src={selected.avatar}
              width={80}
              style={{ borderRadius: "50%" }}
            />

            <h3>{selected.name}</h3>
            <p>{selected.role}</p>
            <p>{selected.years}</p>
            <p>{selected.info}</p>
          </div>
        </div>
      )}

      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 3 }}>
        ← Trang trước
      </Button>
    </div>
  );
}