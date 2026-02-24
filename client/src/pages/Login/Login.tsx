import React, { useState } from "react";
import { IBasePage, PAGES } from '../PageManager';
import './Login.css';

const Login: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage, server, store } = props;
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) return;
        setError("");
        const success = await server.login(username.trim(), password);
        if (success) {
            setPage(PAGES.CHAT);
        } else {
            setError("Неверный логин или пароль");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && username.trim() && password.trim()) {
            handleLogin();
        }
    };

    const isValid = username.trim() && password.trim();

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Добро пожаловать</h1>
                    <p className="login-subtitle">Войдите в свой аккаунт</p>
                </div>
                
                <div className="login-form">
                    <div className="login-input-group">
                        <label htmlFor="username" className="login-input-label">Имя пользователя</label>
                        <input 
                            id="username"
                            type="text" 
                            placeholder="Введите никнейм" 
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            autoFocus
                        />
                        <div className="login-input-decoration"></div>
                    </div>

                    <div className="login-input-group">
                        <label htmlFor="password" className="login-input-label">Пароль</label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder="Введите пароль" 
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="login-input-decoration"></div>
                    </div>

                    {error && <p className="login-error">{error}</p>}
                    <button 
                        className={`login-button ${isValid ? 'active' : ''}`}
                        onClick={handleLogin}
                        disabled={!isValid}
                    >
                        <span className="button-text">Войти</span>
                        <span className="button-icon">→</span>
                    </button>
                </div>

                <div className="login-footer">
                    <p className="login-footer-text">Нет аккаунта?</p>
                    <div className="register-link">
                        <button className="register-link-button" onClick={() => setPage(PAGES.REGISTRATION)}>
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="login-background-effects">
                <div className="login-gradient-circle login-circle-1"></div>
                <div className="login-gradient-circle login-circle-2"></div>
                <div className="login-gradient-circle login-circle-3"></div>
            </div>
        </div>
    );
}

export default Login;