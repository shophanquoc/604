import { Dialog, DialogContent, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function LoginModal({ open, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h3>Admin Login</h3>

        <TextField
          fullWidth
          label="Email"
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={() => onLogin(email, password)}
        >
          Đăng nhập
        </Button>
      </DialogContent>
    </Dialog>
  );
}