import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import AuthContext from '../context/AuthContext';

const socket = io('http://localhost:5000');

const Chat = ({ groupId }) => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    useEffect(() => {
        // Clear chat log when group changes
        setChatLog([]);

        if (groupId) {
            // Join the study group's chat room
            socket.emit('joinGroup', groupId);
        }

        // Listen for messages
        const handleReceiveMessage = (data) => {
            setChatLog(prevLog => [...prevLog, data]);
        };
        socket.on('receiveMessage', handleReceiveMessage);

        // Clean up on component unmount
        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
        };
    }, [groupId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && user) {
            socket.emit('sendMessage', { groupId, message, user: { name: user.name } });
            setMessage('');
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 2, mt: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">Group Chat</Typography>
            <List sx={{ flexGrow: 1, overflowY: 'auto', border: '1px solid #ddd', mb: 2, p: 1 }}>
                {chatLog.map((chat, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${chat.user.name}: ${chat.message}`} />
                    </ListItem>
                ))}
            </List>
            <Box component="form" onSubmit={sendMessage}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    label="Type a message"
                    size="small"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
                    Send
                </Button>
            </Box>
        </Paper>
    );
};

export default Chat; 