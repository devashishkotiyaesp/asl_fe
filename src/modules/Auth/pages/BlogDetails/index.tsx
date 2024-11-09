import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import { Link } from 'react-router-dom';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import './index.css';

const BlogDetails = () => {
  return (
    <>
      <section className="blog-details">
        <div className="container">
          <div className="breadcrumbs">
            <ul>
              <li className="breadcrumb-item">
                <Link to="#!">Blog</Link>
              </li>
              <li className="breadcrumb-item">
                Mastering ASL: Top Tips for Beginners
              </li>
            </ul>
          </div>
          <div className="wrapper">
            <div className="left-part">
              <div className="section-title">
                <span className="hashtag-label">#newsletters</span>
                <h1 className="h2">Mastering ASL: Top Tips for Beginners</h1>
              </div>
              <div className="blog-date-social">
                <div className="blog-date-wrap">
                  <div className="blog-date-item">
                    <Image iconName="calendar" />
                    Oct 17, 2023
                  </div>
                  <div className="blog-date-item">
                    <Image iconName="editPen" />
                    by Stephanie Zornoza
                  </div>
                </div>
                <div className="blog-social">
                  <ul>
                    <li>
                      <Link to="#!">
                        <Image iconName="instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#!">
                        <Image iconName="facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#!">
                        <Image iconName="x" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="blog-content-wrap">
                <div className="blog-content-img">
                  <img src="./images/blog-4.png" alt="" />
                </div>
                <div className="blog-content">
                  <p>
                    American Sign Language (ASL) is a vibrant and expressive language
                    used by the Deaf and hard-of-hearing communities. Whether
                    you&apos;re learning ASL to communicate more effectively with
                    friends, family, or colleagues, or to broaden your linguistic
                    skills, here are some essential tips to get you started on your
                    journey.
                  </p>
                  <h2>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                    molestiae excepturi explicabo laudantium dolor sunt et esse
                    dolorum possimus ipsa!
                  </h2>
                  <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                    molestiae excepturi explicabo laudantium dolor sunt et esse
                    dolorum possimus ipsa!
                  </h3>
                  <h4>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                    molestiae excepturi explicabo laudantium dolor sunt et esse
                    dolorum possimus ipsa!
                  </h4>
                  <h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                    molestiae excepturi explicabo laudantium dolor sunt et esse
                    dolorum possimus ipsa!
                  </h5>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                    molestiae excepturi explicabo laudantium dolor sunt et esse
                    dolorum possimus ipsa!
                  </h6>

                  <p>
                    Lorem ipsum dolor sit amet <Link to="#!">consectetur</Link>,
                    adipisicing elit. Nihil molestias fuga neque earum excepturi
                    explicabo similique, repudiandae facilis dignissimos ipsum?
                  </p>

                  <table>
                    <thead>
                      <tr>
                        <th>table head 1</th>
                        <th>table head 2</th>
                        <th>table head 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>table head 1</td>
                        <td>table head 2</td>
                        <td>table head 3</td>
                      </tr>
                    </tbody>
                  </table>

                  <p>
                    Lorem ipsum dolor sit amet <Link to="#!">consectetur</Link>,
                    adipisicing elit. Nihil molestias fuga neque earum excepturi
                    explicabo similique, repudiandae facilis dignissimos ipsum?
                  </p>

                  <img src="/images/blog-4.png" alt="" />
                  <p>
                    Lorem ipsum dolor sit amet <Link to="#!">consectetur</Link>,
                    adipisicing elit. Nihil molestias fuga neque earum excepturi
                    explicabo similique, repudiandae facilis dignissimos ipsum?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet <Link to="#!">consectetur</Link>,
                    adipisicing elit. Nihil molestias fuga neque earum excepturi
                    explicabo similique, repudiandae facilis dignissimos ipsum?
                  </p>

                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet <Link to="#!">consectetur</Link>{' '}
                      adipisicing elit. Doloremque, nesciunt!
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet <strong>consectetur</strong>{' '}
                      adipisicing elit. Doloremque, nesciunt!
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet <i>consectetur</i> adipisicing elit.
                      <u>Doloremque</u>, nesciunt!
                    </li>
                  </ul>

                  <blockquote>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                      ipsum esse aliquam quisquam reprehenderit iure aliquid
                      distinctio sunt harum, qui error ad nihil? Est ullam, autem non
                      laborum neque ipsa.
                    </p>
                  </blockquote>
                </div>

                <div className="blog-conclusion">
                  <span className="blog-conclusion-title">Conclusion</span>
                  <p>
                    Embarking on the journey to master ASL can be both challenging
                    and rewarding. By following these tips and dedicating yourself to
                    consistent practice and cultural understanding, you&apos;ll be
                    well on your way to becoming proficient in ASL. Remember,
                    learning a language is a continuous process, so keep an open mind
                    and enjoy the learning experience!
                  </p>
                </div>

                <div className="author">
                  <div className="author-inner">
                    <div className="author-profile">
                      <div className="img">
                        <img src="/images/sign-1.png" alt="" />
                      </div>
                      <div className="author-data">
                        <span>Stephanie Zornoza,M.A.</span>
                        <span>CEO | Founder of The ASL Shop</span>
                        <div className="author-social">
                          <ul>
                            <li>
                              <Link to="#!">
                                <Image iconName="instagram" />
                              </Link>
                            </li>
                            <li>
                              <Link to="#!">
                                <Image iconName="x" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="author-content">
                      <p>
                        Stephanie is a proud Deaf woman living in Los Angeles. She is
                        a native signer of American Sign Language (ASL), taught to
                        her by her grandmother who is also a Deaf native ASL user.
                        Stephanie received her Bachelor's degree in ASL with a minor
                        in Linguistics and a Master's degree in Sign Language
                        Education, both from Gallaudet University. She then went on
                        to teach at her alma mater.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-part">
              <div className="recent-blog">
                <span className="recent-blog-title">Latest Posts</span>
                <Link to="#!" className="recent-blog-item">
                  <div className="recent-blog-img">
                    <Image src="images/blog-3.png" />
                  </div>
                  <div className="recent-blog-content">
                    <p>The Cultural Significance of American Sign Language</p>
                    <div className="blog-date-item">
                      <Image iconName="calendar" />
                      Oct 17, 2023
                    </div>
                  </div>
                </Link>
                <Link to="#!" className="recent-blog-item">
                  <div className="recent-blog-img">
                    <Image src="images/blog-3.png" />
                  </div>
                  <div className="recent-blog-content">
                    <p>The Cultural Significance of American Sign Language</p>
                    <div className="blog-date-item">
                      <Image iconName="calendar" />
                      Oct 17, 2023
                    </div>
                  </div>
                </Link>
                <Link to="#!" className="recent-blog-item">
                  <div className="recent-blog-img">
                    <Image src="images/blog-3.png" />
                  </div>
                  <div className="recent-blog-content">
                    <p>The Cultural Significance of American Sign Language</p>
                    <div className="blog-date-item">
                      <Image iconName="calendar" />
                      Oct 17, 2023
                    </div>
                  </div>
                </Link>
                <Link to="#!" className="recent-blog-item">
                  <div className="recent-blog-img">
                    <Image src="images/blog-3.png" />
                  </div>
                  <div className="recent-blog-content">
                    <p>The Cultural Significance of American Sign Language</p>
                    <div className="blog-date-item">
                      <Image iconName="calendar" />
                      Oct 17, 2023
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CMSCTA
        variant="2"
        linkText="Sign me up!"
        leftImagePath="/images/three-girl-hand-gesture.png"
        title="When you enroll, you will have access to lecture videos, skills practice videos, quizzes, assignments, and our exclusive platform, The Lobby!"
      />
      <GlobalSection />
    </>
  );
};

export default BlogDetails;
