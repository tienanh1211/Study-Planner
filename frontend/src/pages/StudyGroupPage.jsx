import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import StudyGroupContext from '../context/StudyGroupContext.jsx';
import AuthContext from '../context/AuthContext.jsx';
import TaskContext from '../context/TaskContext.jsx';
import StudyCalendar from '../components/Calendar.jsx';
import Chat from '../components/Chat.jsx';
import './StudyGroupPage.css'; // Import the new stylesheet

const StudyGroupPage = () => {
    const { id } = useParams();
    const [studyGroup, setStudyGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [memberError, setMemberError] = useState(null);
    const [email, setEmail] = useState('');
    const [newMemberEmail, setNewMemberEmail] = useState('');

    const getStudyGroup = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/studygroups/${id}`);
            setStudyGroup(res.data);
            setLoading(false);
        } catch (err) {
            setError(err.response.data.msg);
            setLoading(false);
        }
    };

    const addMember = async (e) => {
        e.preventDefault();
        setMemberError(null);
        try {
            await axios.post(`/api/studygroups/${id}/members`, { email });
            getStudyGroup(); // Refresh group details
            setEmail('');
        } catch (err) {
            setMemberError(err.response.data.msg || 'An error occurred');
            console.error(err);
        }
    }

    const handleAddMember = async (e) => {
        e.preventDefault();
        setMemberError(null);
        try {
            await axios.post(`/api/studygroups/${id}/members`, { email: newMemberEmail });
            getStudyGroup(); // Refresh group details
            setNewMemberEmail('');
        } catch (err) {
            setMemberError(err.response.data.msg || 'An error occurred');
            console.error(err);
        }
    }

    useEffect(() => {
        getStudyGroup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return (
            <Box className="study-group-container" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1576506542790-51244b486a6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZHl8ZW58MHx8MHx8fDA%3D)` }}>
                <Typography sx={{ color: '#fff' }}>Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box className="study-group-container" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1576506542790-51244b486a6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZHl8ZW58MHx8MHx8fDA%3D)` }}>
            <Typography variant="h2" className="study-group-title">{studyGroup.name}</Typography>
            <Grid container spacing={4}>
                {/* Calendar and Chat Section */}
                <Grid item xs={12} md={8}>
                    <div className="study-group-panel" style={{ height: 'auto' }}>
                        <StudyCalendar tasks={studyGroup.tasks} />
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className="study-group-panel">
                         <Chat groupId={id} />
                    </div>
                </Grid>

                {/* Members and Add Member Section */}
                <Grid item xs={12} md={6}>
                    <div className="study-group-panel">
                        <Typography variant="h5" gutterBottom>Members</Typography>
                        {studyGroup.members.map(member => (
                            <Typography key={member._id}>{member.name}</Typography>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="study-group-panel">
                        <Typography variant="h5" gutterBottom>Add New Member</Typography>
                        <TextField
                            label="Email of new member"
                            variant="filled"
                            fullWidth
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" color="primary" onClick={handleAddMember}>Add Member</Button>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudyGroupPage; 