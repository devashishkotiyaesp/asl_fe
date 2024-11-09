import GlobalSection from 'components/GlobalSection';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import Testimonial from '../HomeCMS/Components/Testimonials';
import BenefitsCollab from './BenefitsCollab';
import CTAStipre from './CTAStripe';
import OrgBanner from './OrgBanner';
import OrgWork from './OrgWork';

const CMSOrg = () => {
  return (
    <>
      <OrgBanner />
      <OrgWork />
      <CTAStipre />
      <BenefitsCollab />
      <Testimonial transparentBG companyCard />
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

export default CMSOrg;
