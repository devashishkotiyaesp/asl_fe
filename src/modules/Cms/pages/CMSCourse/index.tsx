// ** Components **
import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import CMSCourseList from './CMSCourseList';
import CourseBanner from './CourseBanner';

//  ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';

// ** Slices **
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';

// ** Types **
import { formatCMSObjectData } from '../HomeCMS/helper';
import { CmsSectionDataProps } from '../HomeCMS/types';
import { CourseDataProps } from './types';

// ** Utils **
import { REACT_APP_API_URL } from 'config';
import _ from 'lodash';
import { CMSEnum } from 'modules/CmsAdmin/constants';

const CMSCourse = () => {
  const { language } = useSelector(useLanguage);
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const [courseData, setCourseData] = useState<CourseDataProps>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.Courses,
      },
    });
    setIsLoading(apiLoading);
    setResponseData(data?.data);
  };
  useEffect(() => {
    fetchData();
  }, [language]);

  useEffect(() => {
    const courseData = !_.isUndefined(responseData?.courses)
      ? formatCMSObjectData({ data: responseData?.courses ?? [] })
      : {};
    setCourseData(courseData as unknown as CourseDataProps);
  }, [responseData]);

  return (
    <>
      {isLoading && !responseData?.data ? (
        <Image loaderType="Spin" />
      ) : (
        responseData &&
        courseData && (
          <>
            <CourseBanner
              courseData={courseData.point_data_array?.[0] ?? {}}
              title_hashing={courseData?.title_hashing}
            />

            <CMSCourseList point_data_array={courseData?.point_data_array} />
            <CMSCTA
              variant="2"
              linkText={courseData?.button_text ?? ''}
              leftImagePath={courseData?.banner_image}
              title={courseData?.eyebrow_title ?? ''}
              isFormDataBase
            />
            <GlobalSection />
          </>
        )
      )}
    </>
  );
};

export default CMSCourse;
