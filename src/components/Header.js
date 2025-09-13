import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        px: theme.spacing(2),
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
          minHeight: theme.spacing(8),
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: theme.spacing(1) }}>
          {isMdUp && (
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ fontWeight: theme.typography.fontWeightBold }}
            >
              Shell App
            </Typography>
          )}
        </Box>
        {isMdUp ? (
          <Box sx={{ display: "flex", gap: theme.spacing(4) }}>
            {["Home", "About", "Services", "Contact"].map((item) => (
              <Button
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                color="inherit"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  "&:hover": { color: theme.palette.grey[200] },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        ) : (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{
              bgcolor: theme.palette.primary.dark,
              borderRadius: theme.shape.borderRadius,
              p: theme.spacing(1),
              "&:hover": { bgcolor: theme.palette.primary.light },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
