'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, KeyRound, Mail } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { useDemoAuth } from '@/hooks/use-demo-auth';
import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

export function FakeLoginPanel({ language }: { language: Language }) {
  const router = useRouter();
  const { isDemoAuthenticated, setDemoAuthenticated } = useDemoAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isDemoAuthenticated) {
    return (
      <Card className="space-y-6 !border-white/10 !bg-[linear-gradient(180deg,rgba(16,24,31,0.96)_0%,rgba(12,20,26,0.98)_100%)] !text-white shadow-[0_28px_70px_rgba(7,17,24,0.28)]">
        <Badge variant="teal" className="border-teal-500/20 bg-teal-500/14 text-teal-50">
          {t(language, 'Sesion demo activa', 'Demo session active')}
        </Badge>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {t(language, 'Ya puedes entrar al admin interno.', 'You can already enter the internal admin.')}
          </h1>
          <p className="text-sm leading-7 text-white/70">
            {t(
              language,
              'Tu sesion demo sigue activa en este navegador. Puedes continuar al dashboard o reiniciar el acceso para volver a ver la pantalla de login.',
              'Your demo session is still active in this browser. You can continue to the dashboard or reset access to see the login screen again.',
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className={buttonClassName('primary')}
          >
            {t(language, 'Continuar al dashboard', 'Continue to dashboard')}
          </button>
          <button
            type="button"
            onClick={() => {
              setDemoAuthenticated(false);
              setEmail('');
              setPassword('');
            }}
            className={buttonClassName('secondary', 'border-white/10 bg-white/8 text-white hover:border-white/18 hover:bg-white/10 hover:text-white')}
          >
            {t(language, 'Reiniciar acceso demo', 'Reset demo access')}
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-6 !border-white/10 !bg-[linear-gradient(180deg,rgba(16,24,31,0.96)_0%,rgba(12,20,26,0.98)_100%)] !text-white shadow-[0_28px_70px_rgba(7,17,24,0.28)]">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="coral" className="border-coral-400/20 bg-coral-400/14 text-sand-50">
          {t(language, 'Solo didactico', 'Teaching only')}
        </Badge>
        <Badge variant="muted" className="border-white/10 bg-white/8 text-white/78">
          {t(language, 'Login sin credenciales reales', 'Login with no real credentials')}
        </Badge>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          {t(language, 'Acceso al panel admin', 'Admin panel access')}
        </h1>
        <p className="text-sm leading-7 text-white/70">
          {t(
            language,
            'Esta pantalla simula un login normal de admin. Puedes escribir algo si quieres, pero para esta demo tambien puedes entrar sin credenciales y pasar directo al dashboard interno.',
            'This screen simulates a normal admin login. You can type something if you want, but for this demo you can also enter without credentials and go straight into the internal dashboard.',
          )}
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setDemoAuthenticated(true);
          router.push('/admin/dashboard');
        }}
      >
        <label className="space-y-2">
          <span className="text-sm font-semibold text-white">{t(language, 'Correo o usuario', 'Email or username')}</span>
          <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/6 px-4 py-3">
            <Mail className="size-4 text-white/45" />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t(language, 'Puedes dejarlo vacio en esta demo', 'You can leave this blank in this demo')}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/28"
            />
          </div>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-white">{t(language, 'Clave', 'Password')}</span>
          <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/6 px-4 py-3">
            <KeyRound className="size-4 text-white/45" />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t(language, 'Tambien puede ir vacio', 'This can also stay empty')}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/28"
            />
          </div>
        </label>

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" className={buttonClassName('primary')}>
            {t(language, 'Entrar al admin', 'Enter admin')}
            <ArrowRight className="ml-2 size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setEmail('');
              setPassword('');
            }}
            className={buttonClassName('secondary', 'border-white/10 bg-white/8 text-white hover:border-white/18 hover:bg-white/10 hover:text-white')}
          >
            {t(language, 'Limpiar campos', 'Clear fields')}
          </button>
        </div>
      </form>

      <div className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/68">
        <span className="font-semibold text-white">{t(language, 'Importante:', 'Important:')}</span>{' '}
        {t(
          language,
          'esto solo marca una sesion demo en local storage. La seguridad real seguiria viviendo en el backend.',
          'this only marks a demo session in local storage. Real security would still live in the backend.',
        )}
      </div>
    </Card>
  );
}
