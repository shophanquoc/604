import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 5,
        py: 3,
        textAlign: "center",
        borderTop: "1px solid #ddd",
        backgroundColor: "background.paper"
      }}
    >
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
        Lưu giữ và phát huy truyền thống anh hùng
      </Typography>

      <Typography variant="caption" color="text.secondary">
        © 2026 Trang thông tin Lịch sử Đơn vị.
      </Typography>
    </Box>
  );
}