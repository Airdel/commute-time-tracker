import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback
import { GitBranch, CheckCircle, Warning } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { SignIn, SignOut, GitBranch, CheckCircle, Warning } from '@phosphor-icons/react';

interface UserInfo {
  id: number;
}
export function 
  const [load

 

    try {
      setError(null);
      setUser(userInfo);
      setUser(null);

    }

    retur

          <div className="flex-1"
         
        </div>
    );

    return (
        <div classN
            <Warning
      setError('No se pudo verificar la autenticación');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    toast.info('Para iniciar sesión, accede a esta aplicación desde tu cuenta de GitHub Spark.');
  };

  const handleLogout = () => {
    toast.info('Para cerrar sesión, hazlo desde tu panel de GitHub Spark.');
  };

  if (loading) {
    return (
      <Card className="p-4 border border-border">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 bg-muted rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded mb-2 w-32" />
            <div className="h-3 bg-muted rounded w-48" />
          </div>
        </div>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card className="p-4 border border-border">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Warning size={20} weight="fill" className="text-destructive" />
            <Badge variant="destructive" className="text-xs">
              No autenticado
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Inicia sesión con tu cuenta de GitHub para sincronizar tus datos entre dispositivos y mantener un respaldo seguro en la nube.
          </p>
          <div className="flex gap-2">
            <Button onClick={handleLogin} variant="default" size="sm" className="gap-2 flex-1">
              <SignIn size={20} weight="bold" />
              Iniciar sesión con GitHub
            </Button>
            <Button onClick={checkAuth} variant="outline" size="sm" className="gap-2">
              Reintentar
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border border-border">
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.avatarUrl} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-sm truncate">{user.login}</p>
            <Badge variant="secondary" className="text-xs gap-1">
              <CheckCircle size={14} weight="bold" />
              Conectado
            </Badge>
            {user.isOwner && (
              <Badge variant="outline" className="text-xs gap-1">
                <GitBranch size={14} weight="bold" />
                Propietario
              </Badge>
            )}
          </div>
          <div className="flex items-start gap-2 mb-2">
            <CheckCircle size={16} weight="fill" className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Tus datos se sincronizan automáticamente con tu cuenta de GitHub. Puedes acceder desde cualquier dispositivo.
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2 w-full">
            <SignOut size={16} weight="bold" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </Card>
  );
}
            <Badge variant="secondary" className="text-xs">
              No autenticado
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Esta aplicación utiliza tu cuenta de GitHub para sincronizar tus datos automáticamente entre dispositivos.
          </p>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-semibold mb-2">Para usar la app con sincronización:</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Accede a través de GitHub Spark</li>
              <li>La autenticación se realiza automáticamente</li>
              <li>Tus datos se sincronizarán en todos tus dispositivos</li>
            </ol>
          </div>
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm text-foreground">
              <strong>💡 Modo local:</strong> Puedes usar la app sin autenticarte, pero tus datos solo se guardarán en este dispositivo.
            </p>
          </div>
          <Button onClick={checkAuth} variant="outline" size="sm" className="gap-2">
            Verificar autenticación
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border border-border">
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.avatarUrl} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-sm truncate">{user.login}</p>
            <Badge variant="secondary" className="text-xs gap-1">
              <CheckCircle size={14} weight="bold" />
              Conectado
            </Badge>
            {user.isOwner && (
              <Badge variant="outline" className="text-xs gap-1">
                <GitBranch size={14} weight="bold" />
                Propietario
              </Badge>
            )}
          </div>
          <div className="flex items-start gap-2 mb-3">
            <CheckCircle size={16} weight="fill" className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Tus datos se sincronizan automáticamente con tu cuenta de GitHub. Puedes acceder desde cualquier dispositivo.
            </p>
          </div>
          <p className="text-xs text-muted-foreground italic mb-2">
            Para cerrar sesión, hazlo desde tu panel de GitHub Spark.
          </p>
        </div>
      </div>
    </Card>
  );
}
