"use client";

interface PortfolioImageProps {
  src: string;
  alt: string;
  title: string;
}

export default function PortfolioImage({ src, alt, title }: PortfolioImageProps) {
  return (
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = `https://placehold.co/800x400/1e293b/64748b?text=${encodeURIComponent(title)}`;
      }}
    />
  );
}

