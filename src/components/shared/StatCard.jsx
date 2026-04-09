import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function StatCard({ title, value, icon: Icon, color, onClick, subtitle }) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative overflow-hidden p-6 transition-all duration-300 hover:shadow-lg",
        onClick && "cursor-pointer hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn("p-3 rounded-xl", color || "bg-primary/10")}>
          <Icon className={cn("w-5 h-5", color ? "text-white" : "text-primary")} />
        </div>
      </div>
    </Card>
  );
}
