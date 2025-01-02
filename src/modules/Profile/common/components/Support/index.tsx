import Button from 'components/Button/Button';
import ReactSelect from 'components/FormElement/ReactSelect';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import StatusLabel from 'components/StatusLabel';
import {
  ReplyTypeEnum,
  StatusTypeEnum,
  ToastVariant,
} from 'constants/common.constant';
import { format } from 'date-fns';
import { Form, Formik, FormikHelpers } from 'formik';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { SupportRequestFormValidationSchema } from 'modules/Feedback/validation';
import { Resource, SupportRequestType } from 'modules/Profile/types';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { socketSelector } from 'reduxStore/slices/socketSlice';
import { setToast } from 'reduxStore/slices/toastSlice';

const SupportForm: FC = () => {
  const user = useSelector(getCurrentUser);
  const socket = useSelector(socketSelector);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sendSupport, { isLoading: sendSupportLoading }] = useAxiosPost();
  const [sendSupportReply, { isLoading: sendSupportReplyLoading }] = useAxiosPost();
  const [supportRequest, setSupportRequest] = useState<Resource[]>();
  const [supportRequestList, setSupportRequestList] =
    useState<SupportRequestType[]>();

  const initialValues = { query: '', query_type: '' };

  const [activeToggle, setActiveToggle] = useState<number | null>();
  const [activeToggleList, setActiveToggleList] = useState<number | null>();

  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefList = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRef.current = contentRef.current.slice(0, supportRequest?.length);
    contentRefList.current = contentRefList.current.slice(
      0,
      supportRequestList?.length
    );
  }, []);

  const handleToggle = (index: number | null) => {
    setActiveToggle(activeToggle === index ? null : index);
  };

  const handleToggleList = (index: number | null) => {
    setActiveToggleList(activeToggleList === index ? null : index);
  };

  // ** APIs
  const [getApi] = useAxiosGet();

  const onSubmitFeedback = async (
    values: { query: string; query_type: string },
    helpers: FormikHelpers<{ query: string; query_type: string }>
  ) => {
    if (user?.id && values?.query_type) {
      const payload = {
        user_id: user?.id,
        query_type: values?.query_type,
        query: values?.query,
        is_resolved: false,
      };

      const res = await sendSupport('/support-request', payload);

      if (res.data) {
        dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: t('Common.ToastMessage.Success.Create'),
            type: 'success',
            id: Date.now(),
          })
        );
        helpers.resetForm();
      }
    }
  };

  const onSubmitReply = async (
    values: { [key: string]: string },
    helpers: FormikHelpers<{ [key: string]: string }>
  ) => {
    let message = '';
    supportRequestList?.forEach((_, index) => {
      if (values[`reply${index}`]) {
        message = values[`reply${index}`] ?? '';
      }
    });
    if (message) {
      const payload = {
        id: values?.id,
        message,
      };

      const { error } = await sendSupportReply(
        'support-request/intercom-reply',
        payload
      );

      if (!error) {
        dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: t('Common.ToastMessage.Success.Create'),
            type: 'success',
            id: Date.now(),
          })
        );
        helpers.resetForm();
        scrollToBottom();
      }
    }
  };
  const getSupportRequestQuery = async () => {
    const { data: supportRequest } = await getApi(`/support-request`, {
      params: {
        user_id: user?.id,
        view: true,
      },
    });
    setSupportRequestList(supportRequest?.data);

    const { data } = await getApi(`/support-request/list`);
    setSupportRequest(data?.data);
  };

  useEffect(() => {
    getSupportRequestQuery();
  }, [sendSupportLoading]);

  const statusRender = (item: string) => {
    const getStatusClass = () => {
      switch (item) {
        case 'Error':
          return 'red';
        case 'Inquiry':
          return 'green';
        default:
          return 'green';
      }
    };

    const statusClasses = ` ${getStatusClass()}`;
    return (
      <StatusLabel
        text={item}
        variants={getStatusClass()}
        className={`${statusClasses ?? ''}`}
      />
    );
  };

  const getStatus = (status: StatusTypeEnum) => {
    switch (status) {
      case StatusTypeEnum.RESPONDED:
        return { color: 'green', message: t('Responded') };
      case StatusTypeEnum.REQUEST:
        return { color: 'gray', message: t('NoResponded') };
      case StatusTypeEnum.CLOSED:
        return { color: 'red', message: t('StatusClosed') };
      default:
        return { color: 'gray', message: t('NoResponded') };
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(
      'supportRequestChange',
      (supportData: SupportRequestType['supportRequestReplies'][0]) => {
        if (supportData?.id) {
          setSupportRequestList((prev) => {
            const updatedList =
              prev?.map((item) =>
                item.id === supportData?.id
                  ? {
                      ...item,
                      ...(supportData?.status
                        ? { status: supportData?.status }
                        : {}),
                      ...(supportData?.message
                        ? {
                            supportRequestReplies: [
                              {
                                type: supportData?.type,
                                message: supportData?.message,
                              },
                              ...(item?.supportRequestReplies ?? []),
                            ],
                          }
                        : {}),
                    }
                  : item
              ) ?? [];
            return updatedList;
          });
        }
        scrollToBottom();
      }
    );

    // Cleanup on unmount
    return () => {
      socket.off('supportRequestChange');
    };
  }, [socket, user?.id]);
  const scrollToBottom = () => {
    const element = document.getElementById('messagesEnd');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  return (
    <div className="sidebar-content-wrap max-h-[600px] overflow-auto pr-2 scroll-page style-scroll">
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>{t('Profile.Teacher.Sidebar.Support')}</span>
        </div>
        <span className="sidebar-content-small-title">
          {t('SupportRequest.Form.Query.Title')}
        </span>
      </div>

      <div className="support-accordion">
        <div className="accordion-wrapper">
          <div className="accordion-wrapper">
            {supportRequest?.map((supportRequest, index) => {
              return (
                <div
                  className={`accordion-item ${
                    activeToggle === index ? 'active' : ''
                  }`}
                  key={`support_${index + 1}`}
                >
                  <div
                    className="accordion-title"
                    onClick={() => handleToggle(index)}
                  >
                    <p>{supportRequest?.question}</p>
                    <Button
                      className={`trigger-btn ${
                        activeToggle === index ? 'active' : ''
                      }`}
                      onClickHandler={() => handleToggle(index)}
                    >
                      <Image iconName="chevronRight" />
                    </Button>
                  </div>
                  <div
                    className="accordion-content"
                    ref={(el) => (contentRef.current[index] = el)} // Assign ref to each content div
                    style={{
                      maxHeight:
                        activeToggle === index
                          ? `${contentRef.current[index]?.scrollHeight}px`
                          : '0',
                      overflow: 'hidden',
                    }}
                  >
                    <div className="inner blog-content">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: supportRequest?.answer as string,
                        }}
                      />
                      {/* <p>{supportRequest?.answer}</p> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="support-divider">
          <div className="inner">
            <span className="text">or</span>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={SupportRequestFormValidationSchema()}
          onSubmit={onSubmitFeedback}
        >
          {() => {
            return (
              <Form className="support-form">
                <ReactSelect
                  isCompulsory
                  label={t('TypeOfQuery')}
                  placeholder={t('SupportRequest.Form.QueryType')}
                  options={[
                    { label: 'Error', value: 'Error' },
                    { label: 'Inquiry', value: 'Inquiry' },
                  ]}
                  name="query_type"
                />
                <TextArea
                  isCompulsory
                  name="query"
                  label={t('SupportRequest.Form.Query.ReachOut')}
                  rows={8}
                  placeholder={t('Events.CreateOrEditForm.DescriptionPlaceHolder')}
                />
                <Button
                  type="submit"
                  variants="black"
                  className="w-fit"
                  isLoading={sendSupportLoading}
                >
                  {t('Auth.ForgotPassword.Button.Submit')}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className="support-accordion ticket-support-accordion">
        <div className="py-2 text-lg">
          <p>{t('SupportRequest.Title')}</p>
        </div>
        <div className="accordion-wrapper style-scroll">
          <Formik initialValues={{}} onSubmit={onSubmitReply} enableReinitialize>
            {({ setFieldValue }) => {
              return (
                <Form className="support-form">
                  {supportRequestList?.map((supportRequest, index) => {
                    return (
                      <div
                        className={`accordion-item ${
                          activeToggleList === index ? 'active' : ''
                        }`}
                        key={`support_${index + 1}`}
                      >
                        <div className="accordion-title">
                          <div className="status-lable-wrap">
                            {statusRender(supportRequest?.query_type)}
                            <StatusLabel
                              variants={
                                getStatus(supportRequest?.status)?.color as
                                  | 'red'
                                  | 'green'
                                  | 'gray'
                                  | 'LightWood'
                                  | undefined
                              }
                              text={getStatus(supportRequest?.status)?.message}
                            />
                          </div>
                          <Button
                            className={`trigger-btn ${
                              activeToggleList === index ? 'active' : ''
                            }`}
                            onClickHandler={() => handleToggleList(index)}
                          >
                            <Image iconName="chevronRight" />
                          </Button>
                        </div>
                        <div>
                          <p>{supportRequest?.query}</p>
                        </div>
                        <div
                          className="accordion-content"
                          ref={(el) => (contentRefList.current[index] = el)} // Assign ref to each content div
                          style={{
                            maxHeight:
                              activeToggleList === index
                                ? `${contentRefList.current[index]?.scrollHeight}px`
                                : '0',
                            overflow: 'hidden',
                          }}
                        >
                          <div className="inner flex  flex-col">
                            <div
                              className="max-h-[300px] flex flex-col-reverse overflow-auto scroll-page style-scroll pr-4"
                              id={activeToggleList === index ? 'messagesEnd' : ''}
                            >
                              {supportRequest?.supportRequestReplies.map(
                                (data, Index) => {
                                  return (
                                    <div
                                      className={`max-w-[48%] mb-3  bg-gray-200 text-black rounded-[8px] px-5 py-2 ${data?.type === ReplyTypeEnum.USER ? 'justify-end ml-auto' : 'mr-auto'}`}
                                      key={`reply_${Index + 1}`}
                                    >
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: data?.message as string,
                                        }}
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </div>

                            {supportRequest?.status !== StatusTypeEnum.CLOSED && (
                              <div className="flex gap-2 mt-5 items-start">
                                <TextArea
                                  isCompulsory
                                  name={`reply${index}`}
                                  // label={t('SupportRequest.Form.Query.ReachOut')}
                                  rows={1}
                                  placeholder={t(
                                    'Events.CreateOrEditForm.DescriptionPlaceHolder'
                                  )}
                                  onChange={(e) => {
                                    setFieldValue(`reply${index}`, e.target.value);
                                    setFieldValue(`id`, supportRequest?.id);
                                  }}
                                />
                                <Button
                                  type="submit"
                                  variants="GreenOpacity"
                                  className="w-[60px] h-[50px] p-0 "
                                  isLoading={sendSupportReplyLoading}
                                >
                                  <Image
                                    iconName="sendIcon"
                                    iconClassName="w-5 h-5"
                                  />
                                </Button>
                              </div>
                            )}
                            {supportRequest?.created_at && (
                              <div className="request-raise-date !mt-3">
                                <p className="!text-gray-400">
                                  {t('SupportRequest.Form.RaisedOn')}
                                </p>
                                <p className="!text-gray-400">
                                  {format(
                                    new Date(supportRequest?.created_at),
                                    "MMM d, yyyy 'at' hh:mm a"
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SupportForm;
