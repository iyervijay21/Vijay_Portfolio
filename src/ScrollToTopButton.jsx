import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: 'transparent',
        color: 'white',
        borderRadius: '9999px',
        padding: '10px', // smaller padding
        border: '2px solid #7e22ce',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px 2px rgba(126, 34, 206, 0.7)',
        transition: 'background-color 0.3s ease',
        zIndex: 1000,
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(126, 34, 206, 0.15)')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <svg
        style={{ width: '24px', height: '24px' }} // smaller icon
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V6m-7 7l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
