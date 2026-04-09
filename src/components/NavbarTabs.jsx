import { Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavbarTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  // map path → tab
  const getValue = () => {
    if (location.pathname.startsWith("/leaders")) return "/leaders";
      
    if (location.pathname.startsWith("/activities")) return "/activities";
    return "/";
  };

  return (
    <Tabs
      value={getValue()}
      onChange={(e, value) => navigate(value)}
      variant="fullWidth"
    >
      <Tab label="Tin tức" value="/" />

      <Tab label="Hoạt động" value="/activities" />
      <Tab label="Thủ trưởng" value="/leaders" />

    </Tabs>
  );
}