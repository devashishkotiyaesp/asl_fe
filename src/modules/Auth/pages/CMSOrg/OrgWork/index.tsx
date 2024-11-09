import Image from 'components/Image';
import './index.css';

const OrgWork = () => {
  return (
    <section className="org-work">
      <div className="container">
        <div className="section-title">
          <span className="small-title">different kinds of organizations</span>
          <h2>Who We Work With</h2>
          <p>
            We collaborate with a wide range of organizations to create impactful
            learning experiences. Whether you're a school, homeschool group, or a
            company, we tailor our services to meet your unique needs.
          </p>
        </div>
        <div className="org-work-list">
          <div className="org-work-item">
            <div className="inner">
              <div className="icon">
                <Image iconName="homeIcon" />
              </div>
              <h3>Schools</h3>
              <p>
                We partner with schools to provide educational resources, workshops,
                and support to enhance learning experiences.
              </p>
            </div>
          </div>
          <div className="org-work-item">
            <div className="inner">
              <div className="icon">
                <Image iconName="university" />
              </div>
              <h3>Schools</h3>
              <p>
                We partner with schools to provide educational resources, workshops,
                and support to enhance learning experiences.
              </p>
            </div>
          </div>
          <div className="org-work-item">
            <div className="inner">
              <div className="icon">
                <Image iconName="building" />
              </div>
              <h3>Schools</h3>
              <p>
                We partner with schools to provide educational resources, workshops,
                and support to enhance learning experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrgWork;
