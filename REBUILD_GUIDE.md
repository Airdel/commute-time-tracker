# Complete Rebuild Guide - Work Commute Tracker PWA

## Application Overview

A Spanish-language progressive web application for tracking work commute times in Tepic, Nayarit. Users can track commutes via bus (Jasminez route) or personal motorbike, with AI-powered predictions for optimal departure times based on historical data.

**Key Features:**
- ⏱️ Real-time commute timer with automatic tracking
- 📊 Statistics and analytics by transport method
- 🤖 AI-powered departure time predictions (using Spark's LLM API)
- 🔄 Automatic cross-device sync (via Spark's useKV)
- 📱 PWA with offline support and mobile installation
- 🌐 Fully responsive design for web and mobile

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui v4
- **Icons:** Phosphor Icons React
- **State/Persistence:** Spark useKV (automatic cloud sync)
- **AI:** Spark LLM API (gpt-4o-mini for predictions)
- **Animations:** Framer Motion
- **Notifications:** Sonner
- **PWA:** Vite PWA Plugin

## Installation Requirements

### 1. Install PWA Dependencies

```bash
npm install vite-plugin-pwa workbox-window
```

### 2. Project Structure

```
src/
├── App.tsx                          # Main app with tab navigation
├── index.css                        # Theme and global styles
├── components/
│   ├── LoggerTab.tsx               # Timer and manual entry
│   ├── HistoryTab.tsx              # Commute history list
│   ├── StatsTab.tsx                # Analytics and charts
│   ├── SettingsTab.tsx             # Routes, types, prediction config
│   ├── PredictionCard.tsx          # AI prediction display
│   ├── AuthStatus.tsx              # GitHub auth status
│   ├── SyncIndicator.tsx           # Sync status indicator
│   ├── ThemeToggle.tsx             # Dark/light mode toggle
│   ├── InstallPrompt.tsx           # PWA install prompt (NEW)
│   ├── UpdatePrompt.tsx            # PWA update prompt (NEW)
│   └── ui/                         # shadcn components (pre-installed)
├── lib/
│   ├── time-utils.ts               # Time formatting utilities
│   └── utils.ts                    # cn() helper
├── types/
│   └── commute.ts                  # TypeScript interfaces
└── assets/                          # PWA icons and images (NEW)
    └── icons/
        ├── icon-72x72.png
        ├── icon-96x96.png
        ├── icon-128x128.png
        ├── icon-144x144.png
        ├── icon-152x152.png
        ├── icon-192x192.png
        ├── icon-384x384.png
        └── icon-512x512.png
```

## Step-by-Step Implementation

### Phase 1: Core Application Setup

#### 1.1 TypeScript Types (`src/types/commute.ts`)

```typescript
export type TransportMethod = 'bus' | 'motorbike';

export interface Route {
  id: string;
  name: string;
  color: string;
  isDefault?: boolean;
  transportMethod: TransportMethod;
}

export interface CommuteType {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Commute {
  id: string;
  type: string;
  routeId?: string;
  transportMethod: TransportMethod;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  notes?: string;
  date: string;
  targetArrivalTime?: string;
}

export interface TimerState {
  isActive: boolean;
  type: string | null;
  routeId?: string | null;
  transportMethod?: TransportMethod | null;
  startTime: string | null;
  targetArrivalTime?: string | null;
}

export interface PredictionSettings {
  workStartTime: string;
  bufferMinutes: number;
  daysToAnalyze: number;
}

export interface AIPrediction {
  suggestedDepartureTime: string;
  conservativeDepartureTime: string;
  confidence: number;
  reasoning: string;
  avgDuration: number;
  p75Duration: number;
}
```

#### 1.2 Time Utilities (`src/lib/time-utils.ts`)

```typescript
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} min`;
}

export function calculateDuration(departure: string, arrival: string): number {
  const departureDate = new Date(departure);
  const arrivalDate = new Date(arrival);
  const diffMs = arrivalDate.getTime() - departureDate.getTime();
  return diffMs / 1000 / 60;
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-MX', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Hoy';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Ayer';
  }
  
  return date.toLocaleDateString('es-MX', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  });
}
```

#### 1.3 Theme Configuration (`src/index.css`)

```css
@import 'tailwindcss';
@import "tw-animate-css";

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    font-family: 'Inter', sans-serif;
  }
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.25 0.1 250);
  
  --card: oklch(0.96 0.005 250);
  --card-foreground: oklch(0.25 0.1 250);
  
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.25 0.1 250);
  
  --primary: oklch(0.45 0.15 250);
  --primary-foreground: oklch(1 0 0);
  
  --secondary: oklch(0.92 0.03 250);
  --secondary-foreground: oklch(0.25 0.1 250);
  
  --muted: oklch(0.88 0.01 250);
  --muted-foreground: oklch(0.45 0.01 250);
  
  --accent: oklch(0.75 0.15 75);
  --accent-foreground: oklch(0.25 0.1 250);
  
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(1 0 0);
  
  --border: oklch(0.88 0.01 250);
  --input: oklch(0.88 0.01 250);
  --ring: oklch(0.45 0.15 250);
  
  --radius: 0.75rem;
}

