// ** Components **
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';

// ** Constants & Enums **
import { Roles } from 'constants/common.constant';
import { CourseVisibilityEnum } from 'modules/Course/Admin/constants';

// ** Hooks **
import { useTranslation } from 'react-i18next';

// ** Types **
import { FormikValues } from 'formik';
import { SetFieldValue } from 'types';
import {
  CourseVisibilityField,
  PrivacyCardProps,
} from '../../types/courseVisibilitySetting.types';

const PrivacySettingCard = ({
  setSelectedUsers,
  setIsAllSelected,
  values,
  setFieldValue,
  setRole,
  isEdit,
}: PrivacyCardProps) => {
  const handleCheckboxChange = (
    name: keyof CourseVisibilityField,
    value: string,
    values: FormikValues,
    setFieldValue: SetFieldValue
  ) => {
    if (name === 'is_public' && value === 'true') {
      setFieldValue('is_public', values.is_public === value ? 'false' : value);
      setFieldValue('can_teacher_view', '');
      setFieldValue('visibility_to', '');
      setSelectedUsers([]);
      setIsAllSelected(false);
    } else if (name === 'can_teacher_view') {
      setFieldValue(
        'can_teacher_view',
        values.can_teacher_view === value ? '' : value
      );
      setFieldValue('is_public', 'false');
    } else if (name === 'visibility_to') {
      setFieldValue('visibility_to', values.visibility_to === value ? '' : value);
      setFieldValue('is_public', 'false');
      setSelectedUsers([]);
      setIsAllSelected(false);
    }
  };

  const { t } = useTranslation();

  return (
    <Card isGray className="add-general-course">
      <div className="course-card-title mb-5">
        {t('PrivacySettingCard.Card.Title')}
      </div>

      <div className="general-course-privacy-table bg-white rounded-[5px] p-[30px]">
        <div className="bg-LightGray flex justify-between gap-[30px] py-2.5 px-5 rounded-[5px] text-[17px] font-bold mb-4">
          <p>{t('PrivacySettingCard.Table.Header.Users')}</p>
          <p className="shrink-0 min-w-[120px] text-center">
            {t('PrivacySettingCard.Table.Header.CourseVisibility')}
          </p>
        </div>
        <div className="grid gap-[6px]">
          {isEdit && values.is_public !== 'true' ? (
            <></>
          ) : (
            <div className="bg-white py-2.5 px-5 rounded-[5px] text-[18px] flex justify-between gap-[30px] border border-LightGray">
              <div className="leading-none">
                {t('PrivacySettingCard.Table.Row.Public')}
              </div>
              <div className="shrink-0 min-w-[120px] text-center flex justify-center">
                <Checkbox
                  name="is_public"
                  value="true"
                  check={values.is_public === 'true'}
                  disabled={isEdit}
                  onChange={() => {
                    setRole('');
                    handleCheckboxChange('is_public', 'true', values, setFieldValue);
                  }}
                />
              </div>
            </div>
          )}
          {isEdit && values.is_public === 'true' ? (
            <></>
          ) : (
            <>
              <div className="bg-white py-2.5 px-5 rounded-[5px] text-[18px] flex justify-between gap-[30px] border border-LightGray">
                <div className="leading-none">
                  {t('PrivacySettingCard.Table.Row.TeachersOnly')}
                </div>
                <div className="shrink-0 min-w-[120px] text-center flex justify-center">
                  <Checkbox
                    name="can_teacher_view"
                    value="true"
                    check={values.can_teacher_view === 'true'}
                    disabled={isEdit && values.is_public === 'true'}
                    onChange={() =>
                      handleCheckboxChange(
                        'can_teacher_view',
                        'true',
                        values,
                        setFieldValue
                      )
                    }
                  />
                </div>
              </div>
              {isEdit && values.visibility_to !== Roles.Organization ? (
                <></>
              ) : (
                <div className="bg-white py-2.5 px-5 rounded-[5px] text-[18px] flex justify-between gap-[30px] border border-LightGray">
                  <div className="leading-none">
                    {t('PrivacySettingCard.Table.Row.SpecificOrganization')}
                  </div>
                  <div className="shrink-0 min-w-[120px] text-center flex justify-center">
                    <Checkbox
                      name="visibility_to"
                      value={CourseVisibilityEnum.Organization}
                      check={
                        values.visibility_to === CourseVisibilityEnum.Organization
                      }
                      disabled={
                        isEdit &&
                        (values.is_public === 'true' || values.visibility_to !== '')
                      }
                      onChange={() => {
                        setRole(Roles.Organization);
                        handleCheckboxChange(
                          'visibility_to',
                          CourseVisibilityEnum.Organization,
                          values,
                          setFieldValue
                        );
                      }}
                    />
                  </div>
                </div>
              )}
              {isEdit && values.visibility_to !== Roles.Student ? (
                <>vbfrhyfrytjut</>
              ) : (
                <div className="bg-white py-2.5 px-5 rounded-[5px] text-[18px] flex justify-between gap-[30px] border border-LightGray">
                  <div className="leading-none">
                    {t('PrivacySettingCard.Table.Row.Students')}
                  </div>
                  <div className="shrink-0 min-w-[120px] text-center flex justify-center">
                    <Checkbox
                      name="visibility_to"
                      value={CourseVisibilityEnum.Student}
                      check={values.visibility_to === CourseVisibilityEnum.Student}
                      disabled={
                        isEdit &&
                        (values.is_public === 'true' || values.visibility_to !== '')
                      }
                      onChange={() => {
                        setRole(Roles.Student);
                        handleCheckboxChange(
                          'visibility_to',
                          CourseVisibilityEnum.Student,
                          values,
                          setFieldValue
                        );
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PrivacySettingCard;
