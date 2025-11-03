import { Moon, Sun } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useKV } from '@github/spark/hooks';
import { useEffect } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useKV<'light' | 'dark'>('theme', 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
    >
      {theme === 'light' ? (
        <Moon size={20} weight="fill" />
      ) : (
        <Sun size={20} weight="fill" />
      )}
    </Button>
  );
}