.dark {
  --background: oklch(0.15 0.02 250);
  --foreground: oklch(0.95 0.01 250);
  
  --card: oklch(0.20 0.02 250);
  --card-foreground: oklch(0.95 0.01 250);
  
  --popover: oklch(0.18 0.02 250);
  --popover-foreground: oklch(0.95 0.01 250);
  
  --primary: oklch(0.60 0.18 250);
  --primary-foreground: oklch(0.98 0 0);
  
  --secondary: oklch(0.25 0.02 250);
  --secondary-foreground: oklch(0.95 0.01 250);
  
  --muted: oklch(0.25 0.02 250);
  --muted-foreground: oklch(0.60 0.01 250);
  
  --accent: oklch(0.70 0.15 75);
  --accent-foreground: oklch(0.15 0.02 250);
  
  --destructive: oklch(0.60 0.22 25);
  --destructive-foreground: oklch(0.98 0 0);
  
  --border: oklch(0.30 0.02 250);
  --input: oklch(0.30 0.02 250);
  --ring: oklch(0.60 0.18 250);
}

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  
  --radius-sm: calc(var(--radius) * 0.5);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) * 1.5);
  --radius-xl: calc(var(--radius) * 2);
  --radius-2xl: calc(var(--radius) * 3);
  --radius-full: 9999px;
}

.timer-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
```

### Phase 2: PWA Configuration

#### 2.1 Vite PWA Configuration (`vite.config.ts`)

Modify the existing vite.config.ts to include PWA plugin:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Registro de Traslados - Jasminez',
        short_name: 'Traslados',
        description: 'Aplicación para registrar y analizar tiempos de traslado en Tepic, Nayarit',
        theme_color: '#5a7cba',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

#### 2.2 PWA Components

**InstallPrompt Component (`src/components/InstallPrompt.tsx`):**

```typescript
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, X } from '@phosphor-icons/react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 p-4 shadow-lg z-50 bg-card border-accent/50">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
          <Download size={20} weight="bold" className="text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold mb-1">Instalar aplicación</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Instala la app en tu dispositivo para acceso rápido y uso sin conexión
          </p>
          <div className="flex gap-2">
            <Button onClick={handleInstall} size="sm" className="flex-1">
              Instalar
            </Button>
            <Button onClick={handleDismiss} size="sm" variant="ghost">
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

**UpdatePrompt Component (`src/components/UpdatePrompt.tsx`):**

```typescript
import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CloudArrowUp } from '@phosphor-icons/react';

export function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.error('SW registration error:', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setShowPrompt(true);
    }
  }, [needRefresh]);

  const handleUpdate = () => {
    updateServiceWorker(true);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <Card className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-96 p-4 shadow-lg z-50 bg-card border-primary/50">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <CloudArrowUp size={20} weight="bold" className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold mb-1">Actualización disponible</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Hay una nueva versión de la aplicación disponible
          </p>
          <Button onClick={handleUpdate} size="sm" className="w-full">
            Actualizar ahora
          </Button>
        </div>
      </div>
    </Card>
  );
}
```

