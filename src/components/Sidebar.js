import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const theme = useTheme();
  const [openEventBusDemo, setOpenEventBusDemo] = useState(true);

  const handleEventBusDemoClick = () => {
    setOpenEventBusDemo(!openEventBusDemo);
  };

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
      <List sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(1) }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleEventBusDemoClick}
            sx={{
              borderRadius: theme.shape.borderRadius,
              "&:hover": {
                bgcolor: theme.palette.grey[800],
              },
            }}
          >
            <ListItemText primary="Event Bus Demo" />
            {openEventBusDemo ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openEventBusDemo} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  pl: 4,
                  borderRadius: theme.shape.borderRadius,
                  "&:hover": {
                    bgcolor: theme.palette.grey[800],
                  },
                }}
              >
                <ListItemText 
                  primary="Cross-MFE Events" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
        
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
