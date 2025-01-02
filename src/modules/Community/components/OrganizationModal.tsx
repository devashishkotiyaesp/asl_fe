// ** Components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import AddEditTopic from './AddEditTopic';

// ** Configuration **
import { REACT_APP_API_URL } from 'config';

// ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import '../pages/style/index.css';

// ** Redux Selectors **
import { useLanguage } from 'reduxStore/slices/languageSlice';

interface OrganizationModalProps {
  modal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  isDiscussion: boolean;
  refetch: () => void;
}

type UserDetail = {
  full_name: string;
  profile_image: string;
  first_name: string;
  last_name: string;
};

type Organization = {
  id: string;
  user_id: string;
  organization_type: string;
  userDetails: UserDetail;
};

const OrganizationModal = ({
  modal,
  isDiscussion,
  refetch,
}: OrganizationModalProps) => {
  // ** Redux Selectors **
  const { language } = useSelector(useLanguage);

  // ** Hooks **
  const { t } = useTranslation();
  const addEditCommunityModal = useModal();

  // ** State **
  const [responseData, setResponseData] = useState<Array<Organization>>();
  const [orgId, setOrgId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();

  // ** API Hooks **
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();

  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/organization/get-all`);
    setIsLoading(apiLoading);
    setResponseData(data?.data);
  };
  useEffect(() => {
    fetchData();
  }, [language]);

  return (
    <>
      {isLoading && !responseData ? (
        <Image loaderType="Spin" />
      ) : (
        responseData && (
          <>
            <Modal
              modal={modal}
              headerTitle={t('Community.Organization.orgTitle')}
              headerCancelClick={() => setOrgId(undefined)}
            >
              <>
                <div className="select-org-list">
                  {responseData.map((item, index) => (
                    <div
                      key={`${index + 1}_item`}
                      className={`select-org-item ${item.id === orgId ? 'active' : ''}`}
                      onClick={() => {
                        setOrgId(item.id);
                      }}
                    >
                      <span className="select-org-profile">
                        <Image
                          src={item?.userDetails?.profile_image ?? ''}
                          isFromDataBase
                        />
                      </span>
                      <span className="select-org-name">
                        {item?.userDetails?.full_name ?? ''}
                      </span>
                      <span className="icon">
                        <Image iconName="chevronRight" />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="btn-wrap">
                  <Button
                    className="w-fit"
                    variants="PrimaryWoodBorder"
                    onClickHandler={() => {
                      setOrgId(undefined);
                      modal.closeModal();
                    }}
                  >
                    {t('Community.ConfirmationPopup.Cancel')}
                  </Button>
                  <Button
                    className="w-fit"
                    variants="black"
                    onClickHandler={() => {
                      if (orgId) {
                        addEditCommunityModal.openModal();
                        // setOrgId(undefined);
                        modal.closeModal();
                      }
                    }}
                    isLoading={isLoading}
                  >
                    {isDiscussion
                      ? t('Community.Buttons.CreateDiscussion')
                      : t('Community.Buttons.CreateTopic')}
                  </Button>
                </div>
              </>
            </Modal>
            <AddEditTopic
              refetch={() => refetch()}
              modal={addEditCommunityModal}
              orgId={orgId}
              isDiscussion={isDiscussion}
            />
          </>
        )
      )}
    </>
  );
};

export default OrganizationModal;
