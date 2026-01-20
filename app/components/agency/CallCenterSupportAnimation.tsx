"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function CallCenterSupportAnimation() {
  const [callCenterAnimation, setCallCenterAnimation] = useState<any>(null);

  useEffect(() => {
    fetch('/animations/Call Center Support Lottie Animation.json')
      .then(res => res.json())
      .then(data => setCallCenterAnimation(data))
      .catch(err => console.error('Failed to load call center support animation:', err));
  }, []);

  if (!callCenterAnimation) return null;

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-30 pointer-events-none">
      <Lottie 
        animationData={callCenterAnimation} 
        loop={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

