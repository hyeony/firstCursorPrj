import React, { useState } from 'react';
import './LoginForm.scss';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    // TODO: 로그인 처리
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="아이디를 입력해주세요"
          autoComplete="username"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          autoComplete="current-password"
        />
      </div>
      <div className="form-check-row">
        <input
          type="checkbox"
          id="autoLogin"
          checked={autoLogin}
          onChange={() => setAutoLogin(!autoLogin)}
        />
        <label htmlFor="autoLogin">자동 로그인</label>
      </div>
      <button type="submit" className="login-btn">로그인</button>
    </form>
  );
};

export default LoginForm;

