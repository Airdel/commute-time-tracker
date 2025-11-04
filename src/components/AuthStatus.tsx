import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { GitBranch, CheckCircle } from '@pho


      <div className="fl
          <AvatarImage src={H
            {HARDCODED_USER.logi
        </Avatar>
        
            <Bad
  

            <GitBranch size={1
          
        <Badge variant="outline" className="text-xs text-accen
        </Badge>
    </Card>
}

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



