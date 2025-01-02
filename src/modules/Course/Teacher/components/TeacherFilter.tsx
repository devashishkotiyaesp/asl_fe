import DynamicFilter from 'components/TableFilter';
import { FilterConfig, FilterValues } from 'components/TableFilter/types';
import {
  useCommonAslLevel,
  useCommonCourseCategory,
} from 'modules/Course/common/hooks';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface TeacherFilterProps {
  handleFilterChange: (values: FilterValues) => void;
  filterValues: FilterValues;
  //   showAll: boolean;
}

const TeacherFilter: FC<TeacherFilterProps> = ({
  handleFilterChange,
  filterValues,
}) => {
  const { t } = useTranslation();
  const courseAslLevel = useCommonAslLevel();
  const courseCategory = useCommonCourseCategory();

  const filterConfigs: FilterConfig[] = [
    {
      type: 'checkbox',
      label: t('CourseManagement.Filter.CourseCategory'),
      key: 'course_category',
      options: courseCategory || [],
    },
    {
      type: 'checkbox',
      label: t('CourseManagement.Filter.CourseLevel'),
      key: 'asl_level',
      options: courseAslLevel || [],
    },
  ];
  return (
    <>
      <DynamicFilter
        configs={filterConfigs}
        initialValues={filterValues}
        onChange={handleFilterChange}
      />
    </>
  );
};

export default TeacherFilter;
