import Image from 'components/Image';
import { useTranslation } from 'react-i18next';
import './index.css';

interface TopicCardProps {
  imagePath?: string;
  title?: string;
  description?: string;
  time?: number;
  conversationCount?: number;
}

const TopicCard = ({
  imagePath,
  title,
  description,
  time,
  conversationCount,
}: TopicCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="topic-card">
      {imagePath && (
        <div className="topic-card-img">
          <Image src={imagePath} />
        </div>
      )}
      <div className={`topic-card-content ${imagePath ? '' : 'no-image'}`}>
        <h3>{title}</h3>
        {!imagePath && <p>{description}</p>}
        {imagePath && <span className="topic-card-time">{time} min ago</span>}
      </div>
      <div className="topic-card-conversation">
        <span className="icon">
          <Image iconName="message" />
        </span>
        <span className="text">
          {conversationCount} {t('Conversation')}
        </span>
      </div>
    </div>
  );
};

export default TopicCard;
