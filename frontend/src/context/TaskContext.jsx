import { createContext, useReducer } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                loading: false,
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                ),
                loading: false,
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
                loading: false,
            };
        case 'TASK_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
};

export const TaskProvider = ({ children }) => {
    const initialState = {
        tasks: [],
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Get tasks for a study group
    const getTasks = async (studyGroupId) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const res = await axios.get(`/api/tasks?studyGroupId=${studyGroupId}`);
            dispatch({
                type: 'GET_TASKS',
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: 'TASK_ERROR',
                payload: err.response.data.msg,
            });
        }
    };

    // Add task
    const addTask = async (taskData) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const res = await axios.post('/api/tasks', taskData);
            dispatch({
                type: 'ADD_TASK',
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: 'TASK_ERROR',
                payload: err.response.data.msg,
            });
        }
    };

    // Update task
    const updateTask = async (id, taskData) => {
        try {
            const res = await axios.put(`/api/tasks/${id}`, taskData);
            dispatch({
                type: 'UPDATE_TASK',
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: 'TASK_ERROR',
                payload: err.response.data.msg,
            });
        }
    };

    // Delete task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            dispatch({
                type: 'DELETE_TASK',
                payload: id,
            });
        } catch (err) {
            dispatch({
                type: 'TASK_ERROR',
                payload: err.response.data.msg,
            });
        }
    };


    return (
        <TaskContext.Provider
            value={{
                ...state,
                getTasks,
                addTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext; 