import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Webcam from 'react-webcam';
import { base64ToFile } from 'utils';
import '../../../components/FormElement/style/dropzone.css';

type FieldValueType = File | string | Array<File | string> | null;

interface CaptureImageModalProps {
  modal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  onCapture: (files: File[], value: FieldValueType) => void;
  value: FieldValueType;
}

const videoConstraints = {
  width: 540,
  height: 300,
  facingMode: 'environment',
};

const CaptureImageModal = ({ modal, onCapture, value }: CaptureImageModalProps) => {
  const webRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const { t } = useTranslation();

  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [capturedImage, setCapturedImage] = useState<string>();
  const [capturedVideo, setCapturedVideo] = useState<string>();
  const [isImage, setIsImage] = useState(false);
  // Capture Photo
  const capturePhotoSrc = useCallback(async () => {
    const imageSrc = webRef?.current?.getScreenshot();
    setCapturedImage(imageSrc ?? '');
    if (imageSrc) {
      const file = base64ToFile(imageSrc, 'captureImage.png');
      return [file];
    }
    return null;
  }, [webRef]);

  // Start Video Recording
  const startRecording = async () => {
    if (capturedVideo) {
      setCapturedVideo(undefined);
    }
    if (webRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  // Stop Video Recording
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };
  // Save Recorded Video
  const saveRecording = async () => {
    if (capturedVideo) {
      if (recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const file = new File([blob], 'recordedVideo.webm', { type: 'video/webm' });
        onCapture([file], value);
        setRecordedChunks([]);
        modal.closeModal();
        setIsImage(false);
      }
    } else if (capturedImage) {
      const capturedFile = base64ToFile(capturedImage, 'captureImage.png');
      if (capturedFile) {
        onCapture([capturedFile], value);
      }
      modal.closeModal();
      setIsImage(false);
    }
    setCapturedVideo(undefined);
    setCapturedImage(undefined);
  };

  useEffect(() => {
    if (!isRecording && recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setCapturedVideo(url);
    }
  }, [recordedChunks]);

  return (
    <Modal
      width="max-w-[465px]"
      closeOnEscape
      headerTitle={t('CaptureImage.Modal.Title')}
      closeOnOutsideClick
      headerCancelClick={() => {
        setIsImage(false);
        setCapturedVideo(undefined);
        setCapturedImage(undefined);
      }}
      modal={modal}
    >
      <div className="record-webcam-wrap">
        <div className="text-center">
          <div className="record-webcam-tab-wrap">
            <div className={`record-webcam-tab-item  ${!isImage ? 'active' : ''} `}>
              <Button
                onClickHandler={() => {
                  setIsImage(false);
                  setCapturedImage(undefined);
                }}
                disabled={isRecording}
              >
                {t('CaptureImage.Record')}
              </Button>
            </div>
            <div className={`record-webcam-tab-item  ${isImage ? 'active' : ''} `}>
              <Button
                onClickHandler={() => {
                  setIsImage(true);
                  setCapturedVideo(undefined);
                }}
                disabled={isRecording}
              >
                {t('CaptureImage.Image')}
              </Button>
            </div>
          </div>
          {!capturedImage && !capturedVideo && (
            <Webcam
              mirrored
              ref={webRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="record-webcam-canvas"
            />
          )}
          {capturedImage && (
            <Image
              imgClassName="record-webcam-canvas"
              src={capturedImage ?? ''}
              isFromDataBase={false}
            />
          )}

          {capturedVideo && (
            <video
              controls
              width={150}
              height={150}
              className="w-full h-full rounded-md"
            >
              <track kind="captions" />
              <source src={capturedVideo} />
            </video>
          )}
          <div className="record-webcam-action">
            <div className="inner">
              {/* Photo Capture */}
              {isImage && (
                <Button
                  className="record-webcam-camera"
                  onClickHandler={capturePhotoSrc}
                  disabled={isRecording}
                >
                  <span className="" />
                </Button>
              )}

              {/* Video Capture */}

              {isRecording
                ? !isImage && (
                    <Button
                      onClickHandler={stopRecording}
                      className="record-webcam-recording stop-recording"
                    >
                      <span />
                    </Button>
                  )
                : !isImage && (
                    <Button
                      onClickHandler={startRecording}
                      className="record-webcam-recording start-recording"
                    >
                      <span />
                    </Button>
                  )}
            </div>
          </div>
        </div>

        <div className="recording-action-button">
          {(capturedImage || capturedVideo) && (
            <>
              <Button
                variants="PrimaryWood"
                onClickHandler={saveRecording}
                className="record-webcam-save-recording"
              >
                {isImage
                  ? t('CaptureImage.SaveImage')
                  : t('CaptureImage.SaveRecording')}
              </Button>
              {capturedImage ? (
                <Button
                  variants="PrimaryWoodLight"
                  onClickHandler={() => {
                    setCapturedImage(undefined);
                  }}
                  className="record-webcam-save-recording"
                >
                  {t('CaptureImage.Discard')}
                </Button>
              ) : (
                capturedVideo && (
                  <Button
                    variants="PrimaryWoodLight"
                    onClickHandler={() => {
                      setCapturedVideo(undefined);
                    }}
                    className="record-webcam-save-recording"
                  >
                    {t('CaptureImage.Discard')}
                  </Button>
                )
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CaptureImageModal;
