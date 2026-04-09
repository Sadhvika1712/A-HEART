import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TrustScore({ score, size = 'md' }) {
  const s = score || 3;
  const sizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={cn(
            sizes[size],
            i <= Math.round(s) ? 'fill-primary text-primary' : 'text-border'
          )}
        />
      ))}
      <span className="text-sm font-medium text-muted-foreground ml-1">{s.toFixed(1)}</span>
    </div>
  );
}