**SyncIndicator Component (`src/components/SyncIndicator.tsx`):**

```typescript
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { CloudCheck, CloudSlash, CloudArrowUp } from '@phosphor-icons/react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function SyncIndicator() {
  const [online, setOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge 
          variant={online ? 'secondary' : 'outline'} 
          className="gap-1.5 cursor-help"
        >
          {syncing ? (
            <>
              <CloudArrowUp size={14} weight="bold" className="animate-pulse" />
              <span className="hidden sm:inline">Sincronizando...</span>
            </>
          ) : online ? (
            <>
              <CloudCheck size={14} weight="bold" />
              <span className="hidden sm:inline">En línea</span>
            </>
          ) : (
            <>
              <CloudSlash size={14} weight="bold" />
              <span className="hidden sm:inline">Sin conexión</span>
            </>
          )}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {online 
            ? 'Datos sincronizados en la nube' 
            : 'Trabajando sin conexión. Los datos se sincronizarán al reconectar.'}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
```

### Phase 3: AI-Powered Predictions

#### 3.1 Enhanced PredictionCard with AI (`src/components/PredictionCard.tsx`)

```typescript
import { useState, useEffect } from 'react';
import { Commute, PredictionSettings, TransportMethod, AIPrediction } from '@/types/commute';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, TrendUp, Calendar, Lightbulb, Bus, Motorcycle, Sparkle } from '@phosphor-icons/react';
import { Skeleton } from '@/components/ui/skeleton';

interface PredictionCardProps {
  commutes: Commute[];
  predictionSettings: PredictionSettings;
  commuteType: string;
  transportMethod?: TransportMethod;
}

export function PredictionCard({ commutes, predictionSettings, commuteType }: PredictionCardProps) {
  const [aiPredictions, setAiPredictions] = useState<{
    bus?: AIPrediction;
    motorbike?: AIPrediction;
  }>({});
  const [loading, setLoading] = useState(false);

  const calculateBasicPrediction = (method: TransportMethod) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - predictionSettings.daysToAnalyze);

    const relevantCommutes = commutes.filter((c) => {
      const commuteDate = new Date(c.date);
      return c.type === commuteType && 
             commuteDate >= cutoffDate && 
             c.transportMethod === method;
    });

    if (relevantCommutes.length < 3) return null;

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
      transportMethod: method,
    };
  };

  const generateAIPrediction = async (method: TransportMethod) => {
    const basicPred = calculateBasicPrediction(method);
    if (!basicPred) return null;

    try {
      const relevantCommutes = commutes
        .filter(c => c.type === commuteType && c.transportMethod === method)
        .slice(0, 20);

      const commuteData = relevantCommutes.map(c => ({
        date: new Date(c.date).toLocaleDateString('es-MX', { weekday: 'short' }),
        duration: c.duration,
        departureTime: new Date(c.departureTime).getHours()
      }));

      const prompt = spark.llmPrompt`Eres un asistente experto en análisis de patrones de transporte urbano en México.

Analiza estos datos de traslados recientes en ${method === 'bus' ? 'camión/autobús' : 'motoneta personal'} en Tepic, Nayarit:

Datos históricos: ${JSON.stringify(commuteData)}
Duración promedio: ${basicPred.avgDuration} minutos
Percentil 75: ${basicPred.p75Duration} minutos
Hora objetivo de llegada: ${predictionSettings.workStartTime}
Margen deseado: ${predictionSettings.bufferMinutes} minutos antes

Basándote en estos datos, genera una predicción detallada. Debes considerar:
1. Patrones por día de la semana
2. Variabilidad del tráfico en ${method === 'bus' ? 'transporte público' : 'vehículo personal'}
3. Factores de riesgo (clima, hora pico, eventos)
4. Nivel de confianza de la predicción

