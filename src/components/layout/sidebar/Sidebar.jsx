import React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Divider, Toolbar } from "@mui/material";
import ListItems from './ListItems'

const drawerWidth = 240;

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <ListItems />
                <Divider />
            </Box>
        </Drawer>
    );
}
