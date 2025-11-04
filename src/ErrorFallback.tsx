import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { Warning, ArrowClockwise } from "@phosphor-icons/react";

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  if (import.meta.env.DEV) throw error;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <Warning className="h-4 w-4" />
          <AlertTitle>Error en la aplicación</AlertTitle>
          <AlertDescription>
            Algo inesperado ocurrió mientras se ejecutaba la aplicación.
          </AlertDescription>
        </Alert>
        
        <div className="bg-card border rounded-lg p-4">
          <pre className="text-xs text-muted-foreground overflow-auto whitespace-pre-wrap break-words">
            {error.message}
          </pre>
        </div>
        
        <Button onClick={resetErrorBoundary} className="w-full">
          <ArrowClockwise className="mr-2 h-4 w-4" />
          Reintentar
        </Button>
      </div>
    </div>
  );
};
