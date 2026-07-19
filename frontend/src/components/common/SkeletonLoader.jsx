export default function SkeletonLoader({ className = '', variant = 'default' }) {
  const variants = {
    default: 'h-4 w-full',
    circle: 'h-12 w-12 rounded-full',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-48 w-full',
    text: 'h-4 w-3/4',
    button: 'h-10 w-24',
  };

  return (
    <div
      className={`animate-skeleton rounded-md bg-black/[0.04] ${className} ${variants[variant] || variants.default}`}
    />
  );
}
