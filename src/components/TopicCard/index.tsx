import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { Roles } from 'constants/common.constant';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useAxiosDelete } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import AddEditTopic from 'modules/Community/components/AddEditTopic';
import { ICommunityItem } from 'modules/Community/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { capitalizeFirstLetter } from 'utils';
import './index.css';

interface TopicCardProps {
  imagePath?: string;
  title?: string;
  description?: string;
  time?: string;
  conversationCount?: number;
  onClick?: () => void;
  data?: ICommunityItem;
  setDeletedId?: React.Dispatch<React.SetStateAction<string>>;
}

const TopicCard = ({
  imagePath,
  title,
  description,
  time,
  conversationCount,
  onClick,
  data,
  setDeletedId,
}: TopicCardProps) => {
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser);
  const editTopicModal = useModal();
  const deleteCommunity = useModal();
  const [deleteCommunityApi] = useAxiosDelete();
  const navigate = useNavigate();

  const handleDelete = async (id: string | undefined) => {
    const { error } = await deleteCommunityApi(`/community/${id}`);
    if (!error) {
      setDeletedId?.(id ?? '');
      navigate('/community');
    }
  };
  return (
    <>
      <Button className="topic-card" onClickHandler={onClick}>
        {imagePath && (
          <div className="topic-card-img">
            <Image src={imagePath} />
          </div>
        )}
        <div className={`topic-card-content ${imagePath ? '' : 'no-image'}`}>
          <h3>{title}</h3>
          {!imagePath && <p>{description}</p>}
          {imagePath && time && (
            <span className="topic-card-time">
              {formatDistanceToNow(parseISO(time), {
                addSuffix: true,
              })}
            </span>
          )}
          {user?.role?.role !== Roles.Student &&
            data?.createdBy?.id === user?.id && (
              <Button
                className="topic-option group"
                onClickHandler={(e) => e.stopPropagation()}
              >
                <span className="icon">
                  <Image iconName="threeMoreDots" />
                </span>
                <ul>
                  <li>
                    <Button
                      onClickHandler={(e) => {
                        e.stopPropagation();
                        editTopicModal.openModal();
                      }}
                    >
                      <Image iconName="editPen" />
                      <span>Edit</span>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClickHandler={(e) => {
                        e.stopPropagation();
                        deleteCommunity.openModal();
                      }}
                    >
                      <Image iconName="trashIcon" />
                      <span>Delete</span>
                    </Button>
                  </li>
                </ul>
              </Button>
            )}
        </div>
        <div className="topic-card-conversation">
          <span className="icon">
            <Image iconName="message" />
          </span>
          <span className="text">
            {conversationCount} {t('Community.Table.Conversation')}
          </span>
        </div>
      </Button>

      <AddEditTopic
        modal={editTopicModal}
        isDiscussion={data?.type === 'discussion'}
        editData={data}
      />
      <ConfirmationPopup
        showCloseIcon
        modal={deleteCommunity}
        deleteTitle={t('Community.ConfirmationPopup.DeleteTitle', {
          TYPE: capitalizeFirstLetter(data?.type ?? ''),
        })}
        bodyText={t('Community.ConfirmationPopup.DeleteBody')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Delete')}
        cancelButtonFunction={() => deleteCommunity.closeModal()}
        confirmButtonFunction={() => {
          handleDelete(data?.id);
          deleteCommunity.closeModal();
        }}
        popUpType="danger"
      />
    </>
  );
};

export default TopicCard;
