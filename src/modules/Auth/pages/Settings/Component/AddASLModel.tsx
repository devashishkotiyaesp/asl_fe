import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import { Modal } from 'components/Modal/Modal';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { editValidationSchema } from 'modules/Auth/validationSchema';

const AddAslModel = ({ OnSubmit, modal, data }: any) => {
  return (
    <Modal
      width="max-w-[600px]"
      headerTitle={
        data.id !== ''
          ? `${t('Settings.table.editButton')}`
          : `${t('Settings.table.addButton')}`
      }
      modal={modal}
      closeOnOutsideClick
      closeOnEscape
      modalClassName="learn-asl-modal"
    >
      <>
        <Formik
          initialValues={data}
          enableReinitialize
          validationSchema={editValidationSchema()}
          onSubmit={(values) => OnSubmit(values)}
        >
          {({ values }) => {
            return (
              <Form className="student-profile-form">
                <InputField
                  label={`${t('Settings.table.level')}`}
                  name="level"
                  value={values.level}
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
                      data.id !== ''
                        ? `${t('Settings.update')}`
                        : `${t('Settings.submit')}`
                    }
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </>
    </Modal>
  );
};

export default AddAslModel;
