import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import './index.css';

const CMSProduct = () => {
  return (
    <section className="product-details">
      <div className="container">
        <Breadcrumbs />
        <div className="wrapper">
          <div className="left-part">
            <div className="product-image">
              <Image isFromDataBase={false} src="./images/gift-card.png" />
            </div>
            <ul>
              <li>Redeemable for all courses.</li>
              <li>Available in multiple denominations</li>
              <li>Easy to purchase and send via email</li>
              <li>No expiration date</li>
            </ul>
          </div>
          <div className="right-part">
            {/* ********************* */}
            <div className="self-card">
              <div className="self-card__details">
                <h1>3-Month Access | ASL Self-Paced Courses</h1>
                <p>
                  Surprise someone with this gift card and give them access to our
                  self-paced course for 3 months. After you purchase the gift card,
                  you'll receive an email with a link and coupon that you can share
                  with your friend, family member, co-worker or even a stranger!
                </p>
              </div>
              <div className="self-card__denominations">
                <label htmlFor="denominations" className="title">
                  Denominations
                </label>
                <div className="price-counter">
                  <span className="price">$38.97</span>
                  <div className="counter">
                    <span>
                      <Image iconName="minus" />
                    </span>
                    <input type="text" name="" id="" min={0} max={999} value={1} />
                    <span>
                      <Image iconName="plus" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="btn btn-black">
                <Link to="#!">
                  Buy Now <Image iconName="arrowRight" />
                </Link>
              </div>
            </div>

            {/* ********************* */}
            <div className="product-info">
              <div className="title-price">
                <h1>Gift Card</h1>
                <span className="price">$50</span>
              </div>
              <p>
                Gift the joy of ASL! Our cards offer engaging, flexible ASL classes
                via Zoom or in-person (excludes self-paced courses). Perfect for
                learners!
              </p>
              <div className="product-amount">
                <label className="">Amount</label>
                <ul>
                  <li>$25</li>
                  <li className="active">$50</li>
                  <li>$100</li>
                  <li>$200</li>
                </ul>
              </div>

              <div className="counter">
                <span>
                  <Image iconName="minus" />
                </span>
                <input type="text" name="" id="" min={0} max={999} value={1} />
                <span>
                  <Image iconName="plus" />
                </span>
              </div>

              <div className="gift-for">
                <label className="title">Who's the gift card for?</label>
                <ul>
                  <li className="active">For someone else</li>
                  <li>For My Self</li>
                </ul>
              </div>

              <Formik
                initialValues={{ name: '', email: '' }}
                onSubmit={() => {
                  // console.log('');
                }}
              >
                <Form className="">
                  <InputField
                    isCompulsory
                    name="sdsd"
                    type="email"
                    label="Recipient Email"
                    className="bg-LightGray"
                    placeholder="Enter recipient email"
                  />
                  <InputField
                    isCompulsory
                    name="sdsd"
                    type="text"
                    label="Recipient Name"
                    className="bg-LightGray"
                    placeholder="Enter recipient name"
                  />
                  <TextArea
                    placeholder="Write here..."
                    rows={5}
                    name="sde"
                    label="Message"
                    className="bg-LightGray"
                  />
                  <Button variants="black" className="form-submit">
                    Buy Now <Image iconName="arrowRight" />
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSProduct;
