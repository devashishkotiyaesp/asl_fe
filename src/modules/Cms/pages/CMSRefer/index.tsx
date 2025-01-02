import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import { REACT_APP_API_URL } from 'config';
import { useAxiosGet } from 'hooks/useAxios';
import _ from 'lodash';
import { CMSEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import { formatCMSObjectData } from '../HomeCMS/helper';
import { CmsSectionDataProps } from '../HomeCMS/types';
import './index.css';

interface ReferFriendsProps {
  banner_image: string;
  button_text: string;
  button_title: string;
  button_url: string;
  description: string;
  eyebrow_title: string;
  image: string;
  link_btn_url: string;
  link_button: string;
  title: string;
  banner_title: string;
}

const CMSRefer = () => {
  const { language } = useSelector(useLanguage);
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const [getApi, { isLoading: isFetchLoading }] = useAxiosGet();
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.ReferYourFriends,
      },
    });
    setResponseData(data?.data);
  };
  useEffect(() => {
    fetchData();
  }, [language]);
  const referFriendsData = !_.isUndefined(responseData?.referYourFriends)
    ? formatCMSObjectData({ data: responseData?.referYourFriends ?? [] })
    : {};
  const {
    banner_image,
    button_text,
    button_title,
    description,
    banner_title,
    eyebrow_title,
    image,
    link_btn_url,
    link_button,
    title,
  } = referFriendsData as unknown as ReferFriendsProps;

  return (
    <>
      {isFetchLoading && !responseData?.data ? (
        <Image loaderType="Spin" />
      ) : (
        responseData && (
          <>
            <section className="refer-sec">
              <div className="container">
                <div className="wrapper">
                  <div className="left-part">
                    <div className="section-title">
                      <span className="hashtag-label">{eyebrow_title}</span>
                      <h2>{title}</h2>
                      <span className="light-text">{banner_title}</span>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: description,
                        }}
                      />
                      <div className="btn btn-black-border mt-5">
                        <Link to={link_btn_url ?? (link_btn_url as string)}>
                          {link_button ?? String(link_button)}
                          <Image iconName="arrowRight" iconClassName="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="right-part">
                    <div className="img-wrap">
                      <Image src={banner_image} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <CMSCTA
              variant="2"
              linkText={button_text}
              leftImagePath={image}
              title={button_title}
              isFormDataBase
            />
            <GlobalSection />
          </>
        )
      )}
    </>
  );
};

export default CMSRefer;
