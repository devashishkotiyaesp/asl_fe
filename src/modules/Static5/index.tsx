import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';
import InputField from 'components/FormElement/InputField';
import RadioButtonGroup from 'components/FormElement/RadioInput';
import ReactSelect from 'components/FormElement/ReactSelect';
import TextArea from 'components/FormElement/TextArea';
import { IconTypes } from 'components/Icon/types';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import './index.css';

interface SubscriptionplansProps {
  id: number;
  icon?: IconTypes;
  title?: string;
  // onClick?: MouseEventHandler<HTMLElement>;
  description?: string;
  datakey?: string;
}

const Subscriptionplans: SubscriptionplansProps[] = [
  {
    id: 1,
    icon: 'oneTimepaymentIcon',
    title: 'One-Time Payment',
    description: 'Charge users a one-time payment fee to access the content',
    datakey: 'OneTimepayment',
  },
  {
    id: 2,
    icon: 'sparkIcon',
    title: 'Subscription',
    description: 'Charges users a recurring fee to access the content',
    datakey: 'Subscription',
  },
];
interface subscriptionCoursesAccessProps {
  id: number;
  title: string;
  icon: IconTypes;
}
const subscriptionCoursesAccess: subscriptionCoursesAccessProps[] = [
  {
    id: 1,
    title: 'Self Paced Courses',
    icon: 'selfpacedCourse',
  },
  {
    id: 2,
    title: 'In-Person Class',
    icon: 'zoomCourses',
  },
  {
    id: 3,
    title: 'Zoom Class',
    icon: 'aSLMiniLesson',
  },
  {
    id: 4,
    title: 'Appointments',
    icon: 'fingringCourse',
  },
];

