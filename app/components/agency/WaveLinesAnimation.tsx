"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function WaveLinesAnimation() {
  const [waveLinesAnimation, setWaveLinesAnimation] = useState<any>(null);

  useEffect(() => {
    fetch('/animations/Wave Lines Animation.json')
      .then(res => res.json())
      .then(data => setWaveLinesAnimation(data))
      .catch(err => console.error('Failed to load wave lines animation:', err));
  }, []);

  if (!waveLinesAnimation) return null;

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-20 -z-10 pointer-events-none">
      <Lottie 
        animationData={waveLinesAnimation} 
        loop={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

