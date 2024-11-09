// ** Components **
import Image from 'components/Image';

// ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// ** Slices
import { useLanguage } from 'reduxStore/slices/languageSlice';

// ** Types **
import { CmsSectionDataProps } from '../HomeCMS/types';

// ** Utils **
import GlobalSection from 'components/GlobalSection';
import { REACT_APP_API_URL } from 'config';
import _ from 'lodash';
import { CMSEnum } from 'modules/CmsAdmin/constants';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { formatCMSObjectData } from '../HomeCMS/helper';
import './index.css';

interface TermsOfUseProps {
  title: string;
  description: string;
  summary_keyPoints: string;
  point_data_array: PointData[];
}

interface PointData {
  title: string;
  description: string;
}

const TermsOfUse = () => {
  const { language } = useSelector(useLanguage);
  const location = useLocation();
  const { t } = useTranslation();
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.TermsOfUse,
      },
    });
    setIsLoading(apiLoading);
    setResponseData(data?.data);
  };
  useEffect(() => {
    fetchData();
  }, [language]);

  const privacyData = !_.isUndefined(responseData?.termsOfUse)
    ? formatCMSObjectData({ data: responseData?.termsOfUse ?? [] })
    : {};

  const { description, point_data_array, summary_keyPoints, title } =
    privacyData as unknown as TermsOfUseProps;

  const [qnaData, setQnaData] = useState<PointData>();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      {isLoading && !responseData?.data ? (
        <Image loaderType="Spin" />
      ) : (
        responseData && (
          <>
            <section className="privacy-banner">
              <div className="container">
                <div className="section-title">
                  <div className="hashtag-label">
                    {t('Cms.privacyPolicy.lastUpdateText')}
                  </div>
                  <h1 className="h2">{title}</h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </div>
              </div>
            </section>

            <section className="privacy-policy-content">
              <div className="container">
                <div className="wrapper">
                  <div className="left-part">
                    <div className="policy-content">
                      <h2>{t('Cms.privacyPolicy.summaryText')}</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: summary_keyPoints,
                        }}
                      />

                      <div>
                        <h2 id="QNASection">
                          {qnaData?.title ?? point_data_array[0].title}
                        </h2>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              qnaData?.description ??
                              point_data_array[0].description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="right-part">
                    <div className="policy-toc">
                      <div className="inner">
                        <span className="title">
                          {t('Cms.privacyPolicy.tableOfContent')}
                        </span>
                        <ul>
                          {point_data_array?.map((item) => (
                            <li>
                              <Link
                                onClick={() => {
                                  setQnaData(item);
                                }}
                                to="#QNASection"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <GlobalSection hideAccessDevice />
          </>
        )
      )}
    </>
  );
};

export default TermsOfUse;