const Static5 = () => {
  const [selectSubscription, setSelectSubscription] = useState('OneTimepayment');

  return (
    <>
      <Card title="Review Quiz">
        <>
          <div className="review-quiz-wrap">
            <div className="review-quiz-question-list">
              <ul>
                <li className="correct active">
                  <span className="icon">
                    <Image iconName="checkIcon" />
                  </span>
                  Question 1
                </li>
                <li className="wrong">
                  <span className="icon">
                    <Image iconName="crossIcon" />
                  </span>
                  Question 1
                </li>
                <li className="wrong">
                  <span className="icon">
                    <Image iconName="crossIcon" />
                  </span>
                  Question 1
                </li>
                <li className="correct">
                  <span className="icon">
                    <Image iconName="checkIcon" />
                  </span>
                  Question 1
                </li>
              </ul>
            </div>
            <div className="review-quiz-question-content">Contant Goes Here</div>
          </div>
        </>
      </Card>
      <div className="my-20" />
      <div className="bg-white p-4">
        <div className="quiz-progress">
          <div className="quiz-progress-wrap">
            <span className="quiz-progress-bar" />
            <span className="quiz-progress-bar" />
            <span className="quiz-progress-bar" />
            <span className="quiz-progress-bar" />
            <span className="quiz-progress-bar" />
            <span className="quiz-progress-bar" />
            <span className="quiz-progress-bar" />
            <span className="quiz-progress-bar" />
          </div>
          <div className="quiz-progress-count">01/08</div>
        </div>

        <div className="quiz-title-bar">Quiz</div>

        <div className="ques-ans-wrapper">
          <div className="ques-item">
            <div className="ques-item-text">Question 1</div>
            <div className="ques-item-list">
              <label className="ques-item-title">What is the handshape?</label>

              <div className="ques-ans-media-wrap">
                <Image src="./images/blog-1.png" isFromDataBase={false} />
              </div>
            </div>
          </div>
          <div className="ans-item">
            <div className="ans-item-text">Answer Options</div>
            <div className="sort-ans-box-bar">
              <span className="selected">E</span>
              <span className="correct">A</span>
              <span className="wrong">X</span>
              <span>J</span>
            </div>
          </div>
        </div>

        <div className="btn-wrap">
          <Button variants="PrimaryWood">Check Answer</Button>
          <Button variants="PrimaryWoodBorder">Previous Question</Button>
          <Button variants="black">Next Question</Button>
        </div>
      </div>
      {/* Create Subscription  */}
      <PageHeader url="./" title="Create Subscription ">
        <Breadcrumbs
          items={[
            {
              label: 'Admin',
              url: '/',
            },
            {
              label: 'Subscription',
              url: '/',
            },
            {
              label: 'Create Subscription',
              url: '/',
            },
          ]}
        />
      </PageHeader>
      <div className="content-base">
        <div className="select-subscription">
          {Subscriptionplans.map((e, i) => {
            return (
              <Button
                onClickHandler={() => setSelectSubscription(`${e.datakey}`)}
                key={i + 1}
                className={`subscription-item ${selectSubscription === e.datakey ? 'active' : ''}`}
              >
                <div className="icon">
                  <Image iconName={e.icon} />
                </div>
                <h4>{e.title}</h4>
                <p>{e.description}</p>
              </Button>
            );
          })}
        </div>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={() => {
            // console.log('');
          }}
        >
          {() => {
            return (
              <Form className="subscription-form">
                <InputField
                  label="Subscription Title"
                  isCompulsory
                  name="name"
                  placeholder="Enter Subscription Title"
                />
                <div className="checkbox-group">
                  <Checkbox text="Add Usage Limit" id="usageLimit" />
                  <InputField
                    parentClass="limit-input"
                    isCompulsory
                    name="name"
                    placeholder="00"
                  />
                </div>

                <div className="subscription-notes">
                  <div className="">
                    <label className="group-label input-label !mb-2">
                      Limited content access duration
                    </label>
                    <div className="limited-usage-wrap">
                      <InputField
                        parentClass="input"
                        isCompulsory
                        name="name"
                        placeholder="00"
                      />
                      <ReactSelect
                        parentClass="select-duration"
                        options={[
                          { value: 'Months', label: 'Months' },
                          { value: 'Year', label: 'Year' },
                          { value: 'Life Time', label: 'Life Time' },
                        ]}
                        placeholder="Teacher"
                        name="select2"
                      />
                    </div>
                  </div>
                  <InputField
                    prefix="$"
                    label="Price"
                    isCompulsory
                    name="name"
                    placeholder="Enter Price"
                  />
                </div>
                <TextArea name="s" placeholder="Enter Note" label="Note" rows={4} />
                {/* <TextArea
                  name="s"
                  placeholder="Enter Benefits"
                  label="Benefits"
                  rows={4}
                /> */}
                <div className="subscription-courses-iner-card">
                  <label className="group-label input-label ">
                    Full Platform Access
                  </label>
                  <RadioButtonGroup
                    label="Want to add Full Platform Access for this subscription?"
                    optionWrapper="gap-4 !flex-row"
                    name="namesw"
                    options={[
                      {
                        label: 'Yes',
                        value: 'Yes',
                      },
                      {
                        label: 'No',
                        value: 'No',
                      },
                    ]}
                  />
                </div>
                <div className="subscription-courses-iner-card">
                  <label className="group-label input-label ">Courses Access</label>
                  <label className="input-label !mb-0">
                    Add course access for this plan
                  </label>
                  <Checkbox id="allcourse" text="All Courses Access" />
                  <div className="subscription-courses-access-items">
                    {subscriptionCoursesAccess.map((e, i) => {
                      return (
                        <div
                          className="subscription-courses-access-item"
                          key={i + 1}
                        >
                          <div className="icon">
                            <Image iconName={e.icon} />
                          </div>
                          <span className="text">{e.title}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="subscription-courses-select-option">
                    <Checkbox text="Select All Self Paced Courses" />
                    <Checkbox text="Select Custom" />
                  </div>

                  <div className="subscription-courses-select-wrap">
                    <div className="subscription-courses-select-title">
                      <p className="group-label input-label ">
                        All Self paced Courses
                      </p>
                      <Checkbox text="Select All" />
                    </div>
                    <div className="subscription-courses-select-list">
                      <div className="subscription-select-courses">
                        <Image src="./images/blog-1.png" isFromDataBase />
                        <Checkbox parentClass="checkbox" />
                        <div className="content">
                          <p>Inclusive Communication Training</p>
                        </div>
                      </div>
                      <div className="subscription-select-courses">
                        <Image src="./images/blog-1.png" isFromDataBase />
                        <Checkbox parentClass="checkbox" />
                        <div className="content">
                          <p>Inclusive Communication Training</p>
                        </div>
                      </div>
                      <div className="subscription-select-courses">
                        <Image src="./images/blog-1.png" isFromDataBase />
                        <Checkbox parentClass="checkbox" />
                        <div className="content">
                          <p>Inclusive Communication Training</p>
                        </div>
                      </div>
                      <div className="subscription-select-courses">
                        <Image src="./images/blog-1.png" isFromDataBase />
                        <Checkbox parentClass="checkbox" />
                        <div className="content">
                          <p>Inclusive Communication Training</p>
                        </div>
                      </div>
                      <div className="subscription-select-courses">
                        <Image src="./images/blog-1.png" isFromDataBase />
                        <Checkbox parentClass="checkbox" />
                        <div className="content">
                          <p>Inclusive Communication Training</p>
                        </div>
                      </div>
                      <div className="subscription-select-courses">
                        <Image src="./images/blog-1.png" isFromDataBase />
                        <Checkbox parentClass="checkbox" />
                        <div className="content">
                          <p>Inclusive Communication Training</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="subscription-courses-iner-card">
                  <label className="group-label input-label ">Community</label>
                  <RadioButtonGroup
                    label="Want to add Community access  for this subscription?"
                    optionWrapper="gap-4 !flex-row"
                    name="namesw"
                    options={[
                      {
                        label: 'Yes',
                        value: 'Yes',
                      },
                      {
                        label: 'No',
                        value: 'No',
                      },
                    ]}
                  />
                </div>
                <div className="subscription-courses-iner-card">
                  <label className="group-label input-label ">
                    ASL Dictionary Access
                  </label>
                  <RadioButtonGroup
                    label="Want to add ASL Dictionary Access for this subscription?"
                    optionWrapper="gap-4 !flex-row"
                    name="namesw"
                    options={[
                      {
                        label: 'Yes',
                        value: 'Yes',
                      },
                      {
                        label: 'No',
                        value: 'No',
                      },
                    ]}
                  />
                </div>
                <div className="justify-end flex">
                  <Button variants="black">Add Subscription</Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {/* Create Subscription  */}
    </>
  );
};

export default Static5;
