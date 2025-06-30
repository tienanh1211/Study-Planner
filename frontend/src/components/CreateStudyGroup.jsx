import React, { useState, useContext } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import StudyGroupContext from '../context/StudyGroupContext';

const CreateStudyGroup = () => {
    const studyGroupContext = useContext(StudyGroupContext);
    const { addStudyGroup } = studyGroupContext;

    const [name, setName] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        addStudyGroup({ name });
        setName('');
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Create a New Study Group</Typography>
            <form onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Group Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Create Group
                </Button>
            </form>
        </Box>
    );
};

export default CreateStudyGroup; 