Responde SOLO en formato JSON válido con esta estructura exacta:
{
  "suggestedDepartureTime": "HH:MM AM/PM",
  "conservativeDepartureTime": "HH:MM AM/PM",
  "confidence": 85,
  "reasoning": "Explicación breve en español de por qué esta es la mejor hora de salida",
  "avgDuration": ${basicPred.avgDuration},
  "p75Duration": ${basicPred.p75Duration}
}`;

      const response = await spark.llm(prompt, 'gpt-4o-mini', true);
      const aiData = JSON.parse(response);

      return {
        ...aiData,
        transportMethod: method,
        sampleSize: relevantCommutes.length,
      } as AIPrediction;
    } catch (error) {
      console.error('Error generating AI prediction:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadPredictions = async () => {
      setLoading(true);
      
      const busPred = await generateAIPrediction('bus');
      const motorbikePred = await generateAIPrediction('motorbike');
      
      setAiPredictions({
        bus: busPred || undefined,
        motorbike: motorbikePred || undefined,
      });
      
      setLoading(false);
    };

    if (commutes.length >= 3) {
      loadPredictions();
    }
  }, [commutes.length, commuteType, predictionSettings.workStartTime]);

  const busPrediction = calculateBasicPrediction('bus');
  const motorbikePrediction = calculateBasicPrediction('motorbike');
  const anyPrediction = busPrediction || motorbikePrediction;

  if (!anyPrediction) {
    return (
      <Card className="p-6 border-dashed">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Lightbulb size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Predicción no disponible</h3>
            <p className="text-sm text-muted-foreground">
              Registra al menos 3 traslados de este tipo para ver predicciones de salida con IA.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const PredictionSection = ({ 
    prediction, 
    aiPrediction 
  }: { 
    prediction: NonNullable<ReturnType<typeof calculateBasicPrediction>>,
    aiPrediction?: AIPrediction 
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        {prediction.transportMethod === 'motorbike' ? (
          <Motorcycle size={20} weight="bold" className="text-foreground" />
        ) : (
          <Bus size={20} weight="bold" className="text-foreground" />
        )}
        <h4 className="font-semibold">
          {prediction.transportMethod === 'motorbike' ? 'En Motoneta' : 'En Camión'}
        </h4>
        <Badge variant="secondary" className="text-xs">
          {prediction.sampleSize} viajes
        </Badge>
        {aiPrediction && (
          <Badge variant="default" className="text-xs gap-1">
            <Sparkle size={12} weight="fill" />
            IA
          </Badge>
        )}
      </div>

      {loading && !aiPrediction ? (
        <div className="space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : aiPrediction ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background/80 rounded-lg p-4 border-2 border-accent/50">
              <div className="flex items-center gap-2 mb-2">
                <Sparkle size={16} weight="fill" className="text-accent" />
                <span className="text-sm font-medium text-muted-foreground">Recomendación IA</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {aiPrediction.suggestedDepartureTime}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {aiPrediction.confidence}% confianza
                </Badge>
              </div>
            </div>

            <div className="bg-background/80 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendUp size={16} weight="bold" className="text-orange-600" />
                <span className="text-sm font-medium text-muted-foreground">Salida conservadora</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {aiPrediction.conservativeDepartureTime}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Margen extra de seguridad</p>
            </div>
          </div>

          <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
            <div className="flex items-start gap-2">
              <Lightbulb size={16} weight="fill" className="text-accent mt-0.5" />
              <div className="text-sm text-foreground">
                <strong>Análisis IA:</strong> {aiPrediction.reasoning}
              </div>
            </div>
          </div>

          <div className="bg-background/50 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Calendar size={16} weight="bold" className="text-muted-foreground mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <p><strong>Promedio:</strong> {aiPrediction.avgDuration} min</p>
                <p><strong>75% de viajes:</strong> ≤ {aiPrediction.p75Duration} min</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background/80 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} weight="bold" className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Hora recomendada</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {prediction.suggestedDeparture.toLocaleTimeString('es-MX', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </div>
          </div>

          <div className="bg-background/80 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendUp size={16} weight="bold" className="text-orange-600" />
              <span className="text-sm font-medium text-muted-foreground">Salida conservadora</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {prediction.conservativeDeparture.toLocaleTimeString('es-MX', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <Sparkle size={20} weight="fill" className="text-accent-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">Sugerencias Inteligentes</h3>
          <p className="text-sm text-muted-foreground">
            Predicciones potenciadas por IA basadas en tu historial
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {busPrediction && (
          <PredictionSection 
            prediction={busPrediction} 
            aiPrediction={aiPredictions.bus}
          />
        )}
        
        {busPrediction && motorbikePrediction && (
          <div className="border-t border-border/50 my-4" />
        )}
        
        {motorbikePrediction && (
          <PredictionSection 
            prediction={motorbikePrediction}
            aiPrediction={aiPredictions.motorbike}
          />
        )}

        <Badge variant="secondary" className="w-full justify-center py-2 mt-4">
          Las predicciones se actualizan automáticamente con cada nuevo traslado
        </Badge>
      </div>
    </Card>
  );
}
```

