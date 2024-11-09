import Button from 'components/Button/Button';
import VirtualCourseCard from 'components/VirtualCourseCard';
import './index.css';

const CourseData = [
  {
    id: 0,
    imagePath: '/images/virtual-classes-1.png',
    title: 'ASL Level 1 | Zoom Sessions',
    price: '$200',
    coachName: 'Hadel Somo',
    coachProfie: '/images/profile.png',
    date: 'Started Sep 10',
    spotLeft: 10,
    linkText: 'Book Now',
    linkURL: './',
  },
  {
    id: 1,
    imagePath: '/images/virtual-classes-2.png',
    title: 'ASL Level 1 | Zoom Sessions',
    price: '$200',
    coachName: 'Hadel Somo',
    coachProfie: '/images/profile.png',
    date: 'Started Sep 10',
    spotLeft: 10,
    linkText: 'Book Now',
    linkURL: './',
  },
  {
    id: 2,
    imagePath: '/images/virtual-classes-3.png',
    title: 'ASL Level 1 | Zoom Sessions',
    price: '$200',
    coachName: 'Hadel Somo',
    coachProfie: '/images/profile.png',
    date: 'Started Sep 10',
    spotLeft: 10,
    linkText: 'Book Now',
    linkURL: './',
  },
];

const VirtualCourses = () => {
  return (
    <section className="v-courses">
      <div className="container">
        <div className="section-title">
          <h2>Courses</h2>
          <p>
            Virtual Classes: Learn from anywhere, anytime with live, interactive
            sessions.
          </p>
        </div>
        <div className="wrapper">
          <div className="tab-wrapper">
            <div className="tab-list">
              <ul>
                <li>
                  <Button variants="blackBorder">ASL Assessment</Button>
                </li>
                <li>
                  <Button variants="black">Level 2</Button>
                </li>
                <li>
                  <Button variants="blackBorder">Level 1</Button>
                </li>
                <li>
                  <Button variants="blackBorder">Level 3</Button>
                </li>
                <li>
                  <Button variants="blackBorder">Level 4</Button>
                </li>
                <li>
                  <Button variants="blackBorder">
                    Intermediate ASL Level 1 & 2
                  </Button>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-content-item">
                {CourseData.map((e, index) => {
                  return (
                    <VirtualCourseCard
                      key={index}
                      imagePath={e.imagePath}
                      title={e.title}
                      price={e.price}
                      coachName={e.coachName}
                      coachProfie={e.coachProfie}
                      date={e.date}
                      spotLeft={e.spotLeft}
                      linkText={e.linkText}
                      linkURL={e.linkURL}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualCourses;
