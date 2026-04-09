import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, User, Clock, Star, Zap } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import UrgencyBadge from '@/components/shared/UrgencyBadge';
import moment from 'moment';

const categoryLabels = { skill: 'Skill', tool: 'Tool', resource: 'Resource', general_help: 'General Help' };

export default function RequestCard({ request, onAccept, onComplete, onRate, currentUserEmail }) {
  const isRequester = request.requester_email === currentUserEmail;
  const isHelper = request.assigned_helper_email === currentUserEmail;

  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground truncate">{request.title}</h3>
            {isRequester && <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20 shrink-0">Mine</Badge>}
            {isHelper && <Badge variant="outline" className="text-xs bg-accent/5 text-accent border-accent/20 shrink-0">Assigned to Me</Badge>}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{request.requester_name}</span>
            {request.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{request.location}</span>}
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{moment(request.created_date).fromNow()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <UrgencyBadge urgency={request.urgency} />
          <StatusBadge status={request.status} />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{request.description}</p>

      {request.match_reason && (
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-primary/5 rounded-lg p-2 mb-3">
          <Zap className="w-3 h-3 text-primary mt-0.5 shrink-0" />
          <span>AI matched: {request.match_reason}</span>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground capitalize">
          {categoryLabels[request.category]}
        </span>

        <div className="flex gap-2 flex-wrap items-center">
          {request.assigned_helper_name && request.status !== 'open' && (
            <span className="text-xs text-muted-foreground">
              Helper: <span className="font-medium text-foreground">{request.assigned_helper_name}</span>
            </span>
          )}
          {request.status === 'open' && !isRequester && onAccept && (
            <Button size="sm" onClick={() => onAccept(request)}>Accept & Help</Button>
          )}
          {request.status === 'assigned' && isHelper && (
            <Button size="sm" variant="outline" onClick={() => onComplete(request, 'in_progress')}>Start Working</Button>
          )}
          {request.status === 'in_progress' && isHelper && (
            <Button size="sm" onClick={() => onComplete(request, 'completed')}>Mark Complete</Button>
          )}
          {request.status === 'completed' && isRequester && !request.requester_rated_helper && onRate && (
            <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => onRate(request, 'requester_rates_helper')}>
              <Star className="w-3 h-3" />Rate Helper
            </Button>
          )}
          {request.status === 'completed' && isHelper && !request.helper_rated_requester && onRate && (
            <Button size="sm" variant="ghost" className="flex items-center gap-1" onClick={() => onRate(request, 'helper_rates_requester')}>
              <Star className="w-3 h-3" />Rate Requester
            </Button>
          )}
          {request.status === 'completed' && (
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 text-xs">✓ Completed</Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
