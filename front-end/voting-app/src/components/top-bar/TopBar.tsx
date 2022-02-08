import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants';
import './TopBar.css';
import logo from '../../assets/rijksmuseum-logo.png';

interface Page {
    name: string;
    path: string;
    highlighted?: boolean;
}

const pages: Page[] = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Gallery',
        path: '/gallery',
    },
    {
        name: 'Contribute',
        path: '/contribute',
        highlighted: true,
    },
    // {
    //     name: 'Summary',
    //     path: '/summaryStats',
    // },
    {
        name: 'Metrics',
        path: '/metrics',
    },
    {
        name: 'About',
        path: '/about',
    },
];

const TopBar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (path: string) => {
        navigate(path);
        setAnchorElNav(null);
    };

    function isSelectedPage(pagePath: string): boolean {
        // eslint-disable-next-line
        return location.pathname.toLowerCase() == pagePath.toLowerCase();
    }

    return (
        <AppBar
            position="sticky"
            style={{
                // eslint-disable-next-line
                backgroundColor: location.pathname != '/' && location.pathname != '' ? 'rgb(16, 16, 16)' : 'transparent',
                // paddingTop: '2rem',
                paddingTop: "1.5rem",
                boxShadow: 'none !important',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                >
                    <Box
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        style={{
                            backgroundColor: COLORS.MEDIUM_GOLD,
                            borderRadius: "5px"
                        }}
                    >
                        <img height="35em" src={logo} alt="Rijksmuseum Logo" />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
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
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.path)}>
                                    <Typography textAlign="center">
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Box
                            style={{
                                backgroundColor: COLORS.MEDIUM_GOLD,
                                display: "inline-flex",
                                borderRadius: "5px"
                            }}
                        >
                            <img height="35em" src={logo} alt="Rijksmuseum Logo" />
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link
                                className="nav-link"
                                key={page.name}
                                to={page.path}
                                style={{
                                    color: isSelectedPage(page.path) && !page.highlighted ? COLORS.LIGHT_GOLD : COLORS.LIGHT_GREY,
                                    marginLeft: '1em',
                                    marginRight: '1em',
                                    textDecoration: 'none',
                                    fontSize: '1.25em',
                                    fontFamily: 'Abril Fatface',
                                    backgroundColor: page.highlighted ? COLORS.MEDIUM_GOLD : 'transparent',
                                    borderRadius: "5px"
                                }}
                            >
                                {page.name}
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

TopBar.displayName = 'TopBar';
export default TopBar;
