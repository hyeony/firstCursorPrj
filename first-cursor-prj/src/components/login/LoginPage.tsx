import React from 'react';
import LoginForm from './LoginForm';
import { FaApple } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import './LoginPage.scss';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="logo-area">LOGO</div>
      <LoginForm />
      <div className="login-options">
        <a href="/signup">회원가입</a>
        <span className="divider">|</span>
        <a href="/forgot-password">아이디/비밀번호 찾기</a>
      </div>
      <div className="separator">
        <span>또는</span>
      </div>
      <div className="sns-login-label">SNS 계정으로 로그인하기</div>
      <div className="sns-login-buttons">
        <button className="sns-btn kakao"><span>{RiKakaoTalkFill({})}</span></button>
        <button className="sns-btn naver"><span>{SiNaver({})}</span></button>
        <button className="sns-btn apple"><span>{FaApple({})}</span></button>
      </div>
    </div>
  );
};

export default LoginPage; 