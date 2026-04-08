import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import appStoreIcon from '../assets/icons/appstore.svg';
import androidTvIcon from '../assets/icons/androidtv.svg';
import cardIcon from '../assets/icons/creditcard.svg';
import cryptoIcon from '../assets/icons/crypto.svg';
import googlePlayIcon from '../assets/icons/googleplay.svg';
import linuxIcon from '../assets/icons/linux.svg';
import macOsIcon from '../assets/icons/macos.svg';
import sberpayIcon from '../assets/icons/sberpay.svg';
import sbpIcon from '../assets/icons/sbp.svg';
import shareIcon from '../assets/icons/share.svg';
import supportIcon from '../assets/icons/support.svg';
import telegramIcon from '../assets/icons/telegram.svg';
import tpayIcon from '../assets/icons/tpay.svg';
import windowsIcon from '../assets/icons/windows.svg';
import giftIcon from '../assets/wheel/gifticon.svg';
import type { QuestButtonIcon } from '../data/pageData';
import { cn } from '../utils/cn';

export type ButtonVariant = 'ghost' | 'primary' | 'outline' | 'quest-light' | 'quest-primary' | 'support';
type ButtonIcon = Exclude<QuestButtonIcon, 'none'>;

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    wide?: boolean;
    icon?: ButtonIcon;
    iconPosition?: 'start' | 'end';
  }
>;

const ICONS: Partial<Record<ButtonIcon, string>> = {
  share: shareIcon,
  'google-play': googlePlayIcon,
  telegram: telegramIcon,
  gift: giftIcon,
  'app-store': appStoreIcon,
  ios: appStoreIcon,
  android: googlePlayIcon,
  'android-tv': androidTvIcon,
  windows: windowsIcon,
  'mac-os': macOsIcon,
  linux: linuxIcon,
  sbp: sbpIcon,
  sberpay: sberpayIcon,
  tpay: tpayIcon,
  card: cardIcon,
  crypto: cryptoIcon,
  support: supportIcon,
};

export function Button({
  children,
  className,
  variant = 'ghost',
  wide = false,
  icon,
  iconPosition = 'end',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'button',
        `button--${variant}`,
        wide && 'button--wide',
        icon && `button--icon-${iconPosition}`,
        className,
      )}
      {...props}
    >
      {icon && iconPosition === 'start' ? <ButtonIconImage name={icon} /> : null}
      <span className="button__label">{children}</span>
      {icon && iconPosition === 'end' ? <ButtonIconImage name={icon} /> : null}
    </button>
  );
}

function ButtonIconImage({ name }: { name: ButtonIcon }) {
  const src = ICONS[name];

  if (src) {
    return <img className="button__icon button__icon--image" src={src} alt="" aria-hidden="true" />;
  }

  return (
    <svg className="button__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
