import Button from 'components/Button/Button';
import DatePicker from 'components/FormElement/datePicker';
import { parseISO } from 'date-fns';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentPageCount } from 'reduxStore/slices/paginationSlice';
import { FilterApplyProps, FilterNoteProps } from '../types';
import { NoteFilterValidationSchema } from '../validation';

const AuditLogFilter = ({
  setFilterModal,
  t,
  filterApply,
  setFilterApply,
}: FilterNoteProps) => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState<FilterApplyProps>({
    startDate: filterApply?.startDate ?? '',
    endDate: filterApply?.endDate ?? '',
  });
  useEffect(() => {
    if (filterApply) {
      setFormValue(filterApply);
    }
  }, [filterApply]);

  const handleSubmit = () => {
    setFilterApply(formValue);
    setFilterModal(false);
    dispatch(currentPageCount({ currentPage: 1 }));
  };

  return (
    <Formik
      initialValues={formValue}
      onSubmit={handleSubmit}
      validationSchema={NoteFilterValidationSchema()}
    >
      {({ setFieldValue }) => {
        return (
          <Form>
            <div>
              <div className="flex flex-col gap-y-3 mt-4">
                <div className="grid gap-4">
                  <DatePicker
                    placeholder={t('AuditLog.Filter.StartDate')}
                    onChange={(date) => {
                      const filterDate = new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                      );
                      setFieldValue(
                        'startDate',
                        date ? filterDate.toISOString() : ''
                      );
                      setFormValue({
                        ...formValue,
                        startDate: date ? filterDate.toISOString() : '',
                      });
                    }}
                    dateFormat="dd/MM/yyyy"
                    label={t('AuditLog.Filter.StartDate')}
                    isCompulsory
                    icon
                    selectedDate={
                      formValue.startDate
                        ? parseISO(formValue.startDate as string)
                        : null
                    }
                    name="startDate"
                  />
                  <DatePicker
                    placeholder={t('AuditLog.Filter.EndDate')}
                    onChange={(date) => {
                      const filterDate = new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                      );
                      setFieldValue('endDate', date ? filterDate.toISOString() : '');
                      setFormValue({
                        ...formValue,
                        endDate: date ? filterDate.toISOString() : '',
                      });
                    }}
                    minDate={
                      formValue.startDate
                        ? parseISO(formValue.startDate as string)
                        : undefined
                    }
                    name="endDate"
                    dateFormat="dd/MM/yyyy"
                    isCompulsory
                    icon
                    label={t('AuditLog.Filter.EndDate')}
                    selectedDate={
                      formValue.endDate
                        ? parseISO(formValue.endDate as string)
                        : null
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col-2 gap-2">
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center text-xs leading-5 gap-1 mt-5 !py-1"
                  variants="black"
                >
                  {t('AuditLog.Filter.ApplyButton')}
                </Button>
                <Button
                  onClickHandler={() => {
                    setFormValue({ startDate: '', endDate: '' });
                    setFilterApply({ startDate: '', endDate: '' });
                    setFilterModal(false);
                    dispatch(currentPageCount({ currentPage: 1 }));
                  }}
                  className={`w-full !mt-5 ${
                    formValue?.endDate ? '' : 'opacity-50 pointer-events-none'
                  }`}
                  // className="w-full !mt-5"
                  variants="black"
                >
                  {t('AuditLog.Filter.CancelButton')}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AuditLogFilter;
