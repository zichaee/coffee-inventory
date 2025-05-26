import { customTheme } from "../theme.jsx"
import companyLogo from "../assets/logo_white.png";
import bg from "../assets/bg.jpeg";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Divider,
  useMediaQuery,
  ThemeProvider,
  Stack,
  Avatar,
  Tabs,
  Tab,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';

const drawerWidth = 240;

export default function Landing(props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isLargeScreen = useMediaQuery(customTheme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const drawerContent = (
    <div>
      <List>
        <ListItem button component="a" href="/">
          <ListItemText primary="Home" />
        </ListItem>
        {[
          "Suppliers",
          "Catalogue",
          "Orders",
        ].map((text) => (
          <ListItem button key={text} component="a" href={`/${text.toLowerCase().replace(/ /g, "-")}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    location.replace('/');
  }
  const handleManageOtherAccounts = () => {
    location.replace('/users');
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Stack direction="column">
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: 1300, ml: isLargeScreen ? `${drawerWidth}px` : 0 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
            <Toolbar>
              {!isLargeScreen && (
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
                  <MenuIcon />
                </IconButton>
              )}
              <Avatar alt='Company Logo' src={companyLogo} sx={{ width: 182, height: 60, p: '5px' }} variant='square'/>
            </Toolbar>
            <Toolbar>
              <Tooltip>
                <IconButton
                  onClick={handleProfileClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Stack>
        </AppBar>

        {isLargeScreen ? (
          <>
            <AppBar position="fixed" sx={{ mt: '64px', bgcolor: '#b9cdac' }}>
              <Tabs value={false} role="navigation" centered>
                <Tab component="a" label="Home" index={2} href="/" />
                <Tab component="a" label="Suppliers" index={2} href="/suppliers" />
                <Tab component="a" label="Catalogue" href="/catalogue" />
                <Tab component="a" label="Orders" href="/orders" />
              </Tabs>
            </AppBar>
            <Box sx={{ height: '64px' }}></Box>
          </>
        ) : (
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            variant="temporary"
            sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
          >
            <Toolbar />
            {drawerContent}
          </Drawer>
        )}

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleProfileClose}
          onClick={handleProfileClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
                mt: 6,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 19,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem onClick={handleManageOtherAccounts}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Kelola Akun Lain
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Keluar
          </MenuItem>
        </Menu>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: 8,
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: "1200px", width: "100%" }}>
            {props.content}
          </Stack>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
