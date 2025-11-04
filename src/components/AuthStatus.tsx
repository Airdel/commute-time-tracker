import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
            <Button onClick={checkAuth} variant="outline" size="sm" className="gap-2">
              <SignIn size={20} weight="bold" />
              Verificar sesión
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-accent/50 bg-accent/5">
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10 ring-2 ring-accent/20">
          <AvatarImage src={user.avatarUrl} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{user.login}</h3>
            <Badge variant="secondary" className="text-xs gap-1">
              <CheckCircle size={14} weight="fill" />
              Conectado
            </Badge>
            {user.isOwner && (
              <Badge variant="outline" className="text-xs gap-1">
                <GitBranch size={14} weight="bold" />
                Propietario
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          <div className="flex items-start gap-2 p-2 bg-muted/50 rounded-md mt-3">
            <CheckCircle size={16} weight="bold" className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Tus registros se sincronizan automáticamente con tu cuenta de GitHub.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}























