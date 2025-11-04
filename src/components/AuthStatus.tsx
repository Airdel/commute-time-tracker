import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SignIn, SignOut, GitBranch, CheckCircle, Warning } from '@phosphor-i

  avatarUrl: string;

interface UserInfo {
  avatarUrl: string;
  email: string;
  id: number;
  isOwner: boolean;
  login: string;
}

    checkAuth();

    try {

      setUser(null)
      setLoading
  };

      <Card className="p-4 border
         
            <div className="h-4 bg-muted rounded 
          </div>
      </Card>
  }
  const handleL
  };
  if 
    

          </div>
            
              <Badge variant="destructive
            <p className="text-sm text-muted-fore
            </p>
              <Button onClick={handleLogin} 
                Iniciar sesión con GitHub
              <Button onClick={checkAuth} variant="outline" size="sm" c
              </
          </di
      </Card>
  }
  c

  };
  return (
    

        </Avat
          <d
            <Badge variant="secondary" className="text-xs gap-1">
              Conectado
            {user.isOwner && (
                <GitBranch size={14} weight="bold" />
              </
          </div>
          <div className="flex items-start gap-2 p-2 bg-mu
            <p className="text-xs text-muted-foreground">
            </p>
          <Button 
            Cerrar sesión
        </div>
    </Card>
}














  const handleLogout = () => {
    if (confirm('¿Estás seguro que deseas cerrar sesión? Tus datos permanecerán seguros y se sincronizarán cuando vuelvas a iniciar sesión.')) {
      window.location.href = '/api/auth/logout';
    }
  };






















          <p className="text-sm text-muted-foreground truncate mb-3">{user.email}</p>
          <div className="flex items-start gap-2 p-2 bg-muted/50 rounded-md mb-3">





          <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2 w-full">
            <SignOut size={20} weight="bold" />
            Cerrar sesión
          </Button>




