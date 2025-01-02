import Breadcrumbs from 'components/Breadcrumbs';
import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import { format, parseISO } from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import 'modules/LiveAssessment/styles/index.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface AssessmentDetailsProps {
  date: string;
  teacher: {
    profile_image: string;
    full_name: string;
  };
  start_time?: string;
  end_time?: string;
  provider_meeting_link?: string;
}
const AssessmentDetails = () => {
  const { t } = useTranslation();
  const [getSlotsApi] = useAxiosGet();
  const [assessmentData, setAssessmentData] = useState<AssessmentDetailsProps[]>();
  const assessmentApi = async () => {
    const response = await getSlotsApi(`/live-assessment`);
    setAssessmentData(response?.data?.data);
  };

  useEffect(() => {
    assessmentApi();
    const preventBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    // Push initial state to prevent going back
    preventBack();

    // Add listener for popstate (back button)
    window.addEventListener('popstate', preventBack);

    return () => {
      window.removeEventListener('popstate', preventBack);
    };
  }, []);
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
            {
              label: t('LiveAssessment.assessment.details.title'),
              url: '/courses/assessment',
            },
          ]}
        />
      </div>
      <div className="booked-slots-info">
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
      <div className="bg-white py-10 px-[50px] rounded-b-[5px]">
        <div className="text-[24px] font-medium mb-2.5">
          <h2>{t('LiveAssessment.schedule.title')}</h2>
        </div>
        <div className="bg-LightGray p-5  rounded-[5px]">
          {assessmentData?.map((slotDesc) => {
            // Combine date and time for formatting
            const startDateTime = `${slotDesc.date.split('T')[0]}T${slotDesc.start_time}`;
            const endDateTime = `${slotDesc.date.split('T')[0]}T${slotDesc.end_time}`;

            // Convert to AM/PM format
            const formattedStartTime = format(new Date(startDateTime), 'h:mm a');
            const formattedEndTime = format(new Date(endDateTime), 'h:mm a');
            return (
              <div className="bg-white rounded-md p-5 mb-5 last:mb-0">
                <div className="assessment-details-image-container items-center">
                  <div className="w-full rounded-full relative aspect-square overflow-hidden ">
                    <Image
                      src={
                        slotDesc?.teacher?.profile_image ||
                        '/images/avatar-placeholder.png'
                      }
                      isFromDataBase={!!slotDesc?.teacher?.profile_image}
                      imgClassName="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[14px] font-semibold capitalize">
                    <p>{slotDesc?.teacher?.full_name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-[30px]">
                  <div className="grid grid-cols-[40px_1fr] gap-3">
                    <div className="assessment-details-icon-container">
                      <Image iconName="calendar" />
                    </div>
                    <div className="text-[14px] ">
                      <div className="font-semibold mb-1">
                        <p>{t('LiveAssessment.date.title')}</p>
                      </div>
                      <div className="text-black/70">
                        <p>
                          {slotDesc?.date &&
                            format(parseISO(slotDesc?.date), 'yyyy-MM-dd')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[40px_1fr] gap-3">
                    <div className="assessment-details-icon-container">
                      <Image iconName="clock" />
                    </div>
                    <div className="text-[14px]">
                      <div className="font-semibold mb-1">
                        <p>
                          {t('LiveAssessment.yourSlots.title')}
                          <span className="text-PrimaryWood">
                            &nbsp; ({format(parseISO(slotDesc?.date), 'yyyy-MM-dd')})
                          </span>
                        </p>
                      </div>
                      <div className="assessment-details.dates">
                        <span> {formattedStartTime}</span> -
                        <span>{formattedEndTime}</span>
                      </div>
                    </div>
                  </div>
                  {slotDesc?.provider_meeting_link && (
                    <div className="grid grid-cols-[40px_1fr] gap-3">
                      <div className="assessment-details-icon-container">
                        <Image iconName="videoRecord" iconClassName="w-5 h-5" />
                      </div>
                      <div className="text-[14px] ">
                        <div className="font-semibold mb-1">
                          <p>{t('LiveAssessment.zoomLink.title')}</p>
                        </div>
                        <a
                          href={slotDesc?.provider_meeting_link}
                          target="_blank"
                          className="zoom-link"
                          rel="noreferrer"
                        >
                          {slotDesc?.provider_meeting_link}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-[30px] pt-5 border-t border-t-black/10">
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

export default AssessmentDetails;
