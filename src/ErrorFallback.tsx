import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";


import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  // When encountering an error in the development mode, rethrow it and don't display the boundary.
  // The parent UI will take care of showing a more helpful dialog.
  if (import.meta.env.DEV) throw error;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <AlertTitle>This spark has en
            Something unexpected happened while runnin
        </Alert>
        <div className="bg-card border rounded-lg p-4 mb-6">
          <pre className="te
          </pre>
        
          onClic
        
          <RefreshCwIcon />
        </Button>
    </div>
}















