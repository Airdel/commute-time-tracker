import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge
import { SignIn, SignOut, GitBranch, CheckCirc
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
              onClic
              <SignIn size={20} 
            </Button>
        </div>
    );

    <Card className="p-4 border-accent/
        <Avatar class
          <Avata
        <div c
            <
      
   

          
          <div className="flex items-start gap-2 p-2 bg
            <p className="text-xs text-muted-f
            </p>
        </div>
    </Card>
}























