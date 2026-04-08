import { useEffect, useRef, useState } from 'react';
import { headerData } from '../data/pageData';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Logo } from './Logo';

type LanguageCode = (typeof headerData.languages)[number]['code'];
type OpenPanel = 'menu' | 'language' | null;

const MOBILE_MENU_ITEMS = [
  ...headerData.leftLinks.map((label) => ({ key: `left-${label}`, label, variant: 'ghost' as const })),
  ...headerData.rightLinks.map((item) => ({ key: `right-${item.label}`, label: item.label, variant: 'ghost' as const })),
  { key: 'download', label: headerData.ctaLabel, variant: 'primary' as const },
];

export function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [language, setLanguage] = useState<LanguageCode>('РУ');
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenPanel(null);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenPanel(null);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const isLanguageOpen = openPanel === 'language';
  const isMenuOpen = openPanel === 'menu';
  const togglePanel = (panel: Exclude<OpenPanel, null>) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  return (
    <header ref={headerRef} className="header">
      <div className="header__desktop">
        <div className="header__group">
          <Logo />

          <nav className="header__nav" aria-label="Основная навигация">
            {headerData.leftLinks.map((label) => (
              <Button key={label} className="header__button" variant="ghost">
                {label}
              </Button>
            ))}
          </nav>
        </div>

        <Button className="header__cta" variant="primary">
          {headerData.ctaLabel}
        </Button>

        <div className="header__group header__group--right">
          <nav className="header__nav" aria-label="Пользовательская навигация">
            {headerData.rightLinks.map((item) => (
              <Button key={item.label} className="header__button" variant={item.variant}>
                {item.label}
              </Button>
            ))}
          </nav>

          <LanguageSwitcher
            language={language}
            isOpen={isLanguageOpen}
            onToggle={() => togglePanel('language')}
            onSelect={(value) => {
              setLanguage(value);
              setOpenPanel(null);
            }}
          />
        </div>
      </div>

      <div className="header__mobile">
        <button
          type="button"
          className={cn('header__menu-toggle', isMenuOpen && 'header__menu-toggle--open')}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-controls="header-mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => togglePanel('menu')}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="header__mobile-logo">
          <Logo />
        </div>

        <LanguageSwitcher
          mobile
          language={language}
          isOpen={isLanguageOpen}
          onToggle={() => togglePanel('language')}
          onSelect={(value) => {
            setLanguage(value);
            setOpenPanel(null);
          }}
        />
      </div>

      {isMenuOpen ? (
        <nav id="header-mobile-menu" className="header__mobile-menu" aria-label="Мобильная навигация">
          {MOBILE_MENU_ITEMS.map((item) => (
            <Button
              key={item.key}
              className="header__mobile-button"
              variant={item.variant}
              onClick={() => setOpenPanel(null)}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

type LanguageSwitcherProps = {
  language: LanguageCode;
  isOpen: boolean;
  mobile?: boolean;
  onToggle: () => void;
  onSelect: (value: LanguageCode) => void;
};

function LanguageSwitcher({ language, isOpen, mobile = false, onToggle, onSelect }: LanguageSwitcherProps) {
  return (
    <div className={cn('language-switcher', mobile && 'language-switcher--mobile')}>
      <Button
        className="language-switcher__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {language}
        <span className={cn('language-switcher__caret', isOpen && 'language-switcher__caret--open')} aria-hidden="true" />
      </Button>

      {isOpen ? (
        <div className="language-switcher__menu" role="listbox" aria-label="Выбор языка">
          {headerData.languages.map((option) => (
            <button
              key={option.code}
              type="button"
              className={cn('language-switcher__option', language === option.code && 'language-switcher__option--active')}
              onClick={() => onSelect(option.code)}
            >
              <span className="language-switcher__option-code">{option.prefix}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
