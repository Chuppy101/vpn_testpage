import { useCallback, useState } from 'react';
import sideIcon from '../assets/wheel/sideicon.svg';
import { type Reward, wheelRewards } from '../data/pageData';
import { QuestProgress } from './QuestProgress';
import { RewardPopup } from './RewardPopup';
import { RouletteWheel } from './RouletteWheel';

export function WheelQuestCard() {
  const [streak, setStreak] = useState(1);
  const [popupReward, setPopupReward] = useState<Reward | null>(null);

  const handleReward = useCallback((reward: Reward) => {
    setStreak((value) => (value >= 7 ? 1 : value + 1));
    setPopupReward(reward);
  }, []);

  return (
    <section className="wheel-card">
      <header className="wheel-card__header">
        <div className="wheel-card__copy">
          <h2 className="wheel-card__title">Колесо Фортуны</h2>
          <p className="wheel-card__subtitle">
            Испытайте удачу раз в день
            <br />
            и выигрывайте бонусы для VPN!
          </p>
        </div>

        <div className="wheel-card__art" aria-hidden="true">
          <img src={sideIcon} alt="" className="wheel-card__art-image" />
        </div>
      </header>

      <RouletteWheel rewards={wheelRewards} onWin={handleReward} />
      <QuestProgress streak={streak} />

      {popupReward ? <RewardPopup reward={popupReward} onClose={() => setPopupReward(null)} /> : null}
    </section>
  );
}
