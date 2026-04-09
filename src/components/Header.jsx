import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Header({ onSearch, onMenu }) {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <AppBar position="fixed">
      <Toolbar>

        <IconButton color="inherit" onClick={onMenu}>
          <MenuIcon />
        </IconButton>

        {!openSearch && (
          <Typography sx={{ flexGrow: 1 }}>
            LỮ ĐOÀN 604 - QUÂN KHU 2
          </Typography>
        )}

        {openSearch && (
          <InputBase
            placeholder="Tìm kiếm..."
            onChange={(e) => onSearch(e.target.value)}
            sx={{ color: "white", flexGrow: 1 }}
          />
        )}

        <IconButton
          color="inherit"
          onClick={() => setOpenSearch(!openSearch)}
        >
          {openSearch ? <CloseIcon /> : <SearchIcon />}
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}