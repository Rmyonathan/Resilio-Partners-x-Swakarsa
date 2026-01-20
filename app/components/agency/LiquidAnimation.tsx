"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function LiquidAnimation() {
  const [liquidAnimation, setLiquidAnimation] = useState<any>(null);

  useEffect(() => {
    fetch('/animations/Liquid style abstract animated background.json')
      .then(res => res.json())
      .then(data => setLiquidAnimation(data))
      .catch(err => console.error('Failed to load liquid animation:', err));
  }, []);

  if (!liquidAnimation) return null;

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-15 -z-10 pointer-events-none">
      <Lottie 
        animationData={liquidAnimation} 
        loop={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

