import { Link } from 'react-router-dom';
import './index.css';

const CTAStipre = () => {
  return (
    <section className="cta-stripe">
      <div className="container">
        <div className="wrapper">
          <div className="left-part">
            <div className="section-title">
              <h2>Got an Idea? Let&apos;s Make It Happen!</h2>
              <p>
                If you have an idea or a different kind of organization we
                haven&apos;t listed, feel free to reach out! We&apos;re always open
                to new partnerships and creative collaborations.
              </p>
            </div>
          </div>
          <div className="right-part">
            <div className="btn btn-black">
              <Link to="./">Let&apos;s Talk!</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAStipre;
