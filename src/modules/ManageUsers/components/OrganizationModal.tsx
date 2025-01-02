// ** Components **
import Button from 'components/Button/Button';
import Image from 'components/Image';

// ** Configuration **
import { REACT_APP_API_URL } from 'config';

// ** Hooks **
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// ** Redux Selectors **
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { OrganizationType } from 'reduxStore/types';

interface OrganizationModalProps {
  modal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  user_ids: string[];
  resetData: () => void;
}

const OrganizationModal = ({
  modal,
  user_ids,
  resetData,
}: OrganizationModalProps) => {
  // ** Redux Selectors **
  const { language } = useSelector(useLanguage);

  // ** Hooks **
  const { t } = useTranslation();

  // ** State **
  const [options, setOptions] = useState<Array<IOptions>>([]);
  const [selectedId, setSelectedId] = useState<string>();

  // ** API Hooks **
  const [getApi] = useAxiosGet();
  const [addUserToOrganization, { isLoading }] = useAxiosPost();

  const handleAddClick = async () => {
    if (!selectedId) return;
    const { error } = await addUserToOrganization(`/admin/organization/add_user`, {
      user_ids: user_ids.join(','),
      organization_id: selectedId,
    });
    if (!error) {
      setSelectedId(undefined);
      resetData();
      modal.closeModal();
    }
  };
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/organization/get-all`);
    const options = data?.data?.map((item: OrganizationType) => ({
      label: item?.userDetails?.full_name,
      value: item.id,
    }));
    setOptions(options);
  };
  useEffect(() => {
    fetchData();
  }, [language]);

  return (
    <>
      {isLoading && !options?.length ? (
        <Image loaderType="Spin" />
      ) : (
        options?.length > 0 && (
          <>
            <div className="select-org-list">
              <ReactSelect
                label={t('UserManagement.AddToOrganization.Label.Organization')}
                options={options}
                placeholder={t(
                  'UserManagement.AddToOrganization.Placeholder.Organization'
                )}
                selectedValue={selectedId}
                onChange={(e) => setSelectedId(String((e as IOptions).value))}
              />
            </div>
            <div className="btn-wrap">
              <Button
                className="w-fit"
                variants="PrimaryWoodBorder"
                onClickHandler={() => {
                  modal.closeModal();
                }}
              >
                {t('UserManagement.UserList.Button.Back')}
              </Button>
              <Button
                className="w-fit"
                variants="black"
                onClickHandler={handleAddClick}
                isLoading={isLoading}
              >
                {t('UserManagement.UserList.Button.AddToOrganization')}
              </Button>
            </div>
          </>
        )
      )}
    </>
  );
};

export default OrganizationModal;
