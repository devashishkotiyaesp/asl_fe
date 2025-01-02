import { DictionaryResponse } from '../types';
import './index.css';

const DictionaryBanner = ({ bannerData }: { bannerData: DictionaryResponse }) => {
  const { hashTag_description, title_hashTag, title_of_hashTag } = bannerData;
  return (
    <section className="dictionary-banner">
      <div className="container">
        <div className="section-title">
          <span className="hashtag-label">{title_hashTag}</span>
          <h1 className="h2">{title_of_hashTag}</h1>
          <p>{hashTag_description}</p>
        </div>
      </div>
    </section>
  );
};

export default DictionaryBanner;
