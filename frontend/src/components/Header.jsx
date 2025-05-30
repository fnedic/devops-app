import { DocumentScanner, GitHub } from "@mui/icons-material";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import logo from "../assets/devops.svg";

export default function Header() {
  const version = import.meta.env.VITE_APP_VERSION;

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#0d2e41",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 5,
        paddingInline: 10,
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
      }}
    >
      <Grid
        size={6}
        sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}
      >
        <Box
          component="img"
          src={logo}
          alt="DevOps Logo"
          sx={{ width: 200, height: 150 }}
        />
        <Typography variant="h3" sx={{ color: "#02d35f", fontWeight: "bold" }}>
          Project {version ? `${version}` : ""}
        </Typography>
      </Grid>
      <Grid size={6} container sx={{ justifyContent: "right" }}>
        <Grid size={1}>
          <Tooltip title="GitHub Repository">
            <IconButton
              sx={{ color: "#02d35f" }}
              href="https://github.com/fnedic/devops-app"
              target="_blank"
              rel="noopener"
            >
              <GitHub />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid size={1}>
          <Tooltip title="Readme">
            <IconButton
              sx={{ color: "#02d35f" }}
              href="https://github.com/fnedic/devops-app/blob/main/README.md"
              target="_blank"
              rel="noopener"
            >
              <DocumentScanner />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}
