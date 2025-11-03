import { useState } from 'react';
import { Commute } from '@/types/commute';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ArrowLeft, Clock, Pencil, Trash, Bus } from '@phosphor-icons/react';
import { formatDuration, formatTime, formatDate, calculateDuration } from '@/lib/time-utils';
import { toast } from 'sonner';

interface HistoryTabProps {
  commutes: Commute[];
  onUpdateCommute: (id: string, updates: Partial<Commute>) => void;
  onDeleteCommute: (id: string) => void;
}

export function HistoryTab({ commutes, onUpdateCommute, onDeleteCommute }: HistoryTabProps) {
  const [selectedCommute, setSelectedCommute] = useState<Commute | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    direction: 'to-work' as 'to-work' | 'from-work',
    departureTime: '',
    arrivalTime: '',
    notes: '',
  });

  const openEditDialog = (commute: Commute) => {
    setEditForm({
      direction: commute.direction,
      departureTime: new Date(commute.departureTime).toISOString().slice(0, 16),
      arrivalTime: new Date(commute.arrivalTime).toISOString().slice(0, 16),
      notes: commute.notes || '',
    });
    setSelectedCommute(commute);
    setEditDialog(true);
  };

  const handleUpdate = () => {
    if (!selectedCommute) return;

    if (!editForm.departureTime || !editForm.arrivalTime) {
      toast.error('Please fill in both departure and arrival times');
      return;
    }

    const duration = calculateDuration(editForm.departureTime, editForm.arrivalTime);
    
    if (duration <= 0) {
      toast.error('Arrival time must be after departure time');
      return;
    }

    onUpdateCommute(selectedCommute.id, {
      direction: editForm.direction,
      departureTime: editForm.departureTime,
      arrivalTime: editForm.arrivalTime,
      duration,
      notes: editForm.notes || undefined,
    });

    setEditDialog(false);
    setSelectedCommute(null);
    toast.success('Commute updated successfully!');
  };

  const handleDelete = (commute: Commute) => {
    if (confirm('Are you sure you want to delete this commute?')) {
      onDeleteCommute(commute.id);
      toast.success('Commute deleted');
    }
  };

  if (commutes.length === 0) {
    return (
      <Card className="p-12">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <Bus size={40} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">No Commutes Yet</h3>
            <p className="text-muted-foreground max-w-md">
              Start tracking your commutes by using the timer or adding them manually in the Logger tab.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const groupedCommutes = commutes.reduce((groups, commute) => {
    const date = formatDate(commute.date);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(commute);
    return groups;
  }, {} as Record<string, Commute[]>);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Commute History</h2>
          <Badge variant="secondary">{commutes.length} trips</Badge>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {Object.entries(groupedCommutes).map(([date, dateCommutes]) => (
              <div key={date}>
                <div className="sticky top-0 bg-background py-2 mb-3">
                  <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
                  <Separator className="mt-2" />
                </div>

                <div className="space-y-3">
                  {dateCommutes.map((commute) => (
                    <Card key={commute.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={commute.direction === 'to-work' ? 'default' : 'secondary'}>
                              {commute.direction === 'to-work' ? (
                                <><ArrowRight className="mr-1" weight="bold" size={14} /> To Work</>
                              ) : (
                                <><ArrowLeft className="mr-1" weight="bold" size={14} /> From Work</>
                              )}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Clock size={14} weight="bold" />
                              {formatDuration(commute.duration)}
                            </Badge>
                          </div>

                          <div className="text-sm text-muted-foreground mb-1">
                            {formatTime(commute.departureTime)} → {formatTime(commute.arrivalTime)}
                          </div>

                          {commute.notes && (
                            <p className="text-sm text-foreground mt-2 line-clamp-2">
                              {commute.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(commute)}
                            className="h-8 w-8"
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(commute)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Commute</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Direction</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={editForm.direction === 'to-work' ? 'default' : 'outline'}
                  onClick={() => setEditForm({ ...editForm, direction: 'to-work' })}
                  className="gap-2"
                >
                  <ArrowRight weight="bold" size={18} />
                  To Work
                </Button>
                <Button
                  type="button"
                  variant={editForm.direction === 'from-work' ? 'default' : 'outline'}
                  onClick={() => setEditForm({ ...editForm, direction: 'from-work' })}
                  className="gap-2"
                >
                  <ArrowLeft weight="bold" size={18} />
                  From Work
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-departure-time">Departure Time</Label>
              <Input
                id="edit-departure-time"
                type="datetime-local"
                value={editForm.departureTime}
                onChange={(e) => setEditForm({ ...editForm, departureTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-arrival-time">Arrival Time</Label>
              <Input
                id="edit-arrival-time"
                type="datetime-local"
                value={editForm.arrivalTime}
                onChange={(e) => setEditForm({ ...editForm, arrivalTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes (Optional)</Label>
              <Textarea
                id="edit-notes"
                placeholder="Bus number, delays, traffic conditions..."
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleUpdate} className="flex-1">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
