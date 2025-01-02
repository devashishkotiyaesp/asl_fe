import Image from 'components/Image';
import './index.css';

interface TestimonialCardProps {
  imagePath?: string;
  title?: string;
  description?: string;
  Name?: string;
  info?: string;
  className?: string;
  isStatic?: boolean;
}

const TestimonialCard = ({
  imagePath,
  title,
  description,
  Name,
  info,
  className,
  isStatic,
}: TestimonialCardProps) => {
  return (
    <div className={`testimonial-card ${className || ''}`}>
      <div className="inner">
        <div className="testimonial-img">
          {isStatic ? (
            <Image src={imagePath} isFromDataBase={false} />
          ) : (
            <Image src={imagePath} />
          )}
        </div>
        <span className="quote-icon">
          <Image iconName="quote" />
        </span>
        <div className="testimonial-title">{title ?? 'Testimonials'}</div>
        <div className="description">
          <p dangerouslySetInnerHTML={{ __html: description as string }} />
        </div>
        <div className="testimonial-info">
          <p>{Name ?? 'See What Our Students Have To Say'}</p>
          <span>
            {info ??
              'Use The ASL Shop to learn American Sign Language (ASL) on your smartphone, tablet or laptop. No matter where you are, your learning progress is constantly being synced across all your devices'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
