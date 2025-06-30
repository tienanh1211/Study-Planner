import React, { useContext, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box, CircularProgress } from '@mui/material';
import StudyGroupContext from '../context/StudyGroupContext';
import { Link } from 'react-router-dom';

const StudyGroupList = () => {
    const studyGroupContext = useContext(StudyGroupContext);
    const { studyGroups, getStudyGroups, loading } = studyGroupContext;

    useEffect(() => {
        getStudyGroups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Your Study Groups</Typography>
            <List>
                {studyGroups.length > 0 ? (
                    studyGroups.map(group => (
                        <ListItem
                            key={group._id}
                            button
                            component={Link}
                            to={`/group/${group._id}`}
                        >
                            <ListItemText primary={group.name} />
                        </ListItem>
                    ))
                ) : (
                    <Typography>You are not a part of any study groups.</Typography>
                )}
            </List>
        </Box>
    );
};

export default StudyGroupList; 