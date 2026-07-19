import { useState } from 'react';

const FALLBACK_IMAGES = {
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=450&fit=crop',
  food: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop',
  dessert: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&h=300&fit=crop',
  indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop',
  chinese: 'https://images.unsplash.com/photo-1525755662778-989d0520907e?w=300&h=300&fit=crop',
  healthy: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
  beverage: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=300&h=300&fit=crop',
};

export default function ImageWithFallback({ 
  src, 
  alt, 
  fallbackType = 'food',
  className = '',
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACK_IMAGES[fallbackType] || FALLBACK_IMAGES.food);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 animate-skeleton bg-black/[0.04]" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
}
