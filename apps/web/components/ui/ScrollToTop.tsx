// Path: apps\web\components\ui\ScrollToTop.tsx

'use client';

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down past 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Smooth scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-24 right-7 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          ${
            isVisible
              ? 'opacity-80 scale-100'
              : 'opacity-0 scale-75 pointer-events-none'
          }
          flex h-12 w-12 items-center justify-center rounded-full bg-navy-mid text-gray-100 shadow-lg 
          transition-all duration-300 ease-in-out hover:bg-navy hover:shadow-xl 
          focus:outline-none focus:ring-2 focus:bg-navy focus:ring-offset-2
        `}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default ScrollToTop;
