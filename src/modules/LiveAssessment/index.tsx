import Breadcrumbs from 'components/Breadcrumbs';
import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import 'modules/LiveAssessment/styles/index.css';
import { useTranslation } from 'react-i18next';
import SlotsBooking from './Components/SlotsBooking';

const LiveAssessment = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="student-page-header">
        <Breadcrumbs
          items={[
            {
              label: t('Header.CMS.Home'),
              url: '/',
            },
            {
              label: t('Courses.Title'),
              url: '/courses',
            },
            {
              label: t('LiveAssessment.slot.booking.title'),
              url: '/courses/book-appointment',
            },
          ]}
        />
      </div>
      <div className="live-assessment-imageContainer">
        <Image
          src="/images/student-course.png"
          isFromDataBase={false}
          imgClassName="absolute top-0 left-0 w-full h-full"
        />
        <div className="live-assessment-description">
          <p>
            <span>{t('LiveAssessment.allAppointments')}</span>
            <span className="text-PrimaryYellow mx-2">&bull;</span>
            <span>{t('LiveAssessment.title')}</span>
          </p>
          <div className="ml-auto flex flex-col text-right">
            <span className="text-[28px] font-black">
              {t('LiveAssessment.price')}
            </span>
            <span className="opacity-50 uppercase">{t('LiveAssessment.fees')}</span>
          </div>
        </div>
      </div>
      <div className="slots-booking-container">
        <SlotsBooking />

        <div className="slots-cancellation-policy">
          <div className="text-[20px] font-medium mb-[6px] text-">
            <h2>{t('LiveAssessment.cancellationPolicy')}</h2>
          </div>
          <div className="text-black/50">
            <p>{t('LiveAssessment.policyDetails')}</p>
          </div>
        </div>
      </div>

      <GlobalSection hideAccessDevice />
    </div>
  );
};

export default LiveAssessment;
