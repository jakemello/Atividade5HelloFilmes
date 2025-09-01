

import { Box, Typography, Container, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#A82AB1", 
        py: 3,
        mt: 6,
      }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
            fontWeight: "bold",
          }}
        >
          Jakeline Melo © 2025 Todos os direitos reservados {""}
          <MuiLink
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              textDecoration: "underline",
              "&:hover": { color: "#000000" },
            }}
          >
            HelloFilmes
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
}
