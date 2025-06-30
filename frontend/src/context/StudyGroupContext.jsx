import { createContext, useReducer } from 'react';
import axios from 'axios';

const StudyGroupContext = createContext();

const studyGroupReducer = (state, action) => {
    switch (action.type) {
        case 'GET_GROUPS':
            return {
                ...state,
                studyGroups: action.payload,
                loading: false,
            };
        case 'ADD_GROUP':
            return {
                ...state,
                studyGroups: [action.payload, ...state.studyGroups],
                loading: false,
            };
        case 'GROUP_ERROR':
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

export const StudyGroupProvider = ({ children }) => {
    const initialState = {
        studyGroups: [],
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(studyGroupReducer, initialState);

    // Get study groups for user
    const getStudyGroups = async () => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const res = await axios.get('/api/studygroups');
            dispatch({
                type: 'GET_GROUPS',
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: 'GROUP_ERROR',
                payload: err.response.data.msg,
            });
        }
    };

    // Add study group
    const addStudyGroup = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            dispatch({ type: 'SET_LOADING' });
            const res = await axios.post('/api/studygroups', formData, config);
            dispatch({
                type: 'ADD_GROUP',
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: 'GROUP_ERROR',
                payload: err.response.data.msg,
            });
        }
    };

    return (
        <StudyGroupContext.Provider
            value={{
                ...state,
                getStudyGroups,
                addStudyGroup,
            }}
        >
            {children}
        </StudyGroupContext.Provider>
    );
};

export default StudyGroupContext; 