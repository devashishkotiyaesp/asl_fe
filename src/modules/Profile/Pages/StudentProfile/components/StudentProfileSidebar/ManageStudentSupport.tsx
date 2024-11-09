import Button from 'components/Button/Button';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import { Form, Formik } from 'formik';

const ManageStudentSupport = () => {
  return (
    <div className="sidebar-content-wrap">
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>Support</span>
        </div>
        <span className="sidebar-content-small-title">
          How can we help you? Browse these common questions:
        </span>
      </div>

      <div className="support-accordion">
        <div className="accordion-wrapper">
          <div className="accordion-item">
            <div className="accordion-title">
              <p>How can I make my online courses accessible to ASL users?</p>
              <span className="arrow">
                <Image iconName="chevronRight" />
              </span>
            </div>
            <div className="accordion-content">
              <div className="accordion-content__inner">sdsd</div>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-title">
              <p>
                What tools are available for integrating ASL into virtual classrooms?
              </p>
              <span className="arrow">
                <Image iconName="chevronRight" />
              </span>
            </div>
            <div className="accordion-content">
              <div className="accordion-content__inner">sdsd</div>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-title">
              <p>Can I offer ASL courses online?</p>
              <span className="arrow">
                <Image iconName="chevronRight" />
              </span>
            </div>
            <div className="accordion-content">
              <div className="accordion-content__inner">sdsd</div>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-title">
              <p>How do I assess ASL proficiency in an online setting?</p>
              <span className="arrow">
                <Image iconName="chevronRight" />
              </span>
            </div>
            <div className="accordion-content">
              <div className="accordion-content__inner">sdsd</div>
            </div>
          </div>
        </div>

        <div className="support-divider">
          <div className="inner">
            <span className="text">or</span>
          </div>
        </div>
        <Formik
          initialValues={{ name: '', email: '' }}
          onSubmit={() => {
            // console.log('');
          }}
        >
          <Form className="support-form">
            <TextArea
              name="sdsd"
              // parentClass="max-w-[440px]"
              label="Reach out to a member of The ASL Shop team!"
              rows={8}
              placeholder="Write here.."
            />
            <Button
              // onClickHandler={() => SelectModal.openModal()}
              type="submit"
              variants="black"
              className="w-fit"
            >
              Update
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ManageStudentSupport;
