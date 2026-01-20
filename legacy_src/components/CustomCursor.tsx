
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, input, select, [role="button"]');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gray-400 pointer-events-none z-[9999] transition-transform duration-300 ease-out flex items-center justify-center"
        style={{ 
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0) scale(${isHovering ? 2.5 : 1})`,
          mixBlendMode: 'difference'
        }}
      >
        <div className={`w-1 h-1 rounded-full bg-white transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
      </div>
    </>
  );
};

export default CustomCursor;
