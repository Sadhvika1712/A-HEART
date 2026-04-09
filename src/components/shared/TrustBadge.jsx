import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Award, Shield, Star } from 'lucide-react';

const badgeConfig = {
  trusted_lender: { label: 'Trusted Lender', icon: Shield, className: 'bg-accent/10 text-accent border-accent/30' },
  responsible_borrower: { label: 'Responsible Borrower', icon: Award, className: 'bg-chart-3/10 text-chart-3 border-chart-3/30' },
  top_helper: { label: 'Top Helper', icon: Star, className: 'bg-primary/10 text-primary border-primary/30' },
};

export default function TrustBadge({ badge }) {
  const config = badgeConfig[badge];
  if (!config) return null;
  const Icon = config.icon;
  return (
    <Badge variant="outline" className={`${config.className} text-xs flex items-center gap-1`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
