import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import '../Auth.css';

const SignUpPage = () => {
    const authContext = useContext(AuthContext);
    const { register, isAuthenticated, error, clearErrors } = authContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => {
            if (error) {
                clearErrors();
            }
        };
        // eslint-disable-next-line
    }, []);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        register({ name, email, password });
    };

    return (
        <div className="auth-container" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8fDA%3D)` }}>
            <div className="auth-form-wrapper">
                <form onSubmit={onSubmit}>
                    <h2>Register</h2>
                    {error && <p style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
                    <div className="auth-input-group">
                        <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
                    </div>
                    <div className="auth-input-group">
                        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                    </div>
                    <div className="auth-input-group">
                        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required minLength="6" />
                    </div>
                    <button type="submit" className="auth-submit-btn">Register</button>
                    <div className="auth-link">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage; 