import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const CRITERIA_LABELS = {
  helper_rates_requester: [
    { key: 'timeliness', label: 'Timely Communication' },
    { key: 'communication', label: 'Responsiveness' },
    { key: 'responsibility', label: 'Responsibility' },
    { key: 'quality', label: 'Cooperation' },
  ],
  requester_rates_helper: [
    { key: 'quality', label: 'Quality of Help' },
    { key: 'timeliness', label: 'Timeliness' },
    { key: 'communication', label: 'Communication' },
    { key: 'responsibility', label: 'Reliability' },
  ],
  owner_rates_borrower: [
    { key: 'timeliness', label: 'Returned on Time' },
    { key: 'responsibility', label: 'Took Care of Item' },
    { key: 'communication', label: 'Communication' },
    { key: 'quality', label: 'Overall Conduct' },
  ],
  borrower_rates_owner: [
    { key: 'quality', label: 'Item Condition' },
    { key: 'timeliness', label: 'Honesty' },
    { key: 'communication', label: 'Helpfulness' },
    { key: 'responsibility', label: 'Cooperation' },
  ],
};

const ROLE_TITLES = {
  helper_rates_requester: 'Rate the Requester',
  requester_rates_helper: 'Rate the Helper',
  owner_rates_borrower: 'Rate the Borrower',
  borrower_rates_owner: 'Rate the Resource Owner',
};

export default function MutualRatingDialog({ open, onClose, onSubmit, ratingType, targetName }) {
  const [overall, setOverall] = useState(0);
  const [hover, setHover] = useState(0);
  const [criteria, setCriteria] = useState({ timeliness: 3, communication: 3, quality: 3, responsibility: 3 });
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const criteriaList = CRITERIA_LABELS[ratingType] || CRITERIA_LABELS.requester_rates_helper;

  const handleSubmit = async () => {
    if (!overall) return;
    setSubmitting(true);
    await onSubmit({ score: overall, criteria, feedback });
    setSubmitting(false);
    setOverall(0); setFeedback('');
    setCriteria({ timeliness: 3, communication: 3, quality: 3, responsibility: 3 });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{ROLE_TITLES[ratingType] || 'Rate'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            How was your experience with <span className="font-semibold text-foreground">{targetName}</span>?
          </p>

          {/* Overall stars */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Overall Rating</p>
            <div className="flex justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <button key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setOverall(i)}>
                  <Star className={cn("w-8 h-8 transition-colors", i <= (hover || overall) ? "fill-primary text-primary" : "text-border")} />
                </button>
              ))}
            </div>
            {overall > 0 && <p className="text-sm font-medium text-primary mt-1">{['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][overall]}</p>}
          </div>

          {/* Criteria sliders */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Detailed Ratings</p>
            {criteriaList.map(c => (
              <div key={c.key} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className="font-medium text-foreground">{criteria[c.key]}/5</span>
                </div>
                <Slider
                  min={1} max={5} step={1}
                  value={[criteria[c.key]]}
                  onValueChange={([v]) => setCriteria(prev => ({ ...prev, [c.key]: v }))}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div>
            <Label>Written Feedback (optional)</Label>
            <Textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Share your experience..." className="mt-1 h-20" />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Skip for Now</Button>
            <Button onClick={handleSubmit} disabled={!overall || submitting}>
              {submitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
