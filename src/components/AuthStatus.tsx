import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { GitBranch, CheckCircle } from '@phosphor-icons/react';
import { HARDCODED_USER } from '@/lib/user-config';

export function AuthStatus() {
  return (
    <Card className="p-4 border border-accent/50 bg-accent/5">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 border-2 border-primary">
          <AvatarImage src={HARDCODED_USER.avatarUrl} alt={HARDCODED_USER.login} />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {HARDCODED_USER.login.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">@{HARDCODED_USER.login}</p>
            <Badge variant="secondary" className="text-xs">
              <CheckCircle size={12} weight="fill" className="mr-1" />
              Propietario
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <GitBranch size={12} weight="bold" />
            {HARDCODED_USER.email}
          </p>
        </div>
        <Badge variant="outline" className="text-xs text-accent border-accent/50">
          Activa
        </Badge>
      </div>
    </Card>
  );
}
