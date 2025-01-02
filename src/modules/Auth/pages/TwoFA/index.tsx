import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { useModal } from 'hooks/useModal';
import { Link } from 'react-router-dom';
import '../style/index.css';

const TwoFA = () => {
  const Two_FA = useModal(true);

  return (
    <>
      <div className="form-wrap">
        <div className="form-title-text">
          <h2 className="">Two Factor Authentication</h2>
        </div>
        <div className="form-card">
          <div className="form-qr-wrap" />

          <div className="form-qr-step ">
            <div className="form-qr-step__item ">
              <span className="form-qr-step__item-count ">1</span>
              <span className="form-qr-step__item-text ">
                Scan the QR code using any authentication application on your
                phone(e.g. Google Authenticator, Duo Mobile. Authy) or enter the
                following code
              </span>
            </div>
            <div className="form-qr-step__item">
              <span className="form-qr-step__item-count">2</span>
              <span className="form-qr-step__item-text">
                Enter the 6 figure confirmation code shown on the app:
              </span>
            </div>
          </div>
          <Button
            parentClass="mt-5"
            // isLoading
            variants="black"
            type="submit"
            value="Verify Now"
            onClickHandler={Two_FA?.openModal}
          />
          <span className="form-switch-type">
            <Image iconName="arrowRight" iconClassName="rotate-180 w-5 h-5" />
            Back to
            <Link to="/auth/login">Login</Link>
          </span>
        </div>
      </div>

      <Modal
        width="max-w-[450px]"
        modal={Two_FA}
        closeOnEscape
        showCloseIcon
        headerTitle="Two Factor Authentication Is on"
      >
        <div className="twofa-modal">
          <div className="twofa-modal__icon !w-20 !h-20 !text-PrimaryGreen !bg-PrimaryGreen/10">
            <Image iconName="checkIcon" iconClassName="w-full h-full" />
          </div>
          <div className="twofa-modal__content ">
            <h2 className="">Login Successfully</h2>
            <p className="twofa-modal__text-sub !max-w-[80%]">
              A confirmation email is on its way containing all the information about
              your account
            </p>
            <Button variants="black" className="inline-block !w-fit mt-5">
              Open Dashboard
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TwoFA;
