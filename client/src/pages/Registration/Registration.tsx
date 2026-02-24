import React, { useState } from "react";
import { IBasePage, PAGES } from '../PageManager';
import './Registration.css';

const Registration: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage, server, store } = props;
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleRegister = async () => {
        if (username.trim() && password.trim() && password === confirmPassword) {
            console.log("Регистрация:", { username, password });
            const success = await server.register(username.trim(), password);
            if (success) setPage(PAGES.CHAT);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && username.trim() && password.trim() && password === confirmPassword) {
            handleRegister();
        }
    };

    const isValid = username.trim() && password.trim() && password === confirmPassword;

    return (
        <div className="registration-container">
            <div className="registration-card">
                <div className="registration-header">
                    <h1 className="registration-title">Создать аккаунт</h1>
                    <p className="registration-subtitle">Заполните форму для регистрации</p>
                </div>
                
                <div className="registration-form">
                    <div className="input-group">
                        <label htmlFor="username" className="input-label">Имя пользователя</label>
                        <input 
                            id="username"
                            type="text" 
                            placeholder="Введите никнейм" 
                            className="registration-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            autoFocus
                        />
                        <div className="input-decoration"></div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Пароль</label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder="Придумайте пароль" 
                            className="registration-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="input-decoration"></div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword" className="input-label">Подтверждение пароля</label>
                        <input 
                            id="confirmPassword"
                            type="password" 
                            placeholder="Повторите пароль" 
                            className="registration-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="input-decoration"></div>
                    </div>

                    <button 
                        className={`register-button ${isValid ? 'active' : ''}`}
                        onClick={handleRegister}
                        disabled={!isValid}
                    >
                        <span className="button-text">Зарегистрироваться</span>
                        <span className="button-icon">→</span>
                    </button>
                </div>

                <div className="registration-footer">
                    <p className="footer-text">Уже есть аккаунт?</p>
                    <div className="login-link">
                        <button className="login-link-button" onClick={() => setPage(PAGES.LOGIN)}>
                            Войти
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="background-effects">
                <div className="gradient-circle circle-1"></div>
                <div className="gradient-circle circle-2"></div>
                <div className="gradient-circle circle-3"></div>
            </div>
        </div>
    );
}

export default Registration;