### Phase 4: Main App Component

#### 4.1 App.tsx Structure

```typescript
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
import { InstallPrompt } from '@/components/InstallPrompt';
import { UpdatePrompt } from '@/components/UpdatePrompt';
import { Bus } from '@phosphor-icons/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

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
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Toaster />
        <InstallPrompt />
        <UpdatePrompt />
        
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
    </TooltipProvider>
  );
}

export default App;
```

### Phase 5: HTML Configuration

#### 5.1 index.html with PWA Meta Tags

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registro de Traslados - Jasminez</title>
    
    <!-- PWA Meta Tags -->
    <meta name="description" content="Aplicación para registrar y analizar tiempos de traslado en Tepic, Nayarit">
    <meta name="theme-color" content="#5a7cba">
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <link href="/src/main.css" rel="stylesheet" />
</head>

<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>

</html>
```

## Key Features Implementation Summary

### 1. **Real-Time Sync (Built-in with Spark useKV)**
- All data automatically syncs across devices
- Works with GitHub authentication
- Offline-first with automatic reconciliation

### 2. **AI-Powered Predictions**
- Uses Spark's `spark.llm()` API with gpt-4o-mini
- Analyzes historical commute patterns
- Provides confidence scores and reasoning
- Differentiates between bus and motorbike predictions

### 3. **PWA Features**
- Install prompt for mobile/desktop
- Offline functionality
- Update notifications
- Service worker for caching

### 4. **Core Tracking Features**
- Real-time timer with persistence
- Manual entry with datetime pickers
- Route and transport method management
- Customizable commute types

### 5. **Analytics**
- Statistics by transport method, route, and type
- Visual charts using simple bar graphs
- Trend analysis over time
- Filterable views

## Testing Checklist

- [ ] Timer starts and persists across page refresh
- [ ] AI predictions generate correctly for both transport methods
- [ ] PWA installs on mobile devices (Android/iOS)
- [ ] Works offline (create commute while offline, syncs when online)
- [ ] Dark mode toggles and persists
- [ ] Data syncs across multiple devices
- [ ] Export/import backup works correctly
- [ ] Statistics calculate correctly with filters
- [ ] Service worker updates prompt appears

## Common Issues & Solutions

### Issue: PWA not installing
**Solution:** Ensure HTTPS is enabled and manifest.webmanifest is accessible

### Issue: AI predictions not generating
**Solution:** Check that at least 3 commutes exist for the transport method

### Issue: Timer doesn't persist
**Solution:** Verify useKV is working correctly with 'timer-state' key

### Issue: Sync not working
**Solution:** Ensure user is authenticated with GitHub

## Deployment Notes

1. Build the app: `npm run build`
2. Deploy to hosting (Vercel, Netlify, etc.)
3. Ensure HTTPS is configured
4. Test PWA installation on mobile devices
5. Verify service worker registration

## Final Recommendations

- **Mobile First:** Test extensively on actual mobile devices
- **Offline Testing:** Disconnect network and verify functionality
- **AI Rate Limits:** Consider caching AI predictions for 24 hours to avoid excessive API calls
- **Performance:** Monitor bundle size and lazy-load components if needed
- **Accessibility:** Ensure all interactive elements are keyboard accessible

---

**Version:** 1.0  
**Last Updated:** 2024  
**Platform:** Spark React Template  
**Target:** Mobile PWA + Web Application
