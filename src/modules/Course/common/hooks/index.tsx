import { useAxiosGet } from 'hooks/useAxios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCommonAslLevel,
  getCommonCourseCategory,
  getCommonCourseTypes,
  setCommonAslLevel,
  setCommonCourseCategory,
  setCommonCourseTypes,
} from 'reduxStore/slices/courseCommonSlice';

export const useCommonAslLevel = () => {
  const [getApi] = useAxiosGet();
  const dispatch = useDispatch();
  const aslLevel = useSelector(getCommonAslLevel);
  // const [returnData, setReturnData] = useState();

  useEffect(() => {
    getASLLevelData();
  }, []);

  const getASLLevelData = async () => {
    if (aslLevel?.length === 0) {
      const { data, error } = await getApi('/asl', {
        params: {
          dropdown: true,
        },
      });
      if (data && !error) {
        dispatch(setCommonAslLevel(data));
      }
    }
  };

  return aslLevel;
};

export const useCommonCourseCategory = () => {
  const [getApi] = useAxiosGet();
  const dispatch = useDispatch();
  const courseCategory = useSelector(getCommonCourseCategory);

  useEffect(() => {
    getCourseCategoryData();
  }, []);

  const getCourseCategoryData = async () => {
    if (courseCategory?.length === 0) {
      const { data, error } = await getApi('/course-category', {
        params: {
          dropdown: true,
        },
      });
      if (data && !error) {
        dispatch(setCommonCourseCategory(data));
      }
    }
  };

  return courseCategory;
};

export const useCommonCourseTypes = () => {
  const [getApi, { isLoading }] = useAxiosGet();
  const dispatch = useDispatch();
  const courseTypes = useSelector(getCommonCourseTypes);

  useEffect(() => {
    getCourseTypeData();
  }, []);

  const getCourseTypeData = async () => {
    if (courseTypes.length === 0) {
      const { data, error } = await getApi('/courses/all-type', {
        params: {
          dropdown: true,
        },
      });
      if (data && !error) {
        dispatch(setCommonCourseTypes(data));
      }
    }
  };

  return { courseTypes, isLoading };
};
