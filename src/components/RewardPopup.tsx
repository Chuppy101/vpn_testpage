import { useEffect } from 'react';
import type { Reward } from '../data/pageData';
import { getRewardPopupContent } from '../data/rewardPresentation';
import { Button } from './Button';

type RewardPopupProps = {
  reward: Reward;
  onClose: () => void;
};

export function RewardPopup({ reward, onClose }: RewardPopupProps) {
  const content = getRewardPopupContent(reward);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="reward-popup-backdrop" onClick={onClose}>
      <section
        className="reward-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reward-popup-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="reward-popup-title" className="reward-popup__title">
          {content.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>

        <div className="reward-popup__reward">
          <span className="reward-popup__label">{content.label}</span>

          <div className="reward-popup__image-box" aria-hidden="true">
            <img className="reward-popup__image" src={content.image} alt="" />
          </div>

          <span className="reward-popup__value">{content.value}</span>
        </div>

        {content.note ? (
          <p className="reward-popup__note">{content.note}</p>
        ) : (
          <div className="reward-popup__note reward-popup__note--empty" aria-hidden="true" />
        )}

        <div className="reward-popup__actions">
          <Button className="reward-popup__button" variant="quest-primary" wide onClick={onClose}>
            Продолжить
          </Button>
        </div>
      </section>
    </div>
  );
}
