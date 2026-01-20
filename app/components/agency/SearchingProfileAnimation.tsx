"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function SearchingProfileAnimation() {
  const [searchingAnimation, setSearchingAnimation] = useState<any>(null);

  useEffect(() => {
    fetch('/animations/searching for profile.json')
      .then(res => res.json())
      .then(data => setSearchingAnimation(data))
      .catch(err => console.error('Failed to load searching for profile animation:', err));
  }, []);

  if (!searchingAnimation) return null;

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-30 pointer-events-none" style={{ background: 'transparent' }}>
      <Lottie 
        animationData={searchingAnimation} 
        loop={true}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      />
    </div>
  );
}

