import React, { useState, useEffect } from 'react';

const phrases = [
  "Once I was your best friend",
  "And became your first lover", 
  "Don't forget about me"
];

const RomanticMessage = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

  // Generate random stars for background
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 3 + 1
    }));
    setStars(newStars);
  }, []);

  const handleClick = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div 
      className="min-h-screen w-full bg-romantic-gradient cursor-romantic relative overflow-hidden flex items-center justify-center"
      onClick={handleClick}
    >
      {/* Starry Background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-romantic-gold animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-romantic-pink rounded-full opacity-40 animate-float"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main Message */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <div
          className={`transition-all duration-700 transform ${
            isTransitioning 
              ? 'opacity-0 translate-y-8 scale-95' 
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-romantic leading-tight mb-8">
            {phrases[currentPhrase]}
          </h1>
          
          <div className="text-romantic-gold-bright text-lg md:text-xl font-light tracking-wide opacity-80">
            Tap to continue...
          </div>
        </div>

        {/* Romantic glow effect */}
        <div className="absolute inset-0 bg-romantic-gold opacity-5 blur-3xl rounded-full animate-pulse" />
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {phrases.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentPhrase 
                ? 'bg-romantic-gold scale-125' 
                : 'bg-romantic-gold opacity-30'
            }`}
          />
        ))}
      </div>

      {/* Ambient glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-romantic-purple via-transparent to-romantic-purple-light opacity-50 pointer-events-none" />
    </div>
  );
};

export default RomanticMessage;