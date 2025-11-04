import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Route, CommuteType, PredictionSettings, TransportMethod } from '@/types/commute';
import { Plus, Pencil, Trash, MapPin, Tag, Clock, Bus, Motorcycle } from '@phosphor-icons/react';
import { toast } from 'sonner';

const DEFAULT_ROUTES: Route[] = [
  { id: 'jasminez', name: 'Jasminez', color: 'oklch(0.45 0.15 250)', isDefault: true, transportMethod: 'bus' },
];

const DEFAULT_TYPES: CommuteType[] = [
  { id: 'to-work', name: 'Hacia el trabajo', icon: 'arrow-right', description: 'Traslado matutino al trabajo' },
  { id: 'from-work', name: 'Desde el trabajo', icon: 'arrow-left', description: 'Traslado vespertino a casa' },
];

export function SettingsTab() {
  const [routes, setRoutes] = useKV<Route[]>('routes', DEFAULT_ROUTES);
  const [commuteTypes, setCommuteTypes] = useKV<CommuteType[]>('commute-types', DEFAULT_TYPES);
  const [predictionSettings, setPredictionSettings] = useKV<PredictionSettings>('prediction-settings', {
    workStartTime: '08:00',
    bufferMinutes: 5,
    daysToAnalyze: 30,
  });

  const [showRouteDialog, setShowRouteDialog] = useState(false);
  const [showTypeDialog, setShowTypeDialog] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [editingType, setEditingType] = useState<CommuteType | null>(null);

  const [routeForm, setRouteForm] = useState({ 
    name: '', 
    color: 'oklch(0.45 0.15 250)',
    transportMethod: 'bus' as TransportMethod
  });
  const [typeForm, setTypeForm] = useState({ name: '', icon: 'map-pin', description: '' });

  const openRouteDialog = (route?: Route) => {
    if (route) {
      setEditingRoute(route);
      setRouteForm({ name: route.name, color: route.color, transportMethod: route.transportMethod });
    } else {
      setEditingRoute(null);
      setRouteForm({ name: '', color: 'oklch(0.45 0.15 250)', transportMethod: 'bus' });
    }
    setShowRouteDialog(true);
  };

  const openTypeDialog = (type?: CommuteType) => {
    if (type) {
      setEditingType(type);
      setTypeForm({ name: type.name, icon: type.icon, description: type.description || '' });
    } else {
      setEditingType(null);
      setTypeForm({ name: '', icon: 'map-pin', description: '' });
    }
    setShowTypeDialog(true);
  };

  const handleSaveRoute = () => {
    if (!routeForm.name.trim()) {
      toast.error('El nombre de la ruta es requerido');
      return;
    }

    if (editingRoute) {
      setRoutes((current) =>
        (current || []).map((r) =>
          r.id === editingRoute.id
            ? { ...r, name: routeForm.name, color: routeForm.color, transportMethod: routeForm.transportMethod }
            : r
        )
      );
      toast.success('Ruta actualizada');
    } else {
      const newRoute: Route = {
        id: `route-${Date.now()}`,
        name: routeForm.name,
        color: routeForm.color,
        transportMethod: routeForm.transportMethod,
      };
      setRoutes((current) => [...(current || []), newRoute]);
      toast.success('Ruta agregada');
    }

    setShowRouteDialog(false);
  };

  const handleSaveType = () => {
    if (!typeForm.name.trim()) {
      toast.error('El nombre del tipo de traslado es requerido');
      return;
    }

    if (editingType) {
      setCommuteTypes((current) =>
        (current || []).map((t) =>
          t.id === editingType.id
            ? { ...t, name: typeForm.name, icon: typeForm.icon, description: typeForm.description }
            : t
        )
      );
      toast.success('Tipo de traslado actualizado');
    } else {
      const newType: CommuteType = {
        id: `type-${Date.now()}`,
        name: typeForm.name,
        icon: typeForm.icon,
        description: typeForm.description,
      };
      setCommuteTypes((current) => [...(current || []), newType]);
      toast.success('Tipo de traslado agregado');
    }

    setShowTypeDialog(false);
  };

  const handleDeleteRoute = (route: Route) => {
    if (route.isDefault) {
      toast.error('No puedes eliminar la ruta predeterminada');
      return;
    }

    if (confirm(`¿Eliminar la ruta "${route.name}"?`)) {
      setRoutes((current) => (current || []).filter((r) => r.id !== route.id));
      toast.success('Ruta eliminada');
    }
  };

  const handleDeleteType = (type: CommuteType) => {
    if (type.id === 'to-work' || type.id === 'from-work') {
      toast.error('No puedes eliminar los tipos de traslado predeterminados');
      return;
    }

    if (confirm(`¿Eliminar el tipo "${type.name}"?`)) {
      setCommuteTypes((current) => (current || []).filter((t) => t.id !== type.id));
      toast.success('Tipo de traslado eliminado');
    }
  };

  const handlePredictionSettingsChange = (field: keyof PredictionSettings, value: string | number) => {
    setPredictionSettings((current) => ({
      ...current!,
      [field]: value,
    }));
  };

  const savePredictionSettings = () => {
    toast.success('Configuración de predicción guardada');
  };

  const colorOptions = [
    { label: 'Azul', value: 'oklch(0.45 0.15 250)' },
    { label: 'Verde', value: 'oklch(0.55 0.15 150)' },
    { label: 'Rojo', value: 'oklch(0.55 0.22 25)' },
    { label: 'Naranja', value: 'oklch(0.65 0.15 50)' },
    { label: 'Morado', value: 'oklch(0.50 0.15 300)' },
    { label: 'Rosa', value: 'oklch(0.65 0.20 350)' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Rutas</h2>
            <p className="text-sm text-muted-foreground">Gestiona las rutas de camión que utilizas</p>
          </div>
          <Button onClick={() => openRouteDialog()} className="gap-2">
            <Plus size={20} weight="bold" />
            Agregar ruta
          </Button>
        </div>

        <div className="space-y-3">
          {(routes || []).map((route) => (
            <Card key={route.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: route.color }}
                  >
                    {route.transportMethod === 'motorbike' ? (
                      <Motorcycle size={20} weight="bold" className="text-white" />
                    ) : (
                      <Bus size={20} weight="bold" className="text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{route.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs mt-1">
                        {route.transportMethod === 'motorbike' ? 'Motoneta' : 'Camión'}
                      </Badge>
                      {route.isDefault && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Predeterminada
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openRouteDialog(route)}
                    className="h-8 w-8"
                  >
                    <Pencil size={16} />
                  </Button>
                  {!route.isDefault && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRoute(route)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Tipos de traslado</h2>
            <p className="text-sm text-muted-foreground">Define diferentes tipos de traslados</p>
          </div>
          <Button onClick={() => openTypeDialog()} className="gap-2">
            <Plus size={20} weight="bold" />
            Agregar tipo
          </Button>
        </div>

        <div className="space-y-3">
          {(commuteTypes || []).map((type) => (
            <Card key={type.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Tag size={20} weight="bold" className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{type.name}</div>
                    {type.description && (
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openTypeDialog(type)}
                    className="h-8 w-8"
                  >
                    <Pencil size={16} />
                  </Button>
                  {type.id !== 'to-work' && type.id !== 'from-work' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteType(type)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Clock size={20} weight="bold" className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Predicción de salidas</h2>
            <p className="text-sm text-muted-foreground">
              Configura tu hora de entrada al trabajo para recibir sugerencias de salida
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="work-start-time">Hora de entrada al trabajo</Label>
            <Input
              id="work-start-time"
              type="time"
              value={predictionSettings?.workStartTime || '08:00'}
              onChange={(e) => handlePredictionSettingsChange('workStartTime', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buffer-minutes">Margen de tiempo (minutos antes)</Label>
            <Input
              id="buffer-minutes"
              type="number"
              min="0"
              max="30"
              value={predictionSettings?.bufferMinutes || 5}
              onChange={(e) => handlePredictionSettingsChange('bufferMinutes', parseInt(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Tiempo extra que quieres llegar antes de tu hora de entrada
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="days-analyze">Días a analizar</Label>
            <Input
              id="days-analyze"
              type="number"
              min="7"
              max="90"
              value={predictionSettings?.daysToAnalyze || 30}
              onChange={(e) => handlePredictionSettingsChange('daysToAnalyze', parseInt(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Cuántos días de historial usar para calcular la predicción
            </p>
          </div>

          <Button onClick={savePredictionSettings} className="w-full">
            Guardar configuración
          </Button>
        </div>
      </Card>

      <Dialog open={showRouteDialog} onOpenChange={setShowRouteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRoute ? 'Editar ruta' : 'Agregar ruta'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="route-name">Nombre de la ruta</Label>
              <Input
                id="route-name"
                placeholder="Ej: Centro, Universidad, Plaza..."
                value={routeForm.name}
                onChange={(e) => setRouteForm({ ...routeForm, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Método de transporte</Label>
              <Select 
                value={routeForm.transportMethod} 
                onValueChange={(value: TransportMethod) => setRouteForm({ ...routeForm, transportMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bus">
                    <div className="flex items-center gap-2">
                      <Bus size={16} weight="bold" />
                      <span>Camión/Autobús</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="motorbike">
                    <div className="flex items-center gap-2">
                      <Motorcycle size={16} weight="bold" />
                      <span>Motoneta/Motocicleta</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <Button
                    key={color.value}
                    type="button"
                    variant={routeForm.color === color.value ? 'default' : 'outline'}
                    onClick={() => setRouteForm({ ...routeForm, color: color.value })}
                    className="gap-2"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowRouteDialog(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleSaveRoute} className="flex-1">
                {editingRoute ? 'Guardar cambios' : 'Agregar ruta'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTypeDialog} onOpenChange={setShowTypeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingType ? 'Editar tipo de traslado' : 'Agregar tipo de traslado'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="type-name">Nombre del tipo</Label>
              <Input
                id="type-name"
                placeholder="Ej: Al gimnasio, A la escuela, Al doctor..."
                value={typeForm.name}
                onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type-description">Descripción (opcional)</Label>
              <Input
                id="type-description"
                placeholder="Breve descripción del tipo de traslado"
                value={typeForm.description}
                onChange={(e) => setTypeForm({ ...typeForm, description: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowTypeDialog(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleSaveType} className="flex-1">
                {editingType ? 'Guardar cambios' : 'Agregar tipo'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
