import GlobalSection from 'components/GlobalSection';
import { REACT_APP_API_URL } from 'config';
import { useAxiosGet } from 'hooks/useAxios';
import _ from 'lodash';
import { CMSEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { formatCMSObjectData } from '../HomeCMS/helper';
import { CmsSectionDataProps } from '../HomeCMS/types';
import GiftCardBanner from './GiftCardBanner';
import GiftCardList from './GiftCardList';
import GiftCardZoom from './GiftCardZoom';

interface GiftCardProps {
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
  cta_description: string;
}

const CMSGiftCard = () => {
  const [getApi] = useAxiosGet();
  const { language } = useSelector(useLanguage);
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.GiftCard,
      },
    });
    setResponseData(data?.data);
  };
  useEffect(() => {
    fetchData();
  }, [language]);
  const giftCardData = !_.isUndefined(responseData?.giftCard)
    ? formatCMSObjectData({ data: responseData?.giftCard ?? [] })
    : {};

  return (
    <>
      <GiftCardBanner giftCardData={giftCardData as unknown as GiftCardProps} />
      <GiftCardList />
      <GiftCardZoom giftCardData={giftCardData as unknown as GiftCardProps} />
      <GlobalSection />
    </>
  );
};

export default CMSGiftCard;
