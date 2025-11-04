import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CloudCheck, CloudSlash, CloudArrowUp } from '@phosphor-icons/react';

interface UserInfo {
  login: string;
  email: string;
  avatarUrl: string;
  id: number;
  isOwner: boolean;
}

export function SyncIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userInfo = await window.spark.user();
      setUser(userInfo);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (user) {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 2000);
      }
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
  }, [user]);

  if (!authChecked) {
    return null;
  }

  if (!user) {
    return null;
  }

  if (!isOnline) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="gap-1.5 border-destructive/50 text-destructive cursor-help">
            <CloudSlash size={14} weight="fill" />
            <span className="text-xs">Sin conexión</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Los datos se guardan localmente y se sincronizarán cuando recuperes conexión</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (isSyncing) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="gap-1.5 border-primary/50 text-primary cursor-help">
            <CloudArrowUp size={14} weight="fill" className="animate-pulse" />
            <span className="text-xs">Sincronizando...</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Tus datos se están sincronizando con la nube</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline" className="gap-1.5 border-accent/50 text-accent cursor-help">
          <CloudCheck size={14} weight="fill" />
          <span className="text-xs hidden sm:inline">Sincronizado</span>
          <span className="text-xs sm:hidden">{user.login}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">Conectado como {user.login} • Todos tus datos están sincronizados</p>
      </TooltipContent>
    </Tooltip>
  );
}
