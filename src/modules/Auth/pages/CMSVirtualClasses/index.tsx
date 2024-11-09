import Footer from 'components/TopBarLayout/Footer/Index';
import CMSAccessDevice from '../HomeCMS/Components/CMSAccessDevice';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import VirtualCourses from './VirtualCourses';
import ZoomClasses from './ZoomClasses';

const index = () => {
  return (
    <>
      <ZoomClasses />
      <VirtualCourses />
      <CMSCTA
        variant="2"
        linkText="Sign me up!"
        leftImagePath="/images/three-girl-hand-gesture.png"
        title="When you enroll, you will have access to lecture videos, skills practice videos, quizzes, assignments, and our exclusive platform, The Lobby!"
      />
      <CMSAccessDevice />
      <Footer />
    </>
  );
};

export default index;
