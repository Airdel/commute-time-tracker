import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { SignIn, SignOut, GitBranch, CheckCircle, Warning } from '@phosphor-icons/react';
  id: number;

export function Auth
  const [load

    setLoading(true)
      setError(n
      setUser(userI
 

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
    r
  };

  useEffect(() => {
            <div
  }, []);

  const handleLogin = () => {
    toast.info('Para iniciar sesión, accede a esta aplicación desde tu cuenta de GitHub Spark.');
  };

  const handleLogout = () => {
    toast.info('Para cerrar sesión, hazlo desde tu panel de GitHub Spark.');
  };

  if (loading) {
            
      <Card className="p-4 border border-border">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 bg-muted rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded mb-2 w-32" />
            <div className="h-3 bg-muted rounded w-48" />
          </div>
      </Card>
      </Card>

  }

  if (error || !user) {
          <A
      <Card className="p-4 border border-border">




























































