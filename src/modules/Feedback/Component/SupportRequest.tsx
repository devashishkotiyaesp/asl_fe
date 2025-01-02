import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import StatusLabel from 'components/StatusLabel';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { StatusTypeEnum } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { socketSelector } from 'reduxStore/slices/socketSlice';
import { getDateFormate } from 'utils/date';
import { FilterApplyProps, SupportRequestItem, SupportRequestList } from '../types';

interface SupportRequestProps {
  search?: string;
  filterApply?: FilterApplyProps;
}

const SupportRequest = ({ search, filterApply }: SupportRequestProps) => {
  const { t } = useTranslation();

  const socket = useSelector(socketSelector);

  const sendResponse = useModal();
  // const dispatch = useDispatch();
  const { currentPage } = useSelector(currentPageSelector);
  const { language } = useSelector(useLanguage);

  // STORE API DATA FOR SUPPORT REQUEST
  const [getSupportRequest] = useAxiosGet();

  // const [sendSupportResponse] = useAxiosPost();

  // STORE API DATA FOR SUPPORT REQUEST ID
  const [getSupportRequestItem] = useAxiosGet();

  const [limit, setLimit] = useState<number>(10);

  const [supportRequestData, setSupportRequestData] = useState<SupportRequestList>();
  const [responseItem, setResponseItem] = useState<SupportRequestItem | null>();

  const handleSupportRequest = async () => {
    const data = await getSupportRequest('support-request', {
      params: {
        page: currentPage,
        limit,
        search,
        ...filterApply,
        status: filterApply?.status?.join(','),
      },
    });
    setSupportRequestData(data.data);
  };

  const handleSupportRequestID = async (e: SupportRequestItem) => {
    const data = await getSupportRequestItem(`support-request`, {
      params: {
        id: e.id,
      },
    });
    setResponseItem(data.data);
  };

  // comment FOR REPLY
  // const OnSubmit = async (values: FormikValues) => {
  //   const payLoad = {
  //     message: values.responseReply,
  //     support_request_id: responseItem?.id,
  //     user_id: responseItem?.user_id,
  //     email: responseItem?.user?.email,
  //   };

  //   // sendSupportResponse
  //   const { error } = await sendSupportResponse('support-request/reply', payLoad);

  //   if (!error) {
  //     dispatch(
  //       setToast({
  //         variant: ToastVariant.SUCCESS,
  //         message: t('Common.ToastMessage.Success.Create'),
  //         type: 'success',
  //         id: Date.now(),
  //       })
  //     );
  //     sendResponse.closeModal();
  //     handleSupportRequest();
  //   }
  // };

  const columnData: ITableHeaderProps[] = [
    {
      header: t('Table.Number'),
      name: 'no',
      option: {
        sort: true,
        hasFilter: false,
        isIndex: true,
      },
    },
    {
      header: t('Table.Name'),
      name: 'name',
      option: {
        sort: true,
        hasFilter: false,
      },
      cell: (props) => handleProfile(props as unknown as SupportRequestItem),
    },
    {
      header: t('UserType'),
      name: 'user.role.role',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('TypeOfQuery'),
      name: 'query_type',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('Query'),
      name: 'query',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('Status'),
      option: {
        sort: true,
        hasFilter: false,
      },
      cell: (props) => RequestStatus(props as unknown as SupportRequestItem),
    },
    {
      header: t('Events.CreateOrEditForm.Date'),
      name: 'created_at',
      option: {
        sort: true,
        hasFilter: false,
      },
      cell: (props) => RequestDate(props as unknown as SupportRequestItem),
    },
    {
      header: t('Settings.table.action'),
      cell: (props) => actionRender(props as unknown as SupportRequestItem),
    },
  ];

  // FOR TABLE PROFILE COLUMN
  const handleProfile = (SupportReq: SupportRequestItem) => {
    return (
      <div className="user-profile-data">
        <div className="user-profile-image">
          <Image src={SupportReq?.user?.profile_image ?? '/images/no-image.png'} />
        </div>
        <div className="user-profile-name">
          <span>
            {SupportReq?.user?.first_name} {SupportReq?.user?.last_name}
          </span>
        </div>
      </div>
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
  const RequestStatus = (SupportReq: SupportRequestItem) => {
    const status = getStatus(SupportReq?.status);
    return (
      <StatusLabel
        variants={
          status?.color as 'green' | 'gray' | 'LightWood' | 'red' | undefined
        }
        text={status?.message}
      />
    );
  };

  const RequestDate = (SupportReq: SupportRequestItem) => {
    return <div>{getDateFormate(SupportReq?.created_at)}</div>;
  };

  const actionRender = (e: SupportRequestItem) => {
    return (
      <Button
        onClickHandler={() => {
          sendResponse.openModal();
          handleSupportRequestID(e);
        }}
        className="flex items-center gap-1 underline text-PrimaryWood hover:text-black cursor-pointer"
      >
        {/* {e.status === StatusTypeEnum.RESPONDED ||
        e.status === StatusTypeEnum.CLOSED ? (
          <> */}
        <Image iconName="message2" iconClassName="w-5 h-5" /> {t('View')}
        {/* </>
        ) : (
          <>
            <Image iconName="send" iconClassName="w-5 h-5" /> {t('Text.Reply')}
          </>
        )} */}
      </Button>
    );
  };

  useEffect(() => {
    handleSupportRequest();
  }, [search, limit, filterApply, currentPage, language]);

  useEffect(() => {
    if (!socket) return;

    socket.on(
      'supportRequestChange',
      (supportData: SupportRequestList['data'][0]) => {
        if (supportData?.id) {
          setSupportRequestData((prev) => {
            if (!prev) return prev;

            const updatedList =
              prev.data?.map((item) =>
                item.id === supportData?.id
                  ? {
                      ...item,
                      ...(supportData?.status
                        ? { status: supportData?.status }
                        : {}),
                    }
                  : item
              ) ?? [];

            return {
              ...prev,
              data: updatedList,
            };
          });
        }
      }
    );

    // Cleanup on unmount
    return () => {
      socket.off('supportRequestChange');
    };
  }, [socket]);

  return (
    <>
      <Table
        islastRowOnRight={false}
        bodyData={supportRequestData?.data}
        pagination
        totalPage={supportRequestData?.lastPage}
        dataCount={supportRequestData?.count}
        dataPerPage={limit}
        setLimit={setLimit}
        headerData={columnData}
        parentClassName=""
      />

      <Modal
        setDataClear={() => setResponseItem(null)}
        headerTitle={t('SupportRequest')}
        modal={sendResponse}
      >
        <>
          <div className="responseInfo">
            <div className="responseInfo-image">
              {responseItem && (
                <Image
                  src={responseItem?.user?.profile_image ?? '/images/no-image.png'}
                />
              )}
            </div>
            <div className="responseInfo-content">
              <span className="responseInfo-type">
                <StatusLabel
                  text={responseItem?.user?.role.role}
                  variants="LightWood"
                />
              </span>
              <span className="responseInfo-name">
                {responseItem?.user?.first_name} {responseItem?.user?.last_name}
              </span>
              <span className="responseInfo-email">{responseItem?.user?.email}</span>
            </div>
          </div>

          <div className="response-item">
            <label htmlFor="">{t('InquiryLabel')} :</label>
            <div className="response-item-text">{responseItem?.query}</div>
          </div>
          {/* {responseItem?.status !== StatusTypeEnum.RESPONDED &&
          responseItem?.status !== StatusTypeEnum.CLOSED ? (
            <div className="response-reply w-full">
              <Formik
                initialValues={{
                  responseReply: responseItem?.supportRequestReplies
                    ? responseItem?.supportRequestReplies?.message
                    : '',
                }}
                onSubmit={OnSubmit}
                enableReinitialize
              >
                {({ values }) => {
                  return (
                    <Form>
                      <TextArea
                        isCompulsory
                        rows={5}
                        name="responseReply"
                        label={t('Text.Reply')}
                        value={values.responseReply}
                        // className="w-full border"
                      />
                      <div className="btn-wrap">
                        {responseItem?.status === StatusTypeEnum.RESPONDED ||
                        responseItem?.status === StatusTypeEnum.CLOSED ? (
                          <Button
                            type="button"
                            onClickHandler={() => sendResponse.closeModal()}
                            variants="black"
                          >
                            {t('Close')}
                          </Button>
                        ) : (
                          <>
                            <Button
                              type="button"
                              variants="PrimaryWoodBorder"
                              onClickHandler={() => sendResponse.closeModal()}
                            >
                              {t('Settings.cancel')}
                            </Button>
                            <Button
                              type="submit"
                              variants="black"
                              isLoading={responseLoading}
                              disabled={responseLoading}
                            >
                              {t('Settings.submit')}
                            </Button>
                          </>
                        )}
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          ) : ( */}
          <div>
            <div className="response-item">
              <label htmlFor="" className="flex">
                {t('Status')} :
              </label>
              <div className="response-item-text">
                {responseItem && RequestStatus(responseItem)}
              </div>
            </div>
            {/* <div className="response-item">
                <label htmlFor="" className="flex">
                  {t('ReplyLabel')} :
                </label>
                <div className="response-item-text">
                  {responseItem?.supportRequestReplies?.message && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: responseItem?.supportRequestReplies?.message,
                      }}
                    />
                  )}
                </div>
              </div> */}
          </div>
          {/* )} */}
        </>
      </Modal>
    </>
  );
};

export default SupportRequest;
