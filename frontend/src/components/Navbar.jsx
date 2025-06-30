import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2 }}>Hello, {user && user.name}</Typography>
            <Button variant="outlined" color="inherit" onClick={onLogout}>
                Logout
            </Button>
        </Box>
    );

    const guestLinks = (
        <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button variant="contained" color="primary" component={Link} to="/signup" sx={{ ml: 2 }}>Sign Up</Button>
        </>
    );

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Study Planner
                    </Link>
                </Typography>
                {isAuthenticated ? authLinks : guestLinks}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 