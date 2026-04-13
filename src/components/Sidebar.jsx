import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Sidebar({ open, onClose, onLogin, dark, setDark }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose(); // đóng sidebar sau khi click
  };
console.log("setDark:", setDark);
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div style={{ width: 260 }}>

        {/* HEADER */}
        <div
          style={{
            padding: 16,
            background: "#d32f2f",
            color: "white"
          }}
        >
          <Typography variant="h6">
            Lữ đoàn 604
          </Typography>
          <Typography variant="body2">
            Lịch sử & Phát triển
          </Typography>
        </div>

        {/* MENU */}
        <List>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("/")}>
              <ListItemText primary="🏠 Trang chủ" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("/")}>
              <ListItemText primary="📰 Tin tức" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("/activities")}>
              <ListItemText primary="📌 Hoạt động" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("/leaders")}>
              <ListItemText primary="👤 Thủ trưởng" />
            </ListItemButton>
          </ListItem>

        </List>

        <Divider />

        {/* ADMIN */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                onLogin();
                onClose();
              }}
            >
              <ListItemText primary="🔐 Đăng nhập Admin" />
            </ListItemButton>
          </ListItem>
        </List>
        {/* <List>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setDark && setDark(!dark)}
            >
              <ListItemText
                primary={dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
              />
              {dark ? <LightModeIcon /> : <DarkModeIcon />}
            </ListItemButton>
          </ListItem>
        </List> */}
      </div>
    </Drawer>
  );
}