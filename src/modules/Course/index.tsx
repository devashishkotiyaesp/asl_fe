import Table from 'components/Table/Table';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';

import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { useAxiosGet } from 'hooks/useAxios';
import { useTranslation } from 'react-i18next';
import { CourseList } from './types/course.type';

const Course = () => {
  const [getApi] = useAxiosGet();
  const { t } = useTranslation();
  const [totalPages, setTotalPages] = useState<number>(0);
  const { currentPage } = useSelector(currentPageSelector);
  const [courses, setCourses] = useState<CourseList[] | null>(null);

  const getCourses = async () => {
    const response = await getApi('/courses/all', {
      params: {
        page: currentPage,
        limit: 10,
      },
    });
    setTotalPages(response?.data?.totalPages);
    setCourses(response?.data?.courses);
  };

  useEffect(() => {
    getCourses();
  }, [currentPage]);

  const coloumData = [
    {
      header: 'No.',
      option: { isIndex: true },
    },
    { header: t('Course.Table.CourseName'), name: 'name' },
    { header: t('Course.Table.CourseLevel'), name: 'course_level' },
    {
      header: t('Course.Table.CourseType'),
      name: 'course_type',
    },
    { header: t('Course.Table.Students'), name: 'student_count' },
    {
      header: t('Course.Table.Publish_Unpublish'),
      name: 'status',
    },
    {
      header: 'Action',
    },
  ];

  return (
    <div className="relative">
      <PageHeader title={t('Courses.Title')}>
        <div className="flex gap-4">
          <SearchComponent parentClass="min-w-[300px]" placeholder="Search.." />
        </div>
      </PageHeader>
      <Table
        headerData={coloumData}
        bodyData={courses || []}
        pagination
        totalPage={totalPages}
      />
    </div>
  );
};

export default Course;
