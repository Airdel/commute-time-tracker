import { useKV } from '@github/spark/hooks';
import { useState } from 'react';
import { Commute, TimerState, Route, CommuteType } from '@/types/commute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoggerTab } from '@/components/LoggerTab';
import { HistoryTab } from '@/components/HistoryTab';
import { StatsTab } from '@/components/StatsTab';
import { SettingsTab } from '@/components/SettingsTab';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SyncIndicator } from '@/components/SyncIndicator';
import { Bus } from '@phosphor-icons/react';
import { Toaster } from '@/components/ui/sonner';

const DEFAULT_ROUTES: Route[] = [
  { id: 'jasminez', name: 'Jasminez', color: 'oklch(0.45 0.15 250)', isDefault: true, transportMethod: 'bus' },
  { id: 'motorbike', name: 'Motoneta Personal', color: 'oklch(0.55 0.22 25)', transportMethod: 'motorbike' },
];

const DEFAULT_TYPES: CommuteType[] = [
  { id: 'to-work', name: 'Hacia el trabajo', icon: 'arrow-right', description: 'Traslado matutino al trabajo' },
  { id: 'from-work', name: 'Desde el trabajo', icon: 'arrow-left', description: 'Traslado vespertino a casa' },
];

function App() {
  const [commutes, setCommutes] = useKV<Commute[]>('commutes', []);
  const [routes] = useKV<Route[]>('routes', DEFAULT_ROUTES);
  const [commuteTypes] = useKV<CommuteType[]>('commute-types', DEFAULT_TYPES);
  const [timerState, setTimerState] = useKV<TimerState>('timer-state', {
    isActive: false,
    type: null,
    startTime: null,
  });
  const [activeTab, setActiveTab] = useState('logger');

  const addCommute = (commute: Commute) => {
    setCommutes((current) => [commute, ...(current || [])]);
  };

  const updateCommute = (id: string, updates: Partial<Commute>) => {
    setCommutes((current) =>
      (current || []).map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCommute = (id: string) => {
    setCommutes((current) => (current || []).filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 md:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Bus size={24} weight="bold" className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Registro de Traslados
                </h1>
                <p className="text-sm text-muted-foreground">Ruta Jasminez • Tepic, Nayarit</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SyncIndicator />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:px-6 md:py-8 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="logger">Registro</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="settings">Ajustes</TabsTrigger>
          </TabsList>

          <TabsContent value="logger" className="mt-0">
            <LoggerTab
              timerState={timerState || { isActive: false, type: null, startTime: null }}
              setTimerState={setTimerState}
              onAddCommute={addCommute}
              routes={routes || DEFAULT_ROUTES}
              commuteTypes={commuteTypes || DEFAULT_TYPES}
              commutes={commutes || []}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <HistoryTab
              commutes={commutes || []}
              onUpdateCommute={updateCommute}
              onDeleteCommute={deleteCommute}
              routes={routes || DEFAULT_ROUTES}
              commuteTypes={commuteTypes || DEFAULT_TYPES}
            />
          </TabsContent>

          <TabsContent value="stats" className="mt-0">
            <StatsTab 
              commutes={commutes || []} 
              commuteTypes={commuteTypes || DEFAULT_TYPES}
              routes={routes || DEFAULT_ROUTES}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
