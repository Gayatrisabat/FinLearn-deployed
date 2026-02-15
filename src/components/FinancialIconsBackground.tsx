import { DollarSign, Coins, PiggyBank, TrendingUp, Wallet, CreditCard, Banknote, CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";

const icons = [DollarSign, Coins, PiggyBank, TrendingUp, Wallet, CreditCard, Banknote, CircleDollarSign];

interface IconPosition {
  id: number;
  Icon: typeof DollarSign;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const FinancialIconsBackground = () => {
  const [iconPositions, setIconPositions] = useState<IconPosition[]>([]);

  useEffect(() => {
    const positions: IconPosition[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: 120 + Math.random() * 20, // Start from right side
      y: Math.random() * 100,
      size: 64 + Math.random() * 96, // Larger icons (64-160px)
      duration: 8 + Math.random() * 6, // Faster (8-14s instead of 20-40s)
      delay: Math.random() * 2, // Less delay (0-2s)
    }));
    setIconPositions(positions);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.05]">
      {iconPositions.map(({ id, Icon, x, y, size, duration, delay }) => (
        <div
          key={id}
          className="absolute animate-float-move"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon size={size} className="text-primary" />
        </div>
      ))}
      
      <style>{`
        @keyframes floatMove {
          0% {
            transform: translate(0, 0) scale(1.2) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translate(-100vw, -20px) scale(1) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: translate(-200vw, 0) scale(1.2) rotate(360deg);
            opacity: 0.2;
          }
        }
        .animate-float-move {
          animation: floatMove linear infinite;
        }
      `}</style>
    </div>
  );
};