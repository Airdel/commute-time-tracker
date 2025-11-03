import { Commute, Route, CommuteType } from '@/types/commute';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDuration } from '@/lib/time-utils';
import { TrendUp, TrendDown, Clock, ChartBar, MapPin } from '@phosphor-icons/react';
import { useState } from 'react';

interface StatsTabProps {
  commutes: Commute[];
  commuteTypes: CommuteType[];
  routes: Route[];
}

export function StatsTab({ commutes, commuteTypes, routes }: StatsTabProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRoute, setSelectedRoute] = useState<string>('all');

  if (commutes.length < 3) {
    return (
      <Card className="p-12">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <ChartBar size={40} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Datos insuficientes</h3>
            <p className="text-muted-foreground max-w-md">
              Registra al menos 3 traslados para ver tus estadísticas y patrones.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const filteredCommutes = commutes.filter(c => {
    const typeMatch = selectedType === 'all' || c.type === selectedType;
    const routeMatch = selectedRoute === 'all' || c.routeId === selectedRoute;
    return typeMatch && routeMatch;
  });

  const calculateStats = (commuteList: Commute[]) => {
    if (commuteList.length === 0) return null;
    
    const durations = commuteList.map(c => c.duration);
    const avg = durations.reduce((sum, d) => sum + d, 0) / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    
    return { avg, min, max, count: commuteList.length };
  };

  const overallStats = calculateStats(filteredCommutes);

  const last30Days = filteredCommutes.filter(c => {
    const commuteDate = new Date(c.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return commuteDate >= thirtyDaysAgo;
  });

  const getChartData = (commuteList: Commute[], maxItems = 14) => {
    return commuteList.slice(0, maxItems).reverse();
  };

  const chartData = getChartData(filteredCommutes);
  const maxDuration = Math.max(...chartData.map(c => c.duration), 1);

  const statsByType = commuteTypes.map(type => {
    const typeCommutes = filteredCommutes.filter(c => c.type === type.id);
    return {
      type,
      stats: calculateStats(typeCommutes),
    };
  }).filter(item => item.stats !== null);

  const statsByRoute = routes.map(route => {
    const routeCommutes = filteredCommutes.filter(c => c.routeId === route.id);
    return {
      route,
      stats: calculateStats(routeCommutes),
    };
  }).filter(item => item.stats !== null);

  if (!overallStats) {
    return (
      <Card className="p-12">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <ChartBar size={40} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Sin datos para mostrar</h3>
            <p className="text-muted-foreground max-w-md">
              No hay traslados que coincidan con los filtros seleccionados.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de traslado</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {commuteTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ruta</label>
            <Select value={selectedRoute} onValueChange={setSelectedRoute}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las rutas</SelectItem>
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
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock size={20} className="text-primary" weight="bold" />
            </div>
            <h3 className="font-semibold">Promedio general</h3>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">{formatDuration(overallStats.avg)}</div>
            <p className="text-sm text-muted-foreground">{overallStats.count} viajes</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendDown size={20} className="text-green-600" weight="bold" />
            </div>
            <h3 className="font-semibold">Más rápido</h3>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1 text-green-600">{formatDuration(overallStats.min)}</div>
            <p className="text-sm text-muted-foreground">Mejor tiempo</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <TrendUp size={20} className="text-orange-600" weight="bold" />
            </div>
            <h3 className="font-semibold">Más lento</h3>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1 text-orange-600">{formatDuration(overallStats.max)}</div>
            <p className="text-sm text-muted-foreground">Peor tiempo</p>
          </div>
        </Card>
      </div>

      {statsByType.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Por tipo de traslado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statsByType.map(({ type, stats }) => (
              <Card key={type.id} className="p-4">
                <div className="font-medium mb-2">{type.name}</div>
                <div className="text-2xl font-bold mb-1">{formatDuration(stats!.avg)}</div>
                <div className="text-xs text-muted-foreground">{stats!.count} viajes</div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-green-600">↓ {formatDuration(stats!.min)}</span>
                  <span className="text-orange-600">↑ {formatDuration(stats!.max)}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {statsByRoute.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Por ruta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statsByRoute.map(({ route, stats }) => (
              <Card key={route.id} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: route.color }}
                  />
                  <div className="font-medium">{route.name}</div>
                </div>
                <div className="text-2xl font-bold mb-1">{formatDuration(stats!.avg)}</div>
                <div className="text-xs text-muted-foreground">{stats!.count} viajes</div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-green-600">↓ {formatDuration(stats!.min)}</span>
                  <span className="text-orange-600">↑ {formatDuration(stats!.max)}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Traslados recientes</h3>
          <Badge variant="secondary">{last30Days.length} en los últimos 30 días</Badge>
        </div>

        <div>
          <div className="flex items-end gap-2 h-48">
            {chartData.map((commute, idx) => (
              <div key={commute.id} className="flex-1 flex flex-col justify-end items-center gap-1">
                <div className="text-xs text-muted-foreground whitespace-nowrap transform -rotate-45 origin-bottom-left mb-2">
                  {Math.round(commute.duration)}m
                </div>
                <div
                  className="w-full bg-primary rounded-t transition-all hover:bg-primary/80 cursor-pointer"
                  style={{ height: `${(commute.duration / maxDuration) * 100}%`, minHeight: '4px' }}
                  title={`${formatDuration(commute.duration)} - ${new Date(commute.date).toLocaleDateString()}`}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
