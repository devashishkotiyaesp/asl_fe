import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { REACT_APP_BACKEND_URL } from 'config';
import { useRef } from 'react';
import { AboutCrewProps } from '../types';

interface ModalData {
  item: AboutCrewProps;
  modal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CrewModal = ({ item, modal, setSelected }: ModalData) => {
  const {
    banner_image,
    banner_video,
    description,
    designation,
    username,
    fun_tidbits,
  } = item;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef?.current) {
      videoRef?.current?.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef?.current) {
      videoRef?.current?.pause();
    }
  };
  return (
    <Modal
      width="max-w-[900px]"
      closeOnEscape
      headerTitle=" "
      closeOnOutsideClick
      handleCloseOutsideClick={() => modal.closeModal()}
      modal={modal}
      cancelClick={() => setSelected(null)}
    >
      <div className="crew-modal-wrap wrapper px-4">
        <div className="left-part">
          <div className="crew-item">
            <div className="crew-img">
              <Image src={banner_image} />
            </div>
            <h3>{username}</h3>
            <p>{designation}</p>
          </div>
        </div>
        <div className="right-part">
          <p
            dangerouslySetInnerHTML={{
              __html: description as string,
            }}
          />
          <div className="info-text">{fun_tidbits}</div>
          <div className="video-wrap rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              width="600"
              src={`${REACT_APP_BACKEND_URL}${banner_video}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              muted
              autoPlay
              loop
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
