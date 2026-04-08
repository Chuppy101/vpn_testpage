import { type TransitionEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { Reward } from '../data/pageData';
import { getRewardArt } from '../data/rewardPresentation';
import { cn } from '../utils/cn';
import { Button } from './Button';

const CARD_WIDTH = 120;
const CARD_GAP = 4;
const DEFAULT_VIEWPORT_WIDTH = 528;
const LOOP_COUNT = 10;
const STEP = CARD_WIDTH + CARD_GAP;
const SPIN_DURATION = 5200;
const INITIAL_REWARD_INDEX = 2;
const EASING = 'cubic-bezier(0.08, 0.82, 0.17, 1)';

type PendingSpin = {
  reward: Reward;
  normalizedIndex: number;
};

function getTranslateX(index: number, viewportWidth: number) {
  const centerOffset = viewportWidth / 2 - CARD_WIDTH / 2;

  return centerOffset - index * STEP;
}

function pickWeightedReward(rewards: Reward[]) {
  const totalWeight = rewards.reduce((sum, reward) => sum + reward.weight, 0);
  let ticket = Math.random() * totalWeight;

  for (const reward of rewards) {
    ticket -= reward.weight;
    if (ticket <= 0) {
      return reward;
    }
  }

  return rewards[0];
}

function buildReel(rewards: Reward[]) {
  return Array.from({ length: LOOP_COUNT }, (_, loopIndex) =>
    rewards.map((reward, rewardIndex) => ({
      ...reward,
      reelIndex: loopIndex * rewards.length + rewardIndex,
    })),
  ).flat();
}

export function RouletteWheel({ rewards, onWin }: { rewards: Reward[]; onWin: (reward: Reward) => void }) {
  const reel = useMemo(() => buildReel(rewards), [rewards]);
  const middleLoopStart = rewards.length * 2;
  const initialIndex = middleLoopStart + Math.min(INITIAL_REWARD_INDEX, rewards.length - 1);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(DEFAULT_VIEWPORT_WIDTH);
  const [pendingSpin, setPendingSpin] = useState<PendingSpin | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = viewportRef.current;

    if (!node) {
      return;
    }

    const updateViewportWidth = () => {
      setViewportWidth(Math.round(node.getBoundingClientRect().width) || DEFAULT_VIEWPORT_WIDTH);
    };

    updateViewportWidth();

    const resizeObserver = new ResizeObserver(updateViewportWidth);
    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const spin = () => {
    if (spinning) {
      return;
    }

    const reward = pickWeightedReward(rewards);
    const rewardIndex = rewards.findIndex((item) => item.id === reward.id);
    const targetIndex = middleLoopStart + rewards.length * 5 + rewardIndex;
    const normalizedIndex = middleLoopStart + rewardIndex;

    setWinnerIndex(null);
    setPendingSpin({ reward, normalizedIndex });
    setSpinning(true);
    setActiveIndex(targetIndex);
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !spinning || !pendingSpin) {
      return;
    }

    setSpinning(false);
    setActiveIndex(pendingSpin.normalizedIndex);
    setWinnerIndex(pendingSpin.normalizedIndex);
    onWin(pendingSpin.reward);
    setPendingSpin(null);
  };

  return (
    <div className="roulette">
      <div ref={viewportRef} className="roulette__viewport">
        <div className="roulette__fade roulette__fade--left" />
        <div className="roulette__fade roulette__fade--right" />
        <div className="roulette__focus" aria-hidden="true" />

        <div className="roulette__mask">
          <div
            className="roulette__track"
            style={{
              transform: `translate3d(${getTranslateX(activeIndex, viewportWidth)}px, 0, 0)`,
              transition: spinning ? `transform ${SPIN_DURATION}ms ${EASING}` : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {reel.map((reward, index) => {
              const isSelected = !spinning && index === activeIndex;
              const isWinner = winnerIndex === index;

              return (
                <article
                  key={`${reward.id}-${index}`}
                  className={cn(
                    'reward-card',
                    isSelected && 'reward-card--selected',
                    isWinner && 'reward-card--winner',
                  )}
                >
                  <span className="reward-card__badge">{reward.badge}</span>

                  <div className="reward-card__illustration" aria-hidden="true">
                    <RewardArt reward={reward} />
                  </div>

                  <span className="reward-card__title">{reward.title}</span>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <Button variant="quest-primary" wide icon="gift" onClick={spin} disabled={spinning}>
        {spinning ? 'Испытываем удачу' : 'Испытать удачу'}
      </Button>
    </div>
  );
}

function RewardArt({ reward }: { reward: Reward }) {
  return <img className="reward-card__image" src={getRewardArt(reward.theme)} alt="" />;
}
