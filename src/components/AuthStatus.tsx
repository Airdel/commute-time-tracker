import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SignIn, SignOut, GitBranch, CheckCircle, Warning } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface UserInfo {
  avatarUrl: string;
  email: string;
  id: number;
  isOwner: boolean;
  login: string;
}

export function AuthStatus() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4 border-muted">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-32 animate-pulse" />
            <div className="h-3 bg-muted rounded w-48 animate-pulse" />
          </div>
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="p-4 border-destructive/50 bg-destructive/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
            <Warning size={24} weight="bold" className="text-destructive" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-destructive">Sin sesión activa</h3>
              <Badge variant="destructive" className="text-xs">Desconectado</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Para sincronizar tus datos entre dispositivos, necesitas iniciar sesión con tu cuenta de GitHub.
            </p>
            <Button 
              variant="default" 
              className="gap-2 w-full sm:w-auto"
              onClick={() => toast.info('Función de inicio de sesión en desarrollo')}
            >
              <SignIn size={20} weight="bold" />
              Iniciar sesión con GitHub
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-accent/50 bg-accent/5">
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10 border-2 border-accent/30">
          <AvatarImage src={user.avatarUrl} alt={user.login} />
          <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold truncate">{user.login}</h3>
            <Badge variant="secondary" className="text-xs gap-1">
              <CheckCircle size={12} weight="fill" />
              Conectado
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <GitBranch size={14} />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-start gap-2 p-2 bg-background/50 rounded-lg">
            <CheckCircle size={16} weight="bold" className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Tu cuenta está sincronizada. Todos tus datos están respaldados y disponibles en todos tus dispositivos.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
