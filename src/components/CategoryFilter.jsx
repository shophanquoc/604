import { Chip, Stack } from "@mui/material";

export default function CategoryFilter({ categories, onSelect }) {
  return (
    <Stack direction="row" spacing={1} sx={{ p: 1, overflowX: "auto" }}>
      <Chip label="Tất cả" onClick={() => onSelect("all")} />
      {categories.map((cat, i) => (
        <Chip key={i} label={cat} onClick={() => onSelect(cat)} />
      ))}
    </Stack>
  );
}