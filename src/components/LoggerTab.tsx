import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Commute, TimerState } from '@/types/commute';
import { Play, Stop, Plus, Clock, ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { calculateDuration, formatDuration } from '@/lib/time-utils';
import { toast } from 'sonner';

interface LoggerTabProps {
  timerState: TimerState;
  setTimerState: (state: TimerState | ((prev: TimerState) => TimerState)) => void;
  onAddCommute: (commute: Commute) => void;
}

export function LoggerTab({ timerState, setTimerState, onAddCommute }: LoggerTabProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [manualForm, setManualForm] = useState({
    direction: 'to-work' as 'to-work' | 'from-work',
    departureTime: '',
    arrivalTime: '',
    notes: '',
  });

  useEffect(() => {
    let interval: number | undefined;
    
    if (timerState.isActive && timerState.startTime) {
      interval = window.setInterval(() => {
        const now = new Date().getTime();
        const start = new Date(timerState.startTime!).getTime();
        setElapsedTime(Math.floor((now - start) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isActive, timerState.startTime]);

  const startTimer = (direction: 'to-work' | 'from-work') => {
    setTimerState({
      isActive: true,
      direction,
      startTime: new Date().toISOString(),
    });
    setElapsedTime(0);
    toast.success(`Cronómetro iniciado para ${direction === 'to-work' ? 'ir al trabajo' : 'regresar del trabajo'}`);
  };

  const stopTimer = () => {
    if (!timerState.startTime || !timerState.direction) return;

    const duration = calculateDuration(timerState.startTime, new Date().toISOString());
    
    if (duration > 180) {
      if (!confirm(`Este traslado duró ${formatDuration(duration)}. ¿Estás seguro?`)) {
        return;
      }
    }

    const commute: Commute = {
      id: Date.now().toString(),
      direction: timerState.direction,
      departureTime: timerState.startTime,
      arrivalTime: new Date().toISOString(),
      duration,
      date: new Date().toISOString(),
    };

    onAddCommute(commute);
    setTimerState({
      isActive: false,
      direction: null,
      startTime: null,
    });
    setElapsedTime(0);
    toast.success('¡Traslado registrado exitosamente!');
  };

  const openManualDialog = () => {
    const now = new Date();
    const nowString = now.toISOString().slice(0, 16);
    setManualForm({
      direction: 'to-work',
      departureTime: nowString,
      arrivalTime: nowString,
      notes: '',
    });
    setShowManualDialog(true);
  };

  const handleManualSubmit = () => {
    if (!manualForm.departureTime || !manualForm.arrivalTime) {
      toast.error('Por favor completa la hora de salida y llegada');
      return;
    }

    const duration = calculateDuration(manualForm.departureTime, manualForm.arrivalTime);
    
    if (duration <= 0) {
      toast.error('La hora de llegada debe ser después de la salida');
      return;
    }

    const commute: Commute = {
      id: Date.now().toString(),
      direction: manualForm.direction,
      departureTime: manualForm.departureTime,
      arrivalTime: manualForm.arrivalTime,
      duration,
      notes: manualForm.notes || undefined,
      date: manualForm.departureTime,
    };

    onAddCommute(commute);
    setShowManualDialog(false);
    toast.success('¡Traslado registrado exitosamente!');
  };

  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {timerState.isActive ? (
        <Card className="p-8 md:p-12">
          <div className="flex flex-col items-center gap-6">
            <Badge variant="secondary" className="text-base px-4 py-2">
              {timerState.direction === 'to-work' ? (
                <><ArrowRight className="mr-2" weight="bold" size={18} /> Hacia el trabajo</>
              ) : (
                <><ArrowLeft className="mr-2" weight="bold" size={18} /> Desde el trabajo</>
              )}
            </Badge>

            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-primary/20 flex items-center justify-center timer-pulse">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-semibold tabular-nums text-foreground">
                    {formatElapsedTime(elapsedTime)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Tiempo transcurrido</div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              variant="destructive"
              onClick={stopTimer}
              className="w-full max-w-xs gap-2"
            >
              <Stop weight="fill" size={20} />
              Terminar viaje
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <Card className="p-6 md:p-8">
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">Inicia tu traslado</h2>
                <p className="text-muted-foreground">Presiona un botón para comenzar a cronometrar</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                <Button
                  size="lg"
                  onClick={() => startTimer('to-work')}
                  className="h-24 gap-3 text-lg"
                >
                  <Play weight="fill" size={24} />
                  <div className="flex flex-col items-start">
                    <span>Hacia el trabajo</span>
                    <span className="text-xs opacity-80 font-normal">Iniciar traslado matutino</span>
                  </div>
                </Button>

                <Button
                  size="lg"
                  onClick={() => startTimer('from-work')}
                  className="h-24 gap-3 text-lg"
                >
                  <Play weight="fill" size={24} />
                  <div className="flex flex-col items-start">
                    <span>Desde el trabajo</span>
                    <span className="text-xs opacity-80 font-normal">Iniciar traslado vespertino</span>
                  </div>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Entrada manual</h3>
                <p className="text-sm text-muted-foreground">
                  Registra un traslado pasado o ingresa los horarios manualmente
                </p>
              </div>
              <Button variant="outline" onClick={openManualDialog} className="gap-2">
                <Plus size={20} weight="bold" />
                Agregar traslado
              </Button>
            </div>
          </Card>
        </>
      )}

      <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar traslado manualmente</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Dirección</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={manualForm.direction === 'to-work' ? 'default' : 'outline'}
                  onClick={() => setManualForm({ ...manualForm, direction: 'to-work' })}
                  className="gap-2"
                >
                  <ArrowRight weight="bold" size={18} />
                  Hacia el trabajo
                </Button>
                <Button
                  type="button"
                  variant={manualForm.direction === 'from-work' ? 'default' : 'outline'}
                  onClick={() => setManualForm({ ...manualForm, direction: 'from-work' })}
                  className="gap-2"
                >
                  <ArrowLeft weight="bold" size={18} />
                  Desde el trabajo
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departure-time">Hora de salida</Label>
              <Input
                id="departure-time"
                type="datetime-local"
                value={manualForm.departureTime}
                onChange={(e) => setManualForm({ ...manualForm, departureTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrival-time">Hora de llegada</Label>
              <Input
                id="arrival-time"
                type="datetime-local"
                value={manualForm.arrivalTime}
                onChange={(e) => setManualForm({ ...manualForm, arrivalTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas (Opcional)</Label>
              <Textarea
                id="notes"
                placeholder="Número de camión, retrasos, condiciones del tráfico..."
                value={manualForm.notes}
                onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowManualDialog(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleManualSubmit} className="flex-1">
                Guardar traslado
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
