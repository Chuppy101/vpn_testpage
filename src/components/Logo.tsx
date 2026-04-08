import { cn } from '../utils/cn';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('logo', compact && 'logo--compact')} aria-label="HiroVPN logo">
      <span className="logo__hiro">Hiro</span>
      <span className="logo__vpn">vpn</span>
    </div>
  );
}
