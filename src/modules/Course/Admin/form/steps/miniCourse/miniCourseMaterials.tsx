import Button from 'components/Button/Button';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { updateParamActiveStep } from '../../helper/form.helper';
import { CourseBasicDetailDataTypes } from '../../types';
import LessonListing from '../selfPaced/components/LessonListing';

export interface MiniCourseMaterialProps {
  initialData: { data: CourseBasicDetailDataTypes };
  // onSubmit: (data: ModuleFormValues) => void;
}

const MiniCourseMaterial: FC<MiniCourseMaterialProps> = ({ initialData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(initialData);

  return (
    <>
      <LessonListing />

      <div className="btn-wrap">
        <Button
          variants="PrimaryWoodBorder"
          onClickHandler={() => updateParamActiveStep(false, navigate)}
        >
          {t('CourseManagement.AddEditForm.PreviousButtonText')}
        </Button>
        <Button variants="PrimaryWood">
          {t('CourseManagement.AddEditForm.PreviewButtonText')}
        </Button>
        <Button
          variants="blackBorder"
          onClickHandler={() => {
            navigate(
              `/courses/view/${initialData?.data?.slug}?course_type=${initialData?.data?.type}`
            );
          }}
        >
          {t('CourseManagement.AddEditForm.DraftButtonText')}
        </Button>
        <Button variants="black">
          {t('CourseManagement.AddEditForm.NextButtonText')}
        </Button>
      </div>
    </>
  );
};

export default MiniCourseMaterial;
