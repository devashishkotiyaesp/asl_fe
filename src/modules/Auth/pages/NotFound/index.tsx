// import Button from "components/Button/Button";
// import { ConfirmationPopup } from "components/Modal/ConfirmationPopup";
// import { useModal } from "hooks/useModal";

import Button from 'components/Button/Button';
import Image from 'components/Image';

const NotFound = () => {
  // const testModal = useModal()
  // return <>
  // <Button variants="PrimaryWood" onClickHandler={()=>testModal.openModal()}>Confirmation PopUp</Button>;
  // {testModal.isOpen ?  <ConfirmationPopup
  //       modal={testModal}
  //       bodyText="body test"
  //       variants="primary"
  //       confirmButtonText="ok"
  //       confirmButtonVariant="Green"
  //       deleteTitle="title"
  //       cancelButtonText="cancel"
  //       cancelButtonFunction={testModal.closeModal}
  //     />:<></>}
  // </>
  return (
    <section className="no-data-sec">
      <div className="inner">
        <div className="img-wrap">
          <Image src="images/no-data-image.png" isFromDataBase={false} />
        </div>
        <div className="title">Page Not Found</div>
        <p>We're sorry, the page you requested could not be found</p>
        <p>please go back to the homepage</p>
        <Button className="no-data-button" variants="black">
          Go Home
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
