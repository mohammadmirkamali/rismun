import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

export default function PrimarySearchAppBar({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }
  function handleLogout() {
    setAnchorEl(null);
    localStorage.removeItem("token");
    window.location = "/";
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon>
              <Link to="/" />
            </MenuIcon>
          </IconButton>

          <Typography variant="h6" style={{ paddingLeft: 20 }}>
            <Link style={{ color: "white" }} to="/">
              Home
            </Link>
          </Typography>
          <Typography variant="h6" style={{ paddingLeft: 20 }}>
            <Link style={{ color: "white" }} to="/movies">
              Moives
            </Link>
          </Typography>
          <Typography variant="h6" style={{ paddingLeft: 20 }}>
            <Link style={{ color: "white" }} to="/actors">
              Actors
            </Link>
          </Typography>
          {/* <Typography variant="h6" style={{ paddingLeft: 20 }}>
            <Link style={{ color: "white" }} to="/map">
              Map
            </Link>
          </Typography> */}

          <div style={{ flexGrow: 1 }} />

          {!user && (
            <IconButton color="inherit" size="small">
              <Link style={{ color: "white" }} to="/login">
                Login/Register
              </Link>
            </IconButton>
          )}

          {user && (
            <React.Fragment>
              <IconButton color="inherit" size="small">
                <Link style={{ color: "white" }} to="/login">
                  {user.name}
                </Link>
              </IconButton>
              <IconButton onClick={handleProfileMenuOpen} color="inherit">
                <AccountCircle />
              </IconButton>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </React.Fragment>
  );
}
