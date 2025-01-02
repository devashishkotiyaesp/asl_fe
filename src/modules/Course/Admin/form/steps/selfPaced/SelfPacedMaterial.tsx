import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { updateParamActiveStep } from '../../helper/form.helper';
import { CourseBasicDetailDataTypes, SelfPacedModuleTypes } from '../../types';
import LessonListing from './components/LessonListing';
import ModuleListing from './components/ModuleListing';

export interface SelfPacedMaterialProps {
  initialData: { data: CourseBasicDetailDataTypes };
  onSubmit: (data: SelfPacedModuleTypes) => void;
  isLoading: boolean;
}

const SelfPacedMaterial: FC<SelfPacedMaterialProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = initialData;
  const [materialType, setMaterialType] = useState<boolean | null>(
    data.has_modules ?? true
  );

  return (
    <>
      {(data.has_modules === undefined || data.has_modules === null) && (
        <div className="select-module-wrap">
          <div className="select-module-item">
            <Checkbox
              id="Modules"
              reverse
              text={t('CourseManagement.AddEditForm.ModuleText')}
              onChange={() => setMaterialType(true)}
              check={materialType === true}
            />
          </div>
          <div className="select-module-item">
            <Checkbox
              id="Lessons"
              reverse
              text={t('CourseManagement.AddEditForm.LessonText')}
              onChange={() => setMaterialType(false)}
              check={materialType === false}
            />
          </div>
        </div>
      )}

      {materialType || data.has_modules ? <ModuleListing /> : <LessonListing />}

      <div className="btn-wrap">
        <Button
          variants="PrimaryWoodBorder"
          onClickHandler={() => updateParamActiveStep(false, navigate)}
        >
          {t('CourseManagement.AddEditForm.PreviousButtonText')}
        </Button>
        <Button
          variants="PrimaryWood"
          onClickHandler={() => {
            navigate(`/courses/view/${data?.slug}?course_type=${data?.type?.type}`);
          }}
        >
          {t('CourseManagement.AddEditForm.PreviewButtonText')}
        </Button>
        <Button variants="blackBorder">
          {t('CourseManagement.AddEditForm.DraftButtonText')}
        </Button>
        <Button
          variants="black"
          isLoading={isLoading}
          disabled={isLoading}
          onClickHandler={() => onSubmit({ has_modules: materialType })}
        >
          {t('CourseManagement.AddEditForm.NextButtonText')}
        </Button>
      </div>
    </>
  );
};

export default SelfPacedMaterial;
