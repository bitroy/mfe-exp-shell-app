import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const theme = useTheme();

  return (
    <Box
      component="aside"
      sx={{
        bgcolor: theme.palette.grey[900],
        color: theme.palette.common.white,
        p: theme.spacing(2),
        width: 256,
        height: "100vh",
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2) }}>
        {["Link 1", "Link 2"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                borderRadius: theme.shape.borderRadius,
                "&:hover": {
                  bgcolor: theme.palette.grey[800],
                },
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
