import { Commute } from '@/types/commute';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDuration } from '@/lib/time-utils';
import { ArrowRight, ArrowLeft, TrendUp, TrendDown, Clock, ChartBar, Bus } from '@phosphor-icons/react';

interface StatsTabProps {
  commutes: Commute[];
}

export function StatsTab({ commutes }: StatsTabProps) {
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

  const toWorkCommutes = commutes.filter(c => c.direction === 'to-work');
  const fromWorkCommutes = commutes.filter(c => c.direction === 'from-work');

  const calculateStats = (commuteList: Commute[]) => {
    if (commuteList.length === 0) return null;
    
    const durations = commuteList.map(c => c.duration);
    const avg = durations.reduce((sum, d) => sum + d, 0) / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    
    return { avg, min, max, count: commuteList.length };
  };

  const toWorkStats = calculateStats(toWorkCommutes);
  const fromWorkStats = calculateStats(fromWorkCommutes);
  const overallStats = calculateStats(commutes);

  const last30Days = commutes.filter(c => {
    const commuteDate = new Date(c.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return commuteDate >= thirtyDaysAgo;
  });

  const recentToWork = last30Days.filter(c => c.direction === 'to-work');
  const recentFromWork = last30Days.filter(c => c.direction === 'from-work');

  const getChartData = (commuteList: Commute[], maxItems = 14) => {
    return commuteList.slice(0, maxItems).reverse();
  };

  const toWorkChartData = getChartData(toWorkCommutes);
  const fromWorkChartData = getChartData(fromWorkCommutes);

  const maxDuration = Math.max(
    ...toWorkChartData.map(c => c.duration),
    ...fromWorkChartData.map(c => c.duration),
    1
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock size={20} className="text-primary" weight="bold" />
            </div>
            <h3 className="font-semibold">Promedio general</h3>
          </div>
          {overallStats && (
            <div>
              <div className="text-3xl font-bold mb-1">{formatDuration(overallStats.avg)}</div>
              <p className="text-sm text-muted-foreground">{overallStats.count} viajes totales</p>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ArrowRight size={20} className="text-primary" weight="bold" />
            </div>
            <h3 className="font-semibold">Hacia el trabajo</h3>
          </div>
          {toWorkStats ? (
            <div>
              <div className="text-3xl font-bold mb-1">{formatDuration(toWorkStats.avg)}</div>
              <p className="text-sm text-muted-foreground">{toWorkStats.count} viajes</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sin datos aún</p>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ArrowLeft size={20} className="text-primary" weight="bold" />
            </div>
            <h3 className="font-semibold">Desde el trabajo</h3>
          </div>
          {fromWorkStats ? (
            <div>
              <div className="text-3xl font-bold mb-1">{formatDuration(fromWorkStats.avg)}</div>
              <p className="text-sm text-muted-foreground">{fromWorkStats.count} viajes</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sin datos aún</p>
          )}
        </Card>
      </div>

      {toWorkStats && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Resumen hacia el trabajo</h3>
            <Badge variant="secondary">
              <ArrowRight size={14} weight="bold" className="mr-1" />
              {toWorkStats.count} viajes
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Más rápido</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-green-600">
                  {formatDuration(toWorkStats.min)}
                </span>
                <TrendDown size={20} className="text-green-600" weight="bold" />
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Más lento</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-orange-600">
                  {formatDuration(toWorkStats.max)}
                </span>
                <TrendUp size={20} className="text-orange-600" weight="bold" />
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Últimos 30 días</div>
              <div className="text-2xl font-semibold">
                {recentToWork.length} viajes
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-3">Traslados recientes</div>
            <div className="flex items-end gap-2 h-32">
              {toWorkChartData.map((commute, idx) => (
                <div key={commute.id} className="flex-1 flex flex-col justify-end items-center gap-1">
                  <div className="text-xs text-muted-foreground whitespace-nowrap transform -rotate-45 origin-bottom-left mb-2">
                    {Math.round(commute.duration)}m
                  </div>
                  <div
                    className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{ height: `${(commute.duration / maxDuration) * 100}%`, minHeight: '4px' }}
                    title={`${formatDuration(commute.duration)} - ${new Date(commute.date).toLocaleDateString()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {fromWorkStats && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Resumen desde el trabajo</h3>
            <Badge variant="secondary">
              <ArrowLeft size={14} weight="bold" className="mr-1" />
              {fromWorkStats.count} viajes
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Más rápido</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-green-600">
                  {formatDuration(fromWorkStats.min)}
                </span>
                <TrendDown size={20} className="text-green-600" weight="bold" />
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Más lento</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-orange-600">
                  {formatDuration(fromWorkStats.max)}
                </span>
                <TrendUp size={20} className="text-orange-600" weight="bold" />
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Últimos 30 días</div>
              <div className="text-2xl font-semibold">
                {recentFromWork.length} viajes
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-3">Traslados recientes</div>
            <div className="flex items-end gap-2 h-32">
              {fromWorkChartData.map((commute, idx) => (
                <div key={commute.id} className="flex-1 flex flex-col justify-end items-center gap-1">
                  <div className="text-xs text-muted-foreground whitespace-nowrap transform -rotate-45 origin-bottom-left mb-2">
                    {Math.round(commute.duration)}m
                  </div>
                  <div
                    className="w-full bg-accent rounded-t transition-all hover:bg-accent/80"
                    style={{ height: `${(commute.duration / maxDuration) * 100}%`, minHeight: '4px' }}
                    title={`${formatDuration(commute.duration)} - ${new Date(commute.date).toLocaleDateString()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
