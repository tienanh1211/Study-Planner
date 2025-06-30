import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const DashboardPage = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="body1">
                    Welcome to your study planner! This is where your calendar, tasks, and chat will be.
                </Typography>
            </Box>
        </Container>
    );
};

export default DashboardPage; 