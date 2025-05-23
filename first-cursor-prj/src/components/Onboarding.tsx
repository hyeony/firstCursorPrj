import React, { useState, useRef } from 'react';
import './Onboarding.scss';

const slides = [
  { img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', title: '온보딩1', desc: '문화비 앱을 시작하기 전 서비스에 대해 설명하는 스크린입니다', },
  { img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', title: '온보딩2', desc: '다양한 문화비 혜택을 한눈에 확인할 수 있어요', },
  { img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', title: '온보딩3', desc: '간편하게 신청하고 빠르게 이용해보세요', },
  { img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80', title: '온보딩4', desc: '새로운 경험을 시작하세요', },
  { img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', title: '온보딩5', desc: '더 많은 혜택을 누리세요', },
  { img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', title: '온보딩6', desc: '간편한 사용법을 익혀보세요', },
  { img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', title: '온보딩7', desc: '지금 바로 시작해보세요', },
  { img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', title: '온보딩8', desc: '새로운 기능을 만나보세요', },
  { img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', title: '온보딩9', desc: '더 편리한 서비스', },
  { img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', title: '온보딩10', desc: '언제 어디서나 사용', },
  { img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80', title: '온보딩11', desc: '마지막 안내', },
];

const VISIBLE = 1; // 양옆에 1장씩만 보이게
const X_GAP = 240; // 카드 간 X축 간격
const Y_CURVE = 12; // 곡선 깊이(아주 약간)
const ROTATE_STEP = 4; // 각도(아주 약간)
const SCALE_SIDE = 0.96;

const Onboarding: React.FC = () => {
  const [centerIdx, setCenterIdx] = useState(5); // 중앙 카드 인덱스 (11개 중 가운데)
  const touchStartX = useRef<number | null>(null);

  // 터치/드래그로 슬라이드
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff < -40 && centerIdx < slides.length - 1) setCenterIdx(centerIdx + 1);
    if (diff > 40 && centerIdx > 0) setCenterIdx(centerIdx - 1);
    touchStartX.current = null;
  };

  return (
    <div className="onboarding-page arc-carousel">
      <div className="arc-carousel-inner" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {slides.map((slide, i) => {
          const diff = i - centerIdx;
          if (Math.abs(diff) > VISIBLE) return null; // 3장만 보이게
          const x = diff * X_GAP;
          const y = Math.abs(diff) * Y_CURVE;
          const scale = diff === 0 ? 1 : SCALE_SIDE;
          const rotate = diff * ROTATE_STEP;
          const zIndex = 100 - Math.abs(diff);
          return (
            <div
              key={i}
              className={`arc-card${diff === 0 ? ' center' : ''}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
                zIndex,
                transition: 'transform 0.5s cubic-bezier(.77,0,.18,1), z-index 0.3s',
                pointerEvents: diff === 0 ? 'auto' : 'none',
              }}
            >
              <img src={slide.img} alt={slide.title} />
              <div className="onb-title">{slide.title}</div>
              <div className="onb-desc">{slide.desc}</div>
            </div>
          );
        })}
      </div>
      <div className="arc-indicator">
        {slides.map((_, i) => (
          <span key={i} className={i === centerIdx ? 'active' : ''}></span>
        ))}
      </div>
      <div className="arc-btns">
        <button onClick={() => setCenterIdx(idx => Math.max(0, idx - 1))} disabled={centerIdx === 0}>{'<'}</button>
        <button onClick={() => setCenterIdx(idx => Math.min(slides.length - 1, idx + 1))} disabled={centerIdx === slides.length - 1}>{'>'}</button>
      </div>
    </div>
  );
};

export default Onboarding;
