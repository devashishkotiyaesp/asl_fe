import Button from 'components/Button/Button';
import Switch from 'components/FormElement/Switch';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import DraggableRowTable from 'components/Table/DraggableRowTable';
import { CellProps, ITableHeaderProps } from 'components/Table/types';
import {
  useAxiosGet,
  useAxiosPatch,
  useAxiosPost,
  useAxiosPut,
} from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import _ from 'lodash';
import {
  ILessonResponse,
  ILessonsItem,
} from 'modules/Course/common/types/course.type';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import Quiz from '../../../components/Quiz';
import { getQueryParams } from '../../../helper/form.helper';
import AddEditLesson from './AddEditLesson';
import ModuleListing from './ModuleListing';

interface LessonListingProps {
  isViewMode?: {
    value: boolean;
    course_module_id: string | null;
    module_name: string;
    module_slug: string | null;
    module_common_id?: string | null;
  };
}
const LessonListing: FC<LessonListingProps> = ({ isViewMode }) => {
  const { slug: course_slug } = useParams();
  const navigate = useNavigate();
  const [getApi, { isLoading: isLoadingGetApi }] = useAxiosGet();
  const [updateLesson] = useAxiosPatch();
  const addEditLesson = useModal();
  const addQuiz = useModal();
  const duplicateLessonModal = useModal();
  const [duplicateLessonApi, { isLoading: duplicationgLesson }] = useAxiosPost();
  const [lessons] = useState<ILessonResponse>();
  const [lessonList, setLessonList] = useState<ILessonsItem[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<ILessonsItem>();
  const [sort, setSort] = useState<string>('sort_order');
  const [lessonSortOrder, setLessonSortOrder] = useState<number>(1);
  const [isLessonListing, setIsLessonListing] = useState<boolean>(true);
  const { language_id } = getQueryParams();
  const { course_module_id, module_name, value, module_slug, module_common_id } =
    isViewMode || {};
  const [sendOrder] = useAxiosPut();
  const defaultLanguage = useSelector(useLanguage).allLanguages?.find(
    (item) => item.short_name === 'en'
  )?.id;

  const getListLessons = async () => {
    const { data, error } = await getApi('/courses/lesson/all', {
      params: {
        sort,
        ...(module_slug ? { module_slug } : {}),
        course_slug,
        language_id,
        view: true,
      },
    });
    if (data && !error) {
      setLessonList(data.data);
      const length = _.isNumber(data?.data?.length) ? data?.data?.length : 0;
      setLessonSortOrder(length + 1);
    }
  };

  useEffect(() => {
    getListLessons();
  }, [language_id]);

  const sendArrangeRowData = async (draggedRow: CellProps) => {
    await sendOrder(`/courses/lesson/order/${draggedRow?.id}`, {
      sort_order: draggedRow?.sort_order,
      ...(language_id ? { language_id } : {}),
    });
  };

  const QuizStatus = (props: ILessonsItem) => {
    return (
      <Button
        variants={props?.quiz_exist ? 'PrimaryWoodLightBorder' : 'PrimaryWoodLight'}
        onClickHandler={() => {
          setSelectedLesson(props);
          addQuiz.openModal();
        }}
      >
        {props?.quiz_exist
          ? t('CourseManagement.AddEditForm.Module.Table.ViewQuiz')
          : t('CourseManagement.AddEditForm.Module.Table.AddQuiz')}
      </Button>
    );
  };

  const handleEditClick = (props: ILessonsItem) => {
    setSelectedLesson(props);
    addEditLesson.openModal();
  };

  const actionRender = (actionProps: ILessonsItem) => (
    <div className="flex flex-wrap gap-4">
      <Button
        className="action-button green"
        onClickHandler={() =>
          navigate(`/courses/${course_slug}/lesson/${actionProps.common_id}`)
        }
      >
        <Image iconName="eyeIcon" />
      </Button>
      <Button
        className="action-button blue"
        onClickHandler={() => handleEditClick(actionProps)}
      >
        <Image iconName="editpen2" />
      </Button>
      <Button
        className="action-button primary"
        onClickHandler={() => {
          setSelectedLesson(actionProps);
          duplicateLessonModal.openModal();
        }}
      >
        <Image iconName="copyFile" />
      </Button>
      <label className="relative inline-flex items-center cursor-pointer">
        <Switch
          checked={actionProps.is_active ?? false}
          onChangeHandler={() => handleSwitchChanges(actionProps)}
        />
      </label>
    </div>
  );

  const handleSwitchChanges = async (module: ILessonsItem) => {
    const { error } = await updateLesson(`/courses/lesson/toggle-status`, {
      is_active: !module.is_active,
      common_id: module.common_id,
    });
    if (!error) {
      setLessonList((prev) => {
        const data =
          prev?.map((item) => {
            if (item.id === module.id) {
              return { ...item, is_active: !module.is_active };
            }
            return item;
          }) ?? [];
        return data;
      });
    }
  };

  const CoverImage = (props: ILessonsItem) => (
    <div className="flex flex-wrap gap-4">
      <Image
        src={(props?.banner_image as string) ?? '/images/no-image.png'}
        imgClassName="w-16 h-16"
      />
    </div>
  );

  const columnData: ITableHeaderProps[] = [
    { header: 'No.', option: { isIndex: true } },
    {
      header: t('CourseManagement.AddEditForm.Lesson.Table.Image'),
      name: 'lesson_banner_image',
      cell: (props) => CoverImage(props as unknown as ILessonsItem),
    },
    {
      header: t('CourseManagement.AddEditForm.Lesson.Table.LessonName'),
      name: 'title',
    },
    {
      header: t('CourseManagement.AddEditForm.Lesson.Table.Quizzes'),
      name: 'quiz_exists',
      cell: (props) => QuizStatus(props as unknown as ILessonsItem),
    },
    {
      header: t('CourseManagement.AddEditForm.Lesson.Table.Action'),
      cell: (props) => actionRender(props as unknown as ILessonsItem),
    },
  ];

  const handleDuplicateLesson = async (lesson: ILessonsItem) => {
    const { error } = await duplicateLessonApi(
      `/courses/lesson/duplicate/${lesson.common_id}`,
      {}
    );
    if (!error) {
      getListLessons();
    }
    duplicateLessonModal.closeModal();
  };

  return (
    <>
      {isLessonListing ? (
        <>
          <div className="module-add-head-wrap mt-8">
            {isViewMode?.value && (
              <Button
                onClickHandler={() => setIsLessonListing(false)}
                variants="PrimaryWoodLightBorder"
              >
                <Image iconName="arrowLeftStrokeSD" />
                Back Modules
              </Button>
            )}
            <span className="module-add-head-title mx-auto">
              {value ? module_name : 'Course with Lessons'}
            </span>
            {defaultLanguage === language_id ? (
              <Button
                className="w-fit"
                variants="black"
                onClickHandler={() => {
                  setSelectedLesson(undefined);
                  addEditLesson.openModal();
                }}
              >
                {t('CourseManagement.AddEditForm.AddEditLesson.ButtonText')}
              </Button>
            ) : (
              <div className="min-w-[130px]" />
            )}
          </div>
          <DraggableRowTable
            headerData={columnData}
            bodyData={lessonList || []}
            loader={isLoadingGetApi}
            totalPage={lessons?.lastPage}
            dataCount={lessons?.count}
            setSort={setSort}
            sort={sort}
            handleDragRow={sendArrangeRowData}
          />
        </>
      ) : (
        <ModuleListing />
      )}

      {addQuiz.isOpen && (
        <Quiz
          lesson_common_id={selectedLesson?.common_id}
          refetchData={getListLessons}
          module_common_id={module_common_id as string | undefined}
          common_id={selectedLesson?.quiz?.[0]?.common_id}
          slug={selectedLesson?.quiz?.[0]?.slug}
          addQuiz={addQuiz}
        />
      )}
      {addEditLesson.isOpen && (
        <AddEditLesson
          modal={addEditLesson}
          refetch={getListLessons}
          selectedLesson={selectedLesson}
          course_module_id={course_module_id ?? null}
          module_common_id={module_common_id}
          lessonSortOrder={lessonSortOrder}
        />
      )}
      <ConfirmationPopup
        showCloseIcon
        modal={duplicateLessonModal}
        deleteTitle={t('Course.Table.ConfirmationPopup.DuplicateLessonTitle')}
        bodyText={t('Course.Table.ConfirmationPopup.DuplicateLessonBody')}
        cancelButtonText={t('Course.Table.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Course.Table.ConfirmationPopup.DuplicateCourse')}
        cancelButtonFunction={() => duplicateLessonModal.closeModal()}
        confirmButtonFunction={() => {
          handleDuplicateLesson(selectedLesson as ILessonsItem);
        }}
        isLoading={duplicationgLesson}
        popUpType="info"
      />
    </>
  );
};

export default LessonListing;
