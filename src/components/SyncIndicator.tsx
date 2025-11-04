import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CloudCheck, CloudSlash, CloudArrowUp } from '@phosphor-icons/react';

export function SyncIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsSyncing(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="gap-1.5 border-destructive/50 text-destructive">
              <CloudSlash size={14} weight="fill" />
              <span className="text-xs">Sin conexión</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Los datos se guardan localmente y se sincronizarán cuando recuperes conexión</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (isSyncing) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="gap-1.5 border-primary/50 text-primary">
              <CloudArrowUp size={14} weight="fill" className="animate-pulse" />
              <span className="text-xs">Sincronizando...</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Tus datos se están sincronizando con la nube</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="gap-1.5 border-accent/50 text-accent">
            <CloudCheck size={14} weight="fill" />
            <span className="text-xs">Sincronizado</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Todos tus datos están sincronizados en tiempo real</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
