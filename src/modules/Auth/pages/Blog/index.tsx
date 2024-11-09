import BlogCard from 'components/BlogCard';
import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import { Link } from 'react-router-dom';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import './index.css';

interface CMSBlogProps {
  secondrySection?: boolean;
  hashtagLabel?: string;
  smallTitle?: string;
  sectionTitle?: string;
  sectionDescription?: string;
}
const CMSBlog = ({
  secondrySection,
  hashtagLabel,
  smallTitle,
  sectionTitle,
  sectionDescription,
}: CMSBlogProps) => {
  return (
    <>
      <section className={`blog-sec ${secondrySection ? 'inner-section' : ''}`}>
        <div className="container">
          <div className="wrapper">
            <div className="left-part">
              <div
                className={`section-title ${secondrySection ? 'text-center' : ''}`}
              >
                {hashtagLabel && (
                  <span className="hashtag-label">
                    {hashtagLabel || '#newsletters'}
                  </span>
                )}
                {smallTitle && <span className="small-title">{smallTitle}</span>}
                <h1 className="h2">{sectionTitle || 'Sign Language Insights'}</h1>
                <p>
                  {sectionDescription ||
                    'Dive into expert advice,real-life experiences,and motivational content that will guide you on your journey to mastering American Sign Language.'}
                </p>
              </div>
            </div>
            {secondrySection ? (
              ''
            ) : (
              <div className="right-part">
                <div className="blog-search">
                  <input
                    type="text"
                    className=""
                    placeholder="Search for a Insight.."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="blog-list">
        <div className="container">
          <div className="blog-list-wrapper">
            <BlogCard
              date="26-09-2024"
              imagePath="/images/blog-1.png"
              linkURL="./"
              title="Mastering ASL: Top Tips for Beginners"
            />
            <BlogCard
              date="26-09-2024"
              imagePath="/images/blog-1.png"
              linkURL="./"
              title="Mastering ASL: Top Tips for Beginners"
            />
            <BlogCard
              date="26-09-2024"
              imagePath="/images/blog-1.png"
              linkURL="./"
              title="Mastering ASL: Top Tips for Beginners"
            />
            <BlogCard
              date="26-09-2024"
              imagePath="/images/blog-1.png"
              linkURL="./"
              title="Mastering ASL: Top Tips for Beginners"
            />
          </div>

          <div className="load-more">
            <Link to="#!">
              Load More <Image iconName="arrowDownRounded" />
            </Link>
          </div>
        </div>
      </section>

      {!secondrySection && (
        <>
          <CMSCTA
            variant="2"
            linkText="Sign me up!"
            leftImagePath="/images/three-girl-hand-gesture.png"
            title="When you enroll, you will have access to lecture videos, skills practice videos, quizzes, assignments, and our exclusive platform, The Lobby!"
          />
          <GlobalSection />
        </>
      )}
    </>
  );
};

export default CMSBlog;
