import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Grid,
  Select,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const pages = [
  { name: "Find Game", url: "/findgame" },
  { name: "All Games", url: "/games" },
];
const settings = ["My Games", "Create Game", "Profile", "Account", "Logout"];

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    switch (setting) {
      case "Logout":
        //logout user - remove token from local storage and clear user state.
        window.localStorage.removeItem("token");
        setUser(null);
        navigate("/");
        break;
      case "My Games":
        navigate("/mygames");
        break;
      default:
        console.error("Something Went Wrong!");
    }
  };

  return (
    <AppBar position="static" sx={{ flexGrow: 0 }}>
      <Toolbar id="header" disableGutters>
        <Grid container justifyContent="space-between">
          <Grid container alignItems="center" item xs={4}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon></MenuIcon>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block" },
              }}
            >
              {pages.map((page, idx) => (
                <MenuItem key={idx} onClick={handleCloseNavMenu}>
                  <Link to={page.url}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            item
            xs={4}
          >
            <Typography variant="h6" noWrap component="h6" textAlign="center">
              FindMyDM
            </Typography>
          </Grid>

          <Grid container item xs={4} justifyContent="end" alignItems="center">
            {!user.username ? (
                <Grid item container justifyContent="flex-end" sx={{m: 2}}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/signup")}
                    sx={{mr: 2}}
                  >
                    Sign Up
                  </Button>
                  <Button variant="contained" onClick={() => navigate("/")}>
                    Log In
                  </Button>
                </Grid>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} id="avatar">
                    <Avatar alt="Remy Sharp">{}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, idx) => (
                    <MenuItem
                      key={idx}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
