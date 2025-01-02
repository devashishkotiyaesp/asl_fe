import DynamicFilter from 'components/TableFilter';
import { FilterConfig, FilterValues } from 'components/TableFilter/types';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useCommonAslLevel,
  useCommonCourseCategory,
  useCommonCourseTypes,
} from '../../common/hooks';

interface AdminFilterProps {
  handleFilterChange: (values: FilterValues) => void;
  filterValues: FilterValues;
}

const AdminFilter: FC<AdminFilterProps> = ({ handleFilterChange, filterValues }) => {
  const { t } = useTranslation();
  const courseAslLevel = useCommonAslLevel();
  const courseCategory = useCommonCourseCategory();
  const { courseTypes } = useCommonCourseTypes();

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
    {
      type: 'radio',
      label: t('CourseManagement.Filter.CoursePublishStatus'),
      key: 'is_published',
      options: [
        { label: t('CourseManagement.Filter.PublishedLabel'), value: 'published' },
        {
          label: t('CourseManagement.Filter.UnpublishedLabel'),
          value: 'unpublished',
        },
      ],
    },
    {
      type: 'checkbox',
      label: t('CourseManagement.Filter.CourseType'),
      key: 'course_type',
      multiple: true,
      options: courseTypes || [],
    },
  ];
  return (
    <DynamicFilter
      configs={filterConfigs}
      initialValues={filterValues}
      onChange={handleFilterChange}
    />
  );
};

export default AdminFilter;
