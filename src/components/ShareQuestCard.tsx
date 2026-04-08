import type { QuestCard } from '../data/pageData';
import { cn } from '../utils/cn';
import { Button } from './Button';

type ShareQuestCardProps = {
  quest: QuestCard;
  featured?: boolean;
};

export function ShareQuestCard({ quest, featured = false }: ShareQuestCardProps) {
  return (
    <article className={cn('quest-card', featured && 'quest-card--featured')}>
      <span className="quest-card__badge">{quest.badge}</span>
      <h3 className="quest-card__title">{quest.title}</h3>
      <p className="quest-card__description">{quest.description}</p>

      <Button className="quest-card__button" variant={featured ? 'quest-primary' : 'quest-light'} wide icon={quest.icon}>
        {quest.cta}
      </Button>
    </article>
  );
}
