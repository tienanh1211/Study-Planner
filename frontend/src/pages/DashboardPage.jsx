import React, { useContext, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import CreateStudyGroup from '../components/CreateStudyGroup';
import StudyGroupList from '../components/StudyGroupList';
import StudyGroupContext from '../context/StudyGroupContext.jsx';
import TaskContext from '../context/TaskContext.jsx';
import StudyCalendar from '../components/Calendar';
import Chat from '../components/Chat';
import './Dashboard.css';

const DashboardPage = () => {
    const { currentStudyGroup } = useContext(StudyGroupContext);
    const { tasks } = useContext(TaskContext);

    return (
        <Box 
            className="dashboard-container" 
            style={{ backgroundImage: `url(https://plus.unsplash.com/premium_photo-1664372145591-f7cc308ff5da?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZHl8ZW58MHx8MHx8fDA%3D)` }}
        >
            <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                Dashboard
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={4} direction="column">
                        <Grid item>
                            <div className="dashboard-panel">
                                <CreateStudyGroup />
                            </div>
                        </Grid>
                        <Grid item>
                             <div className="dashboard-panel">
                                <StudyGroupList />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                     <div className="dashboard-panel">
                        {currentStudyGroup ? (
                            <Box>
                                <Typography variant="h5" sx={{ color: '#fff' }}>{currentStudyGroup.name}</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={7}>
                                        <StudyCalendar tasks={tasks} />
                                    </Grid>
                                    <Grid item xs={12} lg={5}>
                                        <Chat studyGroupId={currentStudyGroup._id} />
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Typography variant="h6" sx={{ color: '#fff' }}>Select a study group to see details</Typography>
                            </Box>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage; 