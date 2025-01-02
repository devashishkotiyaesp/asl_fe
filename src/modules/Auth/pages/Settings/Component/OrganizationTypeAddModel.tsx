import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import { Modal } from 'components/Modal/Modal';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { typeValidationSchema } from 'modules/Auth/validationSchema';

const OrganizationTypeAddModel = ({ OnSubmit, modal, data }: any) => {
  return (
    <Modal
      width="max-w-[600px]"
      headerTitle={
        data.slug !== ''
          ? t('OrganizationType.Form.Title.Type')
          : t('OrganizationType.Button.Add')
      }
      modal={modal}
      closeOnOutsideClick
      closeOnEscape
      modalClassName="learn-asl-modal"
    >
      <div>
        <Formik
          initialValues={data}
          enableReinitialize
          validationSchema={typeValidationSchema()}
          onSubmit={(values) => OnSubmit(values)}
        >
          {({ values }) => {
            return (
              <Form className="student-profile-form">
                <InputField
                  label={t('OrganizationType.Table.Column.Type')}
                  placeholder={t('OrganizationType.Form.PlaceHolder.Type')}
                  name="type"
                  value={values.type}
                />
                <div className="btn-wrap">
                  <Button
                    onClickHandler={() => modal.closeModal()}
                    type="button"
                    variants="OffWhite"
                    className="w-fit"
                    value={`${t('Settings.cancel')}`}
                  />

                  <Button
                    variants="black"
                    type="submit"
                    className="w-fit"
                    value={
                      data.slug !== ''
                        ? `${t('Settings.update')}`
                        : `${t('Settings.submit')}`
                    }
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default OrganizationTypeAddModel;
