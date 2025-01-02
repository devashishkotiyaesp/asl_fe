import Button from 'components/Button/Button';
import Image from 'components/Image';
import './index.css';

interface TeacherProfileTeachesProps {
  imgPath: string;
  text: string;
}

const TeacherProfileTeaches = ({ imgPath, text }: TeacherProfileTeachesProps) => {
  return (
    <Button className="teacher-profile-category-card">
      <Image src={imgPath} isFromDataBase={false} />
      <div className="content">
        <p>{text}</p>
      </div>
    </Button>
  );
};

export default TeacherProfileTeaches;
