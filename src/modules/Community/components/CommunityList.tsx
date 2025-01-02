import Button from 'components/Button/Button';
import TopicCard from 'components/TopicCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { ICommunityResponse } from '../types';

type ICommunityList = {
  communityData?: ICommunityResponse;
  totalCount?: number;
  isLoading: boolean;
  loadMore: () => void;
  setDeletedId?: React.Dispatch<React.SetStateAction<string>>;
  searchParams: URLSearchParams;
};
const CommunityList = ({
  communityData,
  totalCount,
  loadMore,
  isLoading,
  setDeletedId,
  searchParams,
}: ICommunityList) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const allDataLoaded = (communityData?.data?.length ?? 0) >= (totalCount ?? 0);
  return (
    <>
      <div className="topic-wrapper">
        {communityData?.data?.map((community, index) => (
          <TopicCard
            key={`${index + 1}_community`}
            onClick={() =>
              navigate(`/community/${community?.id}?community=${searchParams}`)
            }
            imagePath={community?.media}
            title={community?.name}
            description={community?.description}
            time={community?.created_at}
            conversationCount={Number(community?.postCount)}
            data={community}
            setDeletedId={setDeletedId}
          />
        ))}
      </div>

      {!allDataLoaded && (
        <div className="flex justify-center mt-5">
          <Button
            variants="black"
            onClickHandler={() => loadMore()}
            isLoading={isLoading}
          >
            {t('Community.CommunityList.LoadMoreButton')}
          </Button>
        </div>
      )}
    </>
  );
};

export default CommunityList;
