import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
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

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        // This will run whenever the token in the state changes,
        // ensuring the auth header is always in sync.
        if (state.token) {
            setAuthToken(state.token);
        }
    }, [state.token]);

    // Load user
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    // Register User
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            dispatch({ type: 'SET_LOADING' });
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data,
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: 'REGISTER_FAIL',
                payload: err.response.data.msg,
            });
        }
    };

    // Login User
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            dispatch({ type: 'SET_LOADING' });
            const res = await axios.post('/api/auth', formData, config);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data,
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response.data.msg,
            });
        }
    };

    // Logout
    const logout = () => dispatch({ type: 'LOGOUT' });

    // Clear Errors
    const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

    useEffect(() => {
        if(localStorage.token){
            loadUser();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                register,
                login,
                logout,
                loadUser,
                clearErrors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Helper to set auth token
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};


export default AuthContext; 