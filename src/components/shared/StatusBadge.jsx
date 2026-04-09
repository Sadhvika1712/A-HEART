import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles = {
  open: 'bg-chart-3/10 text-chart-3 border-chart-3/30',
  assigned: 'bg-chart-4/10 text-chart-4 border-chart-4/30',
  in_progress: 'bg-primary/10 text-primary border-primary/30',
  completed: 'bg-accent/10 text-accent border-accent/30',
  cancelled: 'bg-muted text-muted-foreground border-border',
  available: 'bg-accent/10 text-accent border-accent/30',
  borrowed: 'bg-chart-4/10 text-chart-4 border-chart-4/30',
  returned: 'bg-chart-3/10 text-chart-3 border-chart-3/30',
  active: 'bg-accent/10 text-accent border-accent/30',
  busy: 'bg-chart-4/10 text-chart-4 border-chart-4/30',
  inactive: 'bg-muted text-muted-foreground border-border',
};

export default function StatusBadge({ status }) {
  return (
    <Badge variant="outline" className={cn("text-xs font-medium capitalize", statusStyles[status] || '')}>
      {status?.replace(/_/g, ' ')}
    </Badge>
  );
}
