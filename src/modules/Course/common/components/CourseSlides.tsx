import Image from 'components/Image';
import MyCourseCard from 'components/MyCourseCard';
import { CourseTypeEnum, Roles } from 'constants/common.constant';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ICourse } from '../types/courseList.type';

interface CourseSlidesProps {
  courseType: string;
  courses: ICourse[];
  idx: number;
}

const CourseSlides: React.FC<CourseSlidesProps> = ({ courseType, courses, idx }) => {
  const navigate = useNavigate();
  const isTeacher = useSelector(getCurrentUser)?.role?.role === Roles.Teacher;

  const renderCourseSlides = (courseType: string, courses: ICourse[]) => {
    switch (courseType) {
      case CourseTypeEnum.SELF_PACED_COURSES:
        return courses.map((course: ICourse, idx: number) => (
          <SwiperSlide key={idx + 1}>
            <MyCourseCard
              imgOverlay
              isTagInside
              tag={course?.courseCategory?.name}
              variant="white"
              title={course.title}
              imagePath={course.cover_image ?? './images/blog-1.png'}
              onClickCard={() =>
                navigate(
                  `/courses/view/${course?.slug}/${course.common_id}?course_type=${course.type.type}`
                )
              }
              editCourseClick={
                isTeacher && course.is_edit_access
                  ? (e) => {
                      e.stopPropagation();
                      navigate(
                        `/courses/${course?.common_id}/${course?.slug}?lang=${course.language_id}&course_id=${course.id}&step=1`
                      );
                    }
                  : undefined
              }
            />
          </SwiperSlide>
        ));

      case CourseTypeEnum.IN_PERSON_CLASS:
        return courses.map((course: ICourse, idx: number) => (
          <SwiperSlide key={idx + 1}>
            <MyCourseCard
              imgOverlay
              variant="white"
              title={course.title}
              tag={course?.courseCategory?.name}
              imagePath={course.cover_image ?? './images/blog-1.png'}
              authorImage="./images/profile.png"
              authorText="John Doe"
              onClickCard={() =>
                navigate(
                  `/courses/view/${course?.slug}/${course.common_id}?course_type=${course.type.type}`
                )
              }
              editCourseClick={
                isTeacher && course.is_edit_access
                  ? (e) => {
                      e.stopPropagation();
                      navigate(
                        `/courses/${course?.common_id}/${course?.slug}?course_id=${course.id}&step=1`
                      );
                    }
                  : undefined
              }
            />
          </SwiperSlide>
        ));

      case CourseTypeEnum.ZOOM_CLASS:
        return courses.map((course: ICourse, idx: number) => (
          <SwiperSlide key={idx + 1}>
            <MyCourseCard
              imgOverlay
              variant="white"
              title={course.title}
              tag={course?.courseCategory?.name}
              imagePath={course.cover_image ?? './images/blog-1.png'}
              authorImage="./images/profile.png"
              authorText="Jane Smith"
              onClickCard={() =>
                navigate(
                  `/courses/view/${course?.slug}/${course.common_id}?course_type=${course.type.type}`
                )
              }
              editCourseClick={
                isTeacher && course.is_edit_access
                  ? (e) => {
                      e.stopPropagation();
                      navigate(
                        `/courses/${course.common_id}/${course?.slug}?&course_id=${course.id}&step=1`
                      );
                    }
                  : undefined
              }
            />
          </SwiperSlide>
        ));

      case CourseTypeEnum.APPOINTMENTS:
        return courses.map((course: ICourse, idx: number) => (
          <SwiperSlide key={idx + 1}>
            <MyCourseCard
              imgOverlay
              variant="white"
              tag={course?.courseCategory?.name}
              title={course.title}
              imagePath={course.cover_image ?? './images/blog-1.png'}
              onClickCard={() =>
                navigate(
                  `/courses/view/${course?.slug}/${course.common_id}?course_type=${course.type.type}`
                )
              }
              editCourseClick={
                isTeacher && course.is_edit_access
                  ? (e) => {
                      e.stopPropagation();
                      navigate(
                        `/courses/${course.common_id}/${course?.slug}?course_id=${course.id}&step=1`
                      );
                    }
                  : undefined
              }
            />
          </SwiperSlide>
        ));

      default:
        return null;
    }
  };

  return (
    <div className="your-course-slider arrow-up">
      <div
        className={`swiper-button image-swiper-button-prev !z-[100]  image-swiper-button-prev-${idx + 1}`}
      >
        <Image iconName="arrowRight" />
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        speed={800}
        watchOverflow
        navigation={{
          prevEl: `.image-swiper-button-prev-${idx + 1} `,
          nextEl: `.image-swiper-button-next-${idx + 1}`,
          disabledClass: 'swiper-button-disabled',
        }}
        modules={[Navigation]}
        className="dict-slider"
      >
        {renderCourseSlides(courseType, courses)}
      </Swiper>
      <div
        className={`swiper-button image-swiper-button-next !z-[100]  image-swiper-button-next-${idx + 1}`}
      >
        <Image iconName="arrowRight" />
      </div>
    </div>
  );
};

export default CourseSlides;
