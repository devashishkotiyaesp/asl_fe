import CMSPageCard from 'components/CmsPageCard';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import { REACT_APP_API_URL } from 'config';
import { AdminNavigation } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

interface CmsList {
  page_name: string;
  id: string;
}

const CMSPageLIst = () => {
  const [cmsListApi, { isLoading }] = useAxiosGet();
  const navigate = useNavigate();
  const [cmsList, setCmsList] = useState<CmsList[]>();
  const fetchCmsList = async () => {
    const responseData = await cmsListApi(`${REACT_APP_API_URL}/cms-pages/get-all`);
    setCmsList(responseData.data);
  };
  useEffect(() => {
    fetchCmsList();
  }, []);

  return (
    <>
      <PageHeader title="CMS Management" />
      <div className="content-base">
        {isLoading ? (
          <Image loaderType="Spin" />
        ) : (
          <div className="page-list-wrap">
            {Array.isArray(cmsList) &&
              cmsList.length > 0 &&
              cmsList.map((data, index) => {
                return (
                  <CMSPageCard
                    cardName={data?.page_name}
                    key={`cms_page_${index + 1}`}
                    onClick={() => {
                      navigate(
                        `${AdminNavigation.cms_management.view.path}/${data?.id}`
                      );
                    }}
                  />
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default CMSPageLIst;
