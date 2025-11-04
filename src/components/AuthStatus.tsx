import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SignIn, SignOut, GitBranch, CheckCircle, Warning } from '@phosphor-icons/react';

}
export function Auth
  const [loading

    checkAuth();

 

export function AuthStatus() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    }
  }, []);

  const checkAuth = async () => {

      setLoading(true);
      setError(null);
      const userInfo = await window.spark.user();
      setUser(userInfo);
    } catch (err) {
      setUser(null);
      setError('No se pudo verificar la autenticación');
    } finally {
      setLoading(false);
    }
    

  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro que deseas cerrar sesión? Tus datos permanecerán seguros y se sincronizarán cuando vuelvas a iniciar sesión.')) {
      window.location.href = '/api/auth/logout';
    }
  };

  if (loading) {
    return (
      <Card className="p-4 border border-border">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 bg-muted rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded mb-2 w-32" />
            <div className="h-3 bg-muted rounded w-48" />
              Re
        </div>
        </div
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
              <B
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

    );



    <Card className="p-4 border border-border">
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.avatarUrl} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-sm truncate">{user.login}</p>

              <CheckCircle size={14} weight="bold" />

            </Badge>

              <Badge variant="outline" className="text-xs gap-1">

                Propietario
              </Badge>
            )}



            <CheckCircle size={16} weight="fill" className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Tus datos se sincronizan automáticamente con tu cuenta de GitHub. Puedes acceder desde cualquier dispositivo.
            </p>
          </div>




        </div>
      </div>
    </Card>
  );
}
