import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { CheckCircle, GitBranch } from '@phosphor-icons/react';

const HARDCODED_USER = {
  avatarUrl: 'https://avatars.githubusercontent.com/u/YOUR_USER_ID',
  login: 'tu-usuario',
  email: 'tu-email@example.com',
  id: 'hardcoded-user-id',
  isOwner: true
};

export function AuthStatus() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={HARDCODED_USER.avatarUrl} alt={HARDCODED_USER.login} />
            <AvatarFallback>{HARDCODED_USER.login.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
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
        </div>
      </div>
    </Card>
  );
}
