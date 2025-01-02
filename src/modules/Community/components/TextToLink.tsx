// ** Components **
import { Link } from 'react-router-dom';

const TextToLink = ({ text }: { text: string }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text?.split(urlRegex);

  const linkTextPair = parts?.map((part, index) =>
    urlRegex?.test(part) ? (
      <Link key={`TextToLink${index + 1}`} to={part} target="_blank">
        {part}
      </Link>
    ) : (
      part
    )
  );

  return <p>{linkTextPair}</p>;
};

export default TextToLink;
