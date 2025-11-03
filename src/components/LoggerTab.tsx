import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Commute, TimerState, Route, CommuteType, PredictionSettings } from '@/types/commute';
import { Play, Stop, Plus, Clock, MapPin } from '@phosphor-icons/react';
import { calculateDuration, formatDuration } from '@/lib/time-utils';
import { PredictionCard } from '@/components/PredictionCard';
import { toast } from 'sonner';

interface LoggerTabProps {
  timerState: TimerState;
  setTimerState: (state: TimerState | ((prev: TimerState) => TimerState)) => void;
  onAddCommute: (commute: Commute) => void;
  routes: Route[];
  commuteTypes: CommuteType[];
  commutes: Commute[];
}

export function LoggerTab({ timerState, setTimerState, onAddCommute, routes, commuteTypes, commutes }: LoggerTabProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [predictionSettings] = useKV<PredictionSettings>('prediction-settings', {
    workStartTime: '08:00',
    bufferMinutes: 5,
    daysToAnalyze: 30,
  });
  
  const [manualForm, setManualForm] = useState({
    type: 'to-work',
    routeId: '',
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

  const openStartDialog = (typeId: string) => {
    setSelectedType(typeId);
    setSelectedRoute(routes[0]?.id || '');
    setShowStartDialog(true);
  };

  const startTimer = () => {
    if (!selectedType) return;

    setTimerState({
      isActive: true,
      type: selectedType,
      routeId: selectedRoute,
      startTime: new Date().toISOString(),
    });
    setElapsedTime(0);
    setShowStartDialog(false);
    
    const typeName = commuteTypes.find(t => t.id === selectedType)?.name || 'traslado';
    toast.success(`Cronómetro iniciado para ${typeName}`);
  };

  const stopTimer = () => {
    if (!timerState.startTime || !timerState.type) return;

    const duration = calculateDuration(timerState.startTime, new Date().toISOString());
    
    if (duration > 180) {
      if (!confirm(`Este traslado duró ${formatDuration(duration)}. ¿Estás seguro?`)) {
        return;
      }
    }

    const commute: Commute = {
      id: Date.now().toString(),
      type: timerState.type,
      routeId: timerState.routeId || undefined,
      departureTime: timerState.startTime,
      arrivalTime: new Date().toISOString(),
      duration,
      date: new Date().toISOString(),
    };

    onAddCommute(commute);
    setTimerState({
      isActive: false,
      type: null,
      startTime: null,
    });
    setElapsedTime(0);
    toast.success('¡Traslado registrado exitosamente!');
  };

  const openManualDialog = () => {
    const now = new Date();
    const nowString = now.toISOString().slice(0, 16);
    setManualForm({
      type: 'to-work',
      routeId: routes[0]?.id || '',
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
      type: manualForm.type,
      routeId: manualForm.routeId,
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

  const activeType = commuteTypes.find(t => t.id === timerState.type);
  const activeRoute = routes.find(r => r.id === timerState.routeId);

  return (
    <div className="space-y-6">
      {predictionSettings && (
        <PredictionCard
          commutes={commutes}
          predictionSettings={predictionSettings}
          commuteType="to-work"
        />
      )}

      {timerState.isActive ? (
        <Card className="p-8 md:p-12">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Badge variant="secondary" className="text-base px-4 py-2">
                {activeType?.name || 'Traslado'}
              </Badge>
              {activeRoute && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} weight="fill" />
                  <span>{activeRoute.name}</span>
                </div>
              )}
            </div>

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
                <p className="text-muted-foreground">Selecciona el tipo de traslado para comenzar</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {commuteTypes.map((type) => (
                  <Button
                    key={type.id}
                    size="lg"
                    onClick={() => openStartDialog(type.id)}
                    className="h-24 gap-3 text-lg"
                  >
                    <Play weight="fill" size={24} />
                    <div className="flex flex-col items-start">
                      <span>{type.name}</span>
                      {type.description && (
                        <span className="text-xs opacity-80 font-normal">{type.description}</span>
                      )}
                    </div>
                  </Button>
                ))}
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

      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Iniciar traslado</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="start-type">Tipo de traslado</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="start-type">
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  {commuteTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-route">Ruta</Label>
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger id="start-route">
                  <SelectValue placeholder="Selecciona ruta" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route) => (
                    <SelectItem key={route.id} value={route.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: route.color }}
                        />
                        {route.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowStartDialog(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={startTimer} className="flex-1">
                Iniciar cronómetro
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar traslado manualmente</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="manual-type">Tipo de traslado</Label>
              <Select value={manualForm.type} onValueChange={(value) => setManualForm({ ...manualForm, type: value })}>
                <SelectTrigger id="manual-type">
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  {commuteTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="manual-route">Ruta</Label>
              <Select value={manualForm.routeId} onValueChange={(value) => setManualForm({ ...manualForm, routeId: value })}>
                <SelectTrigger id="manual-route">
                  <SelectValue placeholder="Selecciona ruta" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route) => (
                    <SelectItem key={route.id} value={route.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: route.color }}
                        />
                        {route.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
