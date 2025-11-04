import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SignIn, SignOut, GitBranch, CheckCircle, Warning } from '@phosphor-icons/react';

interface UserInfo {
  login: string;
  email: string;
  avatarUrl: string;
  id: number;
  isOwner: boolean;
}

export function AuthStatus() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    setLoading(true);
    try {
      setError(null);
      const userInfo = await spark.user();
      setUser(userInfo);
    } catch (err) {
      setUser(null);
      setError('No se pudo verificar la autenticación');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10">
            <Warning size={24} weight="fill" className="text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">No autenticado</p>
            <p className="text-xs text-muted-foreground">{error || 'Inicia sesión para continuar'}</p>
          </div>
          <Button size="sm" variant="outline" onClick={handleLogin}>
            <SignIn size={16} weight="bold" />
            Iniciar sesión
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border border-border">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 border-2 border-primary">
          <AvatarImage src={user.avatarUrl} alt={user.login} />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {user.login.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">@{user.login}</p>
            {user.isOwner && (
              <Badge variant="secondary" className="text-xs">
                <CheckCircle size={12} weight="fill" className="mr-1" />
                Propietario
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <GitBranch size={12} weight="bold" />
            {user.email || 'Sin correo disponible'}
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={handleLogout}>
          <SignOut size={16} weight="bold" />
        </Button>
      </div>
    </Card>
  );
}
