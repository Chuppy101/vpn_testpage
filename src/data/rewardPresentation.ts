import discountGiftImage from '../assets/wheel/gift.png';
import freeGiftImage from '../assets/wheel/freegift.png';
import tomorrowGiftImage from '../assets/wheel/tomorrowgift.png';
import type { Reward, RewardTheme } from './pageData';

export type RewardPopupContent = {
  title: string[];
  label: string;
  value: string;
  note?: string;
  image: string;
};

const REWARD_ART: Record<RewardTheme, string> = {
  discount: discountGiftImage,
  free: freeGiftImage,
  try: tomorrowGiftImage,
};

export function getRewardArt(theme: RewardTheme) {
  return REWARD_ART[theme];
}

export function getRewardPopupContent(reward: Reward): RewardPopupContent {
  if (reward.theme === 'free') {
    return {
      title: ['Поздравляем!', 'Вы выиграли'],
      label: reward.badge,
      value: reward.title,
      note: 'Они уже добавлены к вашей подписке',
      image: getRewardArt(reward.theme),
    };
  }

  if (reward.theme === 'try') {
    return {
      title: ['В другой раз', 'повезёт!'],
      label: 'Попробуйте',
      value: reward.title,
      image: getRewardArt(reward.theme),
    };
  }

  return {
    title: ['Поздравляем!', 'Вы выиграли'],
    label: reward.badge,
    value: reward.title,
    note: 'Активируйте в течение 24 часов',
    image: getRewardArt(reward.theme),
  };
}
