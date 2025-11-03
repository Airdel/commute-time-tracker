import { Commute, PredictionSettings } from '@/types/commute';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendUp, Calendar, Lightbulb } from '@phosphor-icons/react';
import { formatTime } from '@/lib/time-utils';

interface PredictionCardProps {
  commutes: Commute[];
  predictionSettings: PredictionSettings;
  commuteType: string;
}

export function PredictionCard({ commutes, predictionSettings, commuteType }: PredictionCardProps) {
  const calculatePrediction = () => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - predictionSettings.daysToAnalyze);

    const relevantCommutes = commutes.filter((c) => {
      const commuteDate = new Date(c.date);
      return c.type === commuteType && commuteDate >= cutoffDate;
    });

    if (relevantCommutes.length < 3) {
      return null;
    }

    const durations = relevantCommutes.map((c) => c.duration);
    const avgDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length;
    
    durations.sort((a, b) => a - b);
    const p75Index = Math.ceil(durations.length * 0.75) - 1;
    const p75Duration = durations[p75Index];

    const [hours, minutes] = predictionSettings.workStartTime.split(':').map(Number);
    const targetArrival = new Date();
    targetArrival.setHours(hours, minutes - predictionSettings.bufferMinutes, 0, 0);

    const suggestedDeparture = new Date(targetArrival);
    suggestedDeparture.setMinutes(suggestedDeparture.getMinutes() - Math.ceil(p75Duration));

    const conservativeDeparture = new Date(targetArrival);
    conservativeDeparture.setMinutes(conservativeDeparture.getMinutes() - Math.ceil(p75Duration) - 5);

    return {
      avgDuration: Math.round(avgDuration),
      p75Duration: Math.round(p75Duration),
      suggestedDeparture,
      conservativeDeparture,
      targetArrival,
      sampleSize: relevantCommutes.length,
    };
  };

  const prediction = calculatePrediction();

  if (!prediction) {
    return (
      <Card className="p-6 border-dashed">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Lightbulb size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Predicción no disponible</h3>
            <p className="text-sm text-muted-foreground">
              Registra al menos 3 traslados de este tipo para ver predicciones de salida basadas en tu
              historial.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const formatDepartureTime = (date: Date) => {
    return date.toLocaleTimeString('es-MX', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <Lightbulb size={20} weight="bold" className="text-accent-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">Sugerencia de salida</h3>
          <p className="text-sm text-muted-foreground">
            Basado en tus últimos {prediction.sampleSize} traslados
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background/80 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} weight="bold" className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Hora recomendada</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatDepartureTime(prediction.suggestedDeparture)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Llegas aproximadamente a las {formatDepartureTime(prediction.targetArrival)}
            </p>
          </div>

          <div className="bg-background/80 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendUp size={16} weight="bold" className="text-orange-600" />
              <span className="text-sm font-medium text-muted-foreground">Salida conservadora</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatDepartureTime(prediction.conservativeDeparture)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">5 minutos extra de margen</p>
          </div>
        </div>

        <div className="bg-background/50 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Calendar size={16} weight="bold" className="text-muted-foreground mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p>
                <strong>Promedio de duración:</strong> {prediction.avgDuration} minutos
              </p>
              <p>
                <strong>75% de tus viajes duran:</strong> {prediction.p75Duration} minutos o menos
              </p>
            </div>
          </div>
        </div>

        <Badge variant="secondary" className="w-full justify-center py-2">
          Esta predicción se actualiza automáticamente con cada nuevo traslado
        </Badge>
      </div>
    </Card>
  );
}
