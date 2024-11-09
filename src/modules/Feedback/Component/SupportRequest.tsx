import Button from 'components/Button/Button';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import StatusLabel from 'components/StatusLabel';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { REACT_APP_API_BASE_URL } from 'config';
import { Formik, FormikValues } from 'formik';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SupportRequestItem, SupportRequestList } from '../types';

interface SupportRequestProps {
  search?: string;
}

const SupportRequest = ({ search }: SupportRequestProps) => {
  const { t } = useTranslation();

  const sendResponse = useModal();

  // STORE API DATA FOR SUPPORT REQUEST
  const [getSupportRequest, { isLoading }] = useAxiosGet();

  const [sendSupportResponse, { isLoading: responseLoading }] = useAxiosPost();

  // STORE API DATA FOR SUPPORT REQUEST ID
  const [getSupportRequestItem] = useAxiosGet();

  const [limit, setlimit] = useState<number>(10);

  const [supportRequestData, setSupportRequestData] = useState<SupportRequestList>();
  const [responseItem, setResponseItem] = useState<SupportRequestItem | null>();
  // const [responseView, setResponseView] = useState<SupportRequestItem>();

  const handleSupportRequest = async () => {
    const data = await getSupportRequest('support-request', {
      params: {
        limit,
        search,
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

  // FOR REPLY
  const OnSubmit = async (values: FormikValues) => {
    const payLoad = {
      message: values.responseReply,
      support_request_id: responseItem?.id,
      user_id: responseItem?.user_id,
      email: responseItem?.user?.email,
    };

    // sendSupportResponse
    const { error } = await sendSupportResponse('support-request/reply', payLoad);

    if (!error) {
      sendResponse.closeModal();
      handleSupportRequest();
    }
  };

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
      name: 'is_resolved',
      option: {
        sort: true,
        hasFilter: false,
      },
      cell: (props) => RequestStatus(props as unknown as SupportRequestItem),
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
          <Image
            src={
              SupportReq?.user?.profile_image
                ? `${REACT_APP_API_BASE_URL}/${SupportReq?.user?.profile_image}`
                : '/images/no-image.png'
            }
          />
        </div>
        <div className="user-profile-name">
          <span>
            {SupportReq?.user?.first_name} {SupportReq?.user?.last_name}
          </span>
        </div>
      </div>
    );
  };
  const RequestStatus = (SupportReq: SupportRequestItem) => {
    return (
      <StatusLabel
        variants={SupportReq?.is_resolved ? 'green' : 'gray'}
        text={SupportReq?.is_resolved ? t('Responded') : t('NoResponded')}
      />
    );
  };

  const actionRender = (e: SupportRequestItem) => {
    return (
      <>
        <Button
          onClickHandler={() => {
            sendResponse.openModal();
            handleSupportRequestID(e);
          }}
          className="flex items-center gap-1 underline text-PrimaryWood hover:text-black cursor-pointer"
        >
          {e.is_resolved ? (
            <>
              <Image iconName="message2" iconClassName="w-5 h-5" /> {t('View')}
            </>
          ) : (
            <>
              <Image iconName="send" iconClassName="w-5 h-5" /> {t('Text.Reply')}
            </>
          )}
        </Button>
      </>
    );
  };

  useEffect(() => {
    handleSupportRequest();
  }, [search]);

  return (
    <>
      <Table
        headerData={columnData}
        parentClassName=""
        islastRowOnRight={false}
        loader={isLoading}
        setLimit={setlimit}
        bodyData={supportRequestData?.data}
        pagination
      />

      <Modal
        setDataClear={() => setResponseItem(null)}
        headerTitle={t('SupportRequest')}
        modal={sendResponse}
      >
        <>
          <div className="responseInfo">
            <div className="responseInfo-image">
              <Image
                src={
                  responseItem?.user?.profile_image
                    ? `${REACT_APP_API_BASE_URL}/${responseItem?.user?.profile_image}`
                    : '/images/no-image.png'
                }
              />
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
          <div className="response-reply">
            <Formik
              initialValues={{
                responseReply: responseItem?.supportRequestReplies
                  ? responseItem?.supportRequestReplies?.message
                  : '',
              }}
              onSubmit={(values) => {
                OnSubmit(values);
              }}
              enableReinitialize
            >
              {({ values }) => {
                return (
                  <>
                    <TextArea
                      isCompulsory
                      rows={5}
                      name="responseReply"
                      label={t('Text.Reply')}
                      disabled={responseItem?.is_resolved}
                      value={values.responseReply}
                    />

                    <div className="btn-wrap">
                      {responseItem?.is_resolved ? (
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
                  </>
                );
              }}
            </Formik>
          </div>
        </>
      </Modal>
    </>
  );
};

export default SupportRequest;
