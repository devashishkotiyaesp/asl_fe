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
  IModulesItem,
  IModulesResponse,
} from 'modules/Course/common/types/course.type';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import Quiz from '../../../components/Quiz';
import { getQueryParams } from '../../../helper/form.helper';
import AddEditModule from './AddEditModule';
import LessonListing from './LessonListing';

const ModuleListing = () => {
  const [getApi, { isLoading: isLoadingGetApi }] = useAxiosGet();
  const addEditModule = useModal();
  const addQuiz = useModal();
  const duplicateModuleModal = useModal();
  const [sendOrder] = useAxiosPut();
  const [updateModule] = useAxiosPatch();

  const [duplicateModuleApi, { isLoading: moduleDuplicating }] = useAxiosPost();
  const [moduleData, setModuleData] = useState<IModulesResponse>();
  const [isViewMode, setIsViewMode] = useState<{
    value: boolean;
    course_module_id: string | null;
    module_name: string;
    module_slug: string | null;
    module_common_id: string | null;
  }>({
    value: false,
    course_module_id: null,
    module_name: '',
    module_slug: null,
    module_common_id: null,
  });
  const [selectedModule, setSelectedModule] = useState<IModulesItem>();
  const [sort, setSort] = useState<string>('sort_order');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const { slug: course_slug } = useParams();
  const defaultLanguage = useSelector(useLanguage).allLanguages?.find(
    (item) => item.short_name === 'en'
  )?.id;

  const { language_id } = getQueryParams();
  const getListModules = async () => {
    const { data, error } = await getApi('/courses/module/all', {
      params: { sort, course_slug, view: true, language_id },
    });
    if (data && !error) {
      setModuleData(data);
      const length = _.isNumber(data?.data?.length) ? data?.data?.length : 0;
      setSortOrder(length + 1);
    }
  };

  useEffect(() => {
    getListModules();
  }, [language_id]);

  const sendArrangeRowData = async (draggedRow: CellProps) => {
    await sendOrder(`/courses/module/order/${draggedRow?.id}`, {
      sort_order: draggedRow.sort_order,
      ...(language_id ? { language_id } : {}),
    });
  };

  const QuizStatus = (props: IModulesItem) => {
    return (
      <Button
        variants={props?.quiz_exist ? 'PrimaryWoodLightBorder' : 'PrimaryWoodLight'}
        onClickHandler={() => {
          setSelectedModule(props);
          addQuiz.openModal();
        }}
      >
        {props?.quiz_exist
          ? t('CourseManagement.AddEditForm.Module.Table.ViewQuiz')
          : t('CourseManagement.AddEditForm.Module.Table.AddQuiz')}
      </Button>
    );
  };

  const handleEditClick = (props: IModulesItem) => {
    setSelectedModule(props);
    addEditModule.openModal();
  };

  const viewLesson = (moduleProps: IModulesItem) => {
    return (
      <Button
        variants="PrimaryWoodLightBorder"
        onClickHandler={() =>
          setIsViewMode({
            value: true,
            course_module_id: moduleProps.id ?? null,
            module_name: moduleProps.title,
            module_slug: moduleProps.slug ?? null,
            module_common_id: moduleProps.common_id ?? '',
          })
        }
      >
        {t('ModuleListing.Button.ViewLesson')}
      </Button>
    );
  };

  const actionRender = (actionProps: IModulesItem) => (
    <div className="flex flex-wrap gap-4">
      <Button
        className="action-button blue p-3"
        onClickHandler={() => handleEditClick(actionProps)}
      >
        <Image iconName="editpen2" iconClassName="w-full h-full" />
      </Button>
      <Button
        className="action-button primary"
        onClickHandler={() => {
          setSelectedModule(actionProps);
          duplicateModuleModal.openModal();
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

  const handleSwitchChanges = async (module: IModulesItem) => {
    const { error } = await updateModule(`/courses/module/toggle-status`, {
      is_active: !module.is_active,
      common_id: module.common_id,
    });
    if (!error) {
      setModuleData((prev) => {
        const data =
          prev?.data?.map((item) => {
            if (item.id === module.id) {
              return { ...item, is_active: !module.is_active };
            }
            return item;
          }) ?? [];
        return { ...prev, data };
      });
    }
  };

  const CoverImage = (props: IModulesItem) => (
    <div className="flex flex-wrap gap-4">
      <Image
        src={
          String(props?.cover_image).length > 0
            ? String(props?.cover_image)
            : '/images/no-image.png'
        }
        imgClassName="w-12 h-12 rounded"
      />
    </div>
  );

  const columnData: ITableHeaderProps[] = [
    { header: 'No.', option: { isIndex: true } },
    {
      header: t('CourseManagement.AddEditForm.Module.Table.Image'),
      name: 'cover_image',
      cell: (props) => CoverImage(props as unknown as IModulesItem),
    },
    {
      header: t('CourseManagement.AddEditForm.Module.Table.ModuleName'),
      name: 'title',
    },
    {
      header: t('CourseManagement.AddEditForm.Module.Table.NumberOfLessons'),
      name: 'lesson_count',
    },
    {
      header: t('CourseManagement.AddEditForm.Module.Table.Quizzes'),
      name: 'quiz_exists',
      cell: (props) => QuizStatus(props as unknown as IModulesItem),
    },
    {
      header: t('ModuleListing.Column.Lessons'),
      cell: (props) => viewLesson(props as unknown as IModulesItem),
    },
    {
      header: t('CourseManagement.AddEditForm.Module.Table.Action'),
      cell: (props) => actionRender(props as unknown as IModulesItem),
    },
  ];
  const handleDuplicateModule = async (module: IModulesItem) => {
    const { error } = await duplicateModuleApi(
      `courses/module/duplicate/${module.common_id}`,
      {}
    );
    if (!error) {
      getListModules();
    }
    duplicateModuleModal.closeModal();
  };
  return (
    <>
      {isViewMode.value && isViewMode.course_module_id !== null ? (
        <LessonListing isViewMode={isViewMode} />
      ) : (
        <>
          <div className="module-add-head-wrap">
            <span className="module-add-head-title">
              {t('CourseManagement.AddEditForm.Module.Table.ModuleTitle')}
            </span>
            {defaultLanguage === language_id && (
              <Button
                className="w-fit"
                variants="black"
                onClickHandler={() => {
                  setSelectedModule(undefined);
                  addEditModule.openModal();
                }}
              >
                {t('CourseManagement.AddEditForm.AddEditModule.ButtonText')}
              </Button>
            )}
          </div>
          <DraggableRowTable
            headerData={columnData}
            bodyData={moduleData?.data ?? []}
            loader={isLoadingGetApi}
            totalPage={moduleData?.lastPage}
            dataCount={moduleData?.count}
            setSort={setSort}
            sort={sort}
            handleDragRow={sendArrangeRowData}
          />
        </>
      )}

      {addQuiz.isOpen && (
        <Quiz
          module_common_id={selectedModule?.common_id}
          refetchData={getListModules}
          slug={selectedModule?.quiz[0]?.slug}
          common_id={selectedModule?.quiz[0]?.common_id}
          addQuiz={addQuiz}
        />
      )}
      {addEditModule.isOpen && (
        <AddEditModule
          modal={addEditModule}
          refetch={getListModules}
          selectedModule={selectedModule}
          sortOrder={sortOrder}
        />
      )}
      <ConfirmationPopup
        showCloseIcon
        modal={duplicateModuleModal}
        deleteTitle={t('Course.Table.ConfirmationPopup.DuplicateModuleTitle')}
        bodyText={t('Course.Table.ConfirmationPopup.DuplicateModuleBody')}
        cancelButtonText={t('Course.Table.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Course.Table.ConfirmationPopup.DuplicateCourse')}
        cancelButtonFunction={() => duplicateModuleModal.closeModal()}
        confirmButtonFunction={() => {
          handleDuplicateModule(selectedModule as IModulesItem);
        }}
        isLoading={moduleDuplicating}
        popUpType="info"
      />
    </>
  );
};

export default ModuleListing;
