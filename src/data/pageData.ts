export type RewardTheme = 'discount' | 'free' | 'try';

export type Reward = {
  id: string;
  badge: string;
  title: string;
  theme: RewardTheme;
  weight: number;
};

export type QuestButtonIcon =
  | 'arrow'
  | 'share'
  | 'telegram'
  | 'gift'
  | 'google-play'
  | 'app-store'
  | 'ios'
  | 'android'
  | 'android-tv'
  | 'windows'
  | 'mac-os'
  | 'linux'
  | 'sbp'
  | 'sberpay'
  | 'tpay'
  | 'card'
  | 'crypto'
  | 'support'
  | 'none';

export type FooterListItem = {
  label: string;
  icon?: Exclude<QuestButtonIcon, 'none' | 'arrow'>;
};

export type QuestCard = {
  id: string;
  title: string;
  description: string;
  cta: string;
  badge: string;
  icon?: Exclude<
    QuestButtonIcon,
    | 'gift'
    | 'app-store'
    | 'none'
    | 'ios'
    | 'android'
    | 'android-tv'
    | 'windows'
    | 'mac-os'
    | 'linux'
    | 'sbp'
    | 'sberpay'
    | 'tpay'
    | 'card'
    | 'crypto'
  >;
};

export const pageMeta = {
  title: 'Аккаунт',
  sectionTitle: 'Квесты',
};

export const headerData = {
  leftLinks: ['FAQ', 'Тарифы'],
  rightLinks: [
    { label: 'Блог', variant: 'ghost' as const },
    { label: 'Аккаунт', variant: 'outline' as const },
  ],
  ctaLabel: 'Скачать',
  languages: [
    { code: 'EN' as const, prefix: 'EN', label: 'English' },
    { code: 'РУ' as const, prefix: 'РУ', label: 'Русский' },
  ],
};

export const heroQuest: QuestCard = {
  id: 'hero-quest',
  badge: 'Доступен',
  title: 'Расскажи о Hiro',
  description: `Просто напиши пост/статью о нас в крупном канале или на своей странице в соцсетях со ссылкой на нас.
Пришли ссылку на пост/статью - и мы начислим тебе от 15 до 90 дней VPN бесплатно!
Чем больше охват, тем длиннее подарок!`,
  cta: 'Отправить ссылки',
};

export const wheelRewards: Reward[] = [
  { id: 'reward-50', badge: 'Скидка', title: '50%', theme: 'discount', weight: 18 },
  { id: 'reward-30', badge: 'Скидка', title: '30%', theme: 'discount', weight: 18 },
  { id: 'reward-6h', badge: 'Бесплатные', title: '6 часов', theme: 'free', weight: 28 },
  { id: 'reward-20', badge: 'Скидка', title: '20%', theme: 'discount', weight: 22 },
  { id: 'reward-tomorrow', badge: 'Попробуй', title: 'завтра', theme: 'try', weight: 14 },
];

export const secondaryQuests: QuestCard[] = [
  {
    id: 'quest-review',
    badge: 'Доступен',
    title: 'Оставь отзыв',
    description: 'Поделитесь своим мнением о HiroVPN и получите 3 дня VPN бесплатно!',
    cta: 'Оставить отзыв',
  },
  {
    id: 'quest-friends',
    badge: 'Доступен',
    title: 'Поделиться с друзьями',
    description: 'Пригласите друга в HiroVPN и получите 1 день VPN бесплатно!',
    cta: 'Поделиться',
    icon: 'share',
  },
  {
    id: 'quest-likes',
    badge: 'Доступен',
    title: 'Поддержите нас лайками',
    description: 'Поставьте лайки 5 комментариям, с которыми вы согласны, и мы подарим вам 2 дня VPN бесплатно!',
    cta: 'Поддержать',
    icon: 'support',
  },
  {
    id: 'quest-google-maps',
    badge: 'Доступен',
    title: 'Оцени нас в Google Картах',
    description: 'Поделись впечатлением и получи 1 день VPN в подарок!',
    cta: 'Оценить',
  },
  {
    id: 'quest-yandex-maps',
    badge: 'Доступен',
    title: 'Оцени нас в ЯНДЕКС Картах',
    description: 'Поделись впечатлением и получи 1 день VPN в подарок!',
    cta: 'Оценить',
  },
  {
    id: 'quest-telegram',
    badge: 'Доступен',
    title: 'Подписаться на TG-канал',
    description: 'Подпишитесь на канал HiroVPN - получайте новости и апдейты самыми первыми, а так же 1 день VPN бесплатно!',
    cta: 'Подписаться',
    icon: 'telegram',
  },
];

export const footerColumns = {
  brand: [
    { label: 'FAQ' },
    { label: 'Тарифы' },
    { label: 'Блог' },
    { label: 'Роутеры' },
    { label: 'Партнёрам' },
    { label: 'Аккаунт' },
  ],
  downloads: [
    { label: 'iOS', icon: 'ios' as const },
    { label: 'Android', icon: 'android' as const },
    { label: 'Android TV', icon: 'android-tv' as const },
    { label: 'Windows', icon: 'windows' as const },
    { label: 'Mac Os', icon: 'mac-os' as const },
    { label: 'Linux', icon: 'linux' as const },
  ],
  payments: [
    { label: 'СБП', icon: 'sbp' as const },
    { label: 'Sberpay', icon: 'sberpay' as const },
    { label: 'Tinkoff Pay', icon: 'tpay' as const },
    { label: 'Банковская карта', icon: 'card' as const },
    { label: 'Криптовалюта', icon: 'crypto' as const },
  ],
};

export const footerSupport = {
  button: { label: 'Telegram', icon: 'telegram' as const },
  documents: [{ label: 'Публичная оферта' }, { label: 'Пользовательское соглашение' }],
};

export const footerCopyright = '© 2025 Wolle Development Limited. Все права защищены.';
