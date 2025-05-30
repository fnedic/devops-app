import { GitHub, School } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import logo from "../assets/devops.svg";

export default function Footer() {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#10400c",
        padding: "50px",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: 10,
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        mt: 5,
      }}
    >
      <Grid size={3}>
        <Box
          component="img"
          src={logo}
          alt="DevOps Logo"
          sx={{ width: 200, height: 150 }}
        />
      </Grid>
      <Grid size={3} sx={{ textAlign: "center", color: "#02d35f" }}>
        <Typography sx={{ display: "flex", alignContent: "center", gap: 1 }}>
          {<School />}Universidad de Palermo - Mayo 2025
        </Typography>
      </Grid>
      <Grid size={6} container sx={{ justifyContent: "right" }}>
        <Grid size={4}>
          <Button
            sx={{ color: "#227ab2", fontWeight: "bold" }}
            href="https://github.com/fnedic"
            target="_blank"
            rel="noopener"
            startIcon={<GitHub />}
            size="large"
          >
            Facundo Nedic
          </Button>
        </Grid>
        <Grid size={4}>
          <Button
            sx={{ color: "#227ab2", fontWeight: "bold" }}
            href="https://github.com/Eduzurbriggen14"
            target="_blank"
            rel="noopener"
            startIcon={<GitHub />}
            size="large"
          >
            Eduardo Zurbriggen
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
