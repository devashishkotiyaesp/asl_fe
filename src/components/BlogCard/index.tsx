import Image from 'components/Image';
import { Link } from 'react-router-dom';
import './index.css';

interface BlogCardProps {
  linkURL: string;
  imagePath: string;
  title: string;
  date: string;
  isFormDataBase?: boolean;
}

const BlogCard = ({
  linkURL,
  imagePath,
  title,
  date,
  isFormDataBase = false,
}: BlogCardProps) => {
  return (
    <Link to={linkURL} className="blog-card">
      <div className="img-wrap">
        <Image src={imagePath} isFromDataBase={isFormDataBase} />
      </div>
      <div className="content">
        <h3>{title}</h3>
        <span className="date">
          <Image iconName="calendar" />
          {date}
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
