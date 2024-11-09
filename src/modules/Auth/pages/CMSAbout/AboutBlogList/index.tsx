// ** Components **
import BlogCard from 'components/BlogCard';

// ** Types **
import { CmsSectionProps } from '../../HomeCMS/types';
import { LocalStoriesProps } from '../types';

// ** Utils **
import _ from 'lodash';
import { formatCMSObjectData } from '../../HomeCMS/helper';
import './index.css';

const AboutBlogList = ({ localStories }: { localStories: CmsSectionProps[] }) => {
  const storiesData = !_.isUndefined(localStories)
    ? formatCMSObjectData({ data: localStories })
    : {};
  const { banner_title, eyebrow_title, point_data_array } =
    storiesData as unknown as LocalStoriesProps;
  return (
    <section className="recent-blog-list">
      <div className="container">
        <div className="section-title">
          <span className="small-title">{eyebrow_title}</span>
          <h2>{banner_title}</h2>
        </div>
        <div className="blog-list-wrapper">
          {point_data_array.map(
            ({ banner_image, date, title, story_link }, index) => (
              <BlogCard
                key={`blog_card_${index + 1}`}
                date={date}
                imagePath={banner_image}
                linkURL={story_link}
                title={title}
                isFormDataBase
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutBlogList;
