import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link as MaterialLink} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import SportsBarIcon from '@mui/icons-material/SportsBar';

const pages = ['Ricette', 'Birre', 'Inventario', 'Spesa', 'Impostazioni'];

/**
 * This component represents the navigation bar of the application.
 *
 * @function NavBar
 *
 * @returns {JSX.Element} The navigation bar component.
 *
 * @example
 * // Example usage of the NavBar component
 * <NavBar />
 */


function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsBarIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BrewDay!
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="OpenNavMenu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page) => (
                <MaterialLink
                  component={RouterLink}
                  key={page}
                  onClick={handleCloseNavMenu}
                  to={`/${page}`}
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  <MenuItem key={page}>
                    {page}
                  </MenuItem>
                </MaterialLink>
              ))}
            </Menu>
          </Box>
          <SportsBarIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: {xs: 'flex', md: 'none'},
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BrewDay!
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                component={RouterLink}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{my: 2, color: 'white', display: 'block'}}
                to={`/${page}`}
              >{page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

