import Button from 'components/Button/Button';
import Image from 'components/Image';
import Loaders from 'components/Loaders';
import VideoPlayer from 'components/VideoPlayer';
import { CourseTypeEnum, Roles } from 'constants/common.constant';
import { eachDayOfInterval, format, isSameMonth, parse, parseISO } from 'date-fns';
import { useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { capitalizeFirstLetter } from 'utils';
import { ICourse } from '../types/courseList.type';

type ICourseDetailProps = {
  courseDetail: ICourse | undefined;
  refetch?: () => Promise<void>;
  isPageLoading?: boolean;
};
const CourseDetails = ({
  courseDetail,
  refetch,
  isPageLoading,
}: ICourseDetailProps) => {
  const { t } = useTranslation();
  const course_type = courseDetail?.type.type ?? CourseTypeEnum.SELF_PACED_COURSES;
  const isAddress =
    course_type === CourseTypeEnum.IN_PERSON_CLASS ||
    course_type === CourseTypeEnum.APPOINTMENTS;
  const [classDates, setClassDates] = useState<string[]>();
  const [postApi, { isLoading }] = useAxiosPost();
  const user = useSelector(getCurrentUser);

  const findDatesForCurrentMonth = (
    startDate: string,
    endDate: string,
    selectedDays?: number[]
  ) => {
    if (
      !startDate ||
      !endDate ||
      !Array.isArray(selectedDays) ||
      selectedDays.length === 0
    ) {
      return [];
    }
    const allDates = eachDayOfInterval({
      start: parseISO(startDate),
      end: parseISO(endDate),
    });

    const currentMonth = new Date();

    return allDates
      .filter(
        (date) =>
          selectedDays.includes(date.getDay()) && isSameMonth(date, currentMonth)
      )
      .map((date) => format(date, 'd')); // Only return the day of the month
  };

  useEffect(() => {
    if (
      courseDetail?.start_date &&
      courseDetail?.end_date &&
      Array.isArray(courseDetail?.repeat_interval_days)
    ) {
      const dates = findDatesForCurrentMonth(
        courseDetail.start_date,
        courseDetail.end_date,
        courseDetail.repeat_interval_days
      );
      setClassDates(dates);
    }
  }, [courseDetail]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        <div className="lazy w-full h-40" />
        <div className="lazy !w-10/12 h-20" />
        <div className="flex flex-row gap-4">
          <span className="lazy !w-1/3 h-10" />
          <span className="lazy !w-1/3 h-10" />
        </div>
        <div className="lazy w-full h-40" />
      </div>
    );
  }
  const startCourseNow = async () => {
    const payLoad = {
      course_id: courseDetail?.id,
      status: 'started',
    };
    const { error } = await postApi('/courses/start', payLoad);
    if (!error) {
      refetch?.();
    }
  };

  return !isPageLoading ? (
    <div className="student-course-overview">
      <div className="student-course-details">
        <h4>
          {t('CourseManagement.CoursePreview.CourseDetails.CourseDescription')}
        </h4>
        <p
          dangerouslySetInnerHTML={{ __html: courseDetail?.description as string }}
        />
        {courseDetail?.key_learnings && courseDetail.key_learnings.length > 0 ? (
          <div className="student-course-cousre-tag">
            <ul>
              {courseDetail?.key_learnings
                ?.filter((learning) => learning.trim() !== '')
                .map((learning, index) => (
                  <li key={index + 1}>{capitalizeFirstLetter(learning)}</li>
                ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <Button
          variants="black"
          small
          className="mt-5"
          onClickHandler={() => startCourseNow()}
          isLoading={isLoading}
          disabled={
            courseDetail?.course_user_tracking &&
            courseDetail?.course_user_tracking?.length > 0
          }
        >
          {courseDetail?.course_user_tracking &&
          courseDetail?.course_user_tracking?.length > 0
            ? t('CourseManagement.CoursePreview.CourseDetails.StartedButton')
            : t('CourseManagement.CoursePreview.CourseDetails.StartNowButton')}
        </Button>

        <div className="participants-wrapper">
          <div className="participants-item">
            <p>
              {t('CourseManagement.CoursePreview.CourseDetails.MinimumParticipants')}
            </p>
            <span>{courseDetail?.min_participants}</span>
          </div>
          <div className="participants-item">
            <p>
              {t('CourseManagement.CoursePreview.CourseDetails.MaximumParticipants')}
            </p>
            <span>{courseDetail?.max_participants}</span>
          </div>
        </div>
        {user?.role?.role === Roles.Student ? (
          <Button
            variants="black"
            small
            className="mt-5"
            onClickHandler={() => startCourseNow()}
            isLoading={isLoading}
            disabled={
              courseDetail?.course_user_tracking &&
              courseDetail?.course_user_tracking?.length > 0
            }
          >
            {courseDetail?.course_user_tracking &&
            courseDetail?.course_user_tracking?.length > 0
              ? t('CourseManagement.CoursePreview.CourseDetails.StartedButton')
              : t('CourseManagement.CoursePreview.CourseDetails.StartNowButton')}
          </Button>
        ) : (
          ''
        )}
      </div>
      <div className="student-course-sort-video">
        {courseDetail?.cover_video && (
          <>
            <h4>{t('CourseManagement.CoursePreview.CourseDetails.PreviewVideo')}</h4>
            <div className="student-course-overview-video">
              {/* <div className="video-overlay">
                <Image iconName="playButtonRound" />
              </div> */}
              <VideoPlayer
                src={courseDetail?.cover_video}
                title={courseDetail?.title}
                poster={courseDetail?.cover_image}
                srt_file={courseDetail?.srt_file_path}
                isFromDatabase
              />
            </div>
          </>
        )}
        {/* Here the content in subscription card is static as of now but after the data came the data will be dynamic so the translation of it is not done yet */}
        <div className="subscription-card">
          <div className="subscription-duration">6 Months</div>
          <p className="subscription-text">Monthly self-paced ASL courses</p>
          <span className="subscription-sub-text">
            Access to the full Self paced courses for{' '}
          </span>
          <p className="subscription-price">$120.00</p>
        </div>
      </div>
      {courseDetail?.type.type !== CourseTypeEnum.SELF_PACED_COURSES && (
        <>
          <div className="student-course-physical">
            <div className="student-course-schedule">
              <label className="student-course-physical-title">
                {t('CourseManagement.CoursePreview.CourseDetails.ClassSchedule')}
              </label>
              <div className="student-course-physical-datails">
                <div className="student-course-host user-profile-data">
                  <div className="user-profile-image">
                    <Image src="./images/blog-1.png" isFromDataBase={false} />
                  </div>
                  {/* as teacher profile things is remaining that's why it is static but it will be dynamic in future */}
                  <div className="user-profile-name">Stephanie Zornoza</div>
                </div>
                <div className="student-course-other-details">
                  {course_type === CourseTypeEnum.ZOOM_CLASS && (
                    <div className="student-course-other-item">
                      <div className="icon">
                        <Image
                          iconName="videoRecord"
                          iconClassName="w-full h-full stroke-[0.8px]"
                        />
                      </div>
                      <div className="content">
                        <p>
                          {t(
                            'CourseManagement.CoursePreview.CourseDetails.ZoomLink'
                          )}
                        </p>
                        <Link to={courseDetail?.zoom_link ?? ''}>
                          {courseDetail?.zoom_link}
                        </Link>
                        <Button variants="black" small className="mt-2">
                          <Image iconName="shareIcon" iconClassName="w-4 mr-1" />{' '}
                          {t(
                            'CourseManagement.CoursePreview.CourseDetails.ShareLink'
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="student-course-other-item">
                    <div className="icon">
                      <Image iconName="clock" iconClassName="w-full h-full" />
                    </div>
                    <div className="content">
                      <p>{t('CourseManagement.CoursePreview.CourseDetails.Time')}</p>
                      <span>
                        {courseDetail?.start_time
                          ? format(
                              parse(courseDetail.start_time, 'HH:mm:ss', new Date()),
                              'h:mm a'
                            )
                          : 'N/A'}{' '}
                        -{' '}
                        {courseDetail?.end_time
                          ? format(
                              parse(courseDetail.end_time, 'HH:mm:ss', new Date()),
                              'h:mm a'
                            )
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="student-course-other-item">
                    <div className="icon">
                      <Image iconName="calendar" iconClassName="w-full h-full" />
                    </div>
                    <div className="content">
                      <p>
                        {t(
                          'CourseManagement.CoursePreview.CourseDetails.ClassDates'
                        )}
                      </p>
                      <span>
                        {courseDetail?.start_date} - {courseDetail?.end_date}
                      </span>
                      <span>{format(new Date(), 'MMM yyyy')}</span>
                      <ul>{classDates?.map((date) => <li>{date}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isAddress && (
              <div className="student-course-address">
                <label className="student-course-physical-title">
                  {t('CourseManagement.CoursePreview.CourseDetails.Address')}
                </label>
                <div className="student-course-address-box">
                  <span className="address-lable">
                    {t('CourseManagement.CoursePreview.CourseDetails.AddressLine')}
                  </span>
                  <p className="student-course-address-text">
                    {`${courseDetail?.address}, ${courseDetail?.city}, ${courseDetail?.country}, ${courseDetail?.zip_code}`}
                  </p>
                  <Button className="direction-icon">
                    <Image iconName="direction" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  ) : (
    <Loaders type="Spin" />
  );
};

export default CourseDetails;
