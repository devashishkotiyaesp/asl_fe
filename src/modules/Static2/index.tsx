import Button from 'components/Button/Button';
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType, fileInputEnum } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import RadioButtonGroup from 'components/FormElement/RadioInput';
import ReactSelect from 'components/FormElement/ReactSelect';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import PageHeader from 'components/PageHeader';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import SearchComponent from 'components/search';
import TopicCard from 'components/TopicCard';
import { Form, Formik } from 'formik';
import { useModal } from 'hooks/useModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './index.css';

const Static2 = () => {
  const { t } = useTranslation();
  const AddModule = useModal();
  const CoursePreview = useModal();
  const ViewFeedback = useModal();
  const ReplyFeedback = useModal();

  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      {/* 404 START HERE */}
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
      {/* 404 END HERE */}

      <div className="grid grid-cols-4 gap-5">
        <TopicCard
          // imagePath="images/blog-1.png"
          title="ASL Beyond the Classroom"
          description="Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat orci netus lectus nulla turpis. Rhoncus nec tempor natoque; litora ac senectus nulla. Suspendisse quisque "
          time={10}
          conversationCount={6}
        />
        <TopicCard
          imagePath="images/blog-1.png"
          title="ASL Beyond the Classroom"
          description="Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat orci netus lectus nulla turpis. Rhoncus nec tempor natoque; litora ac senectus nulla. Suspendisse quisque "
          time={10}
          conversationCount={6}
        />
        <TopicCard
          // imagePath="images/blog-1.png"
          title="ASL Beyond the Classroom"
          description="Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat orci netus lectus nulla turpis. Rhoncus nec tempor natoque; litora ac senectus nulla. Suspendisse quisque "
          time={10}
          conversationCount={6}
        />
      </div>
      <div className="my-12" />
      <PageHeader title="Self Paced Courses" url="./" />
      <div className="content-base">
        {/* MAKE COMPONENT */}
        <div className="step-wrapper flex items-center">
          <div className="step-item active">
            <span className="step-item__number">1</span>
            {/* <span className="step-item__languages">English</span> */}
          </div>
          <div className="step-item">
            <span className="step-item__number">2</span>
            {/* <span className="step-item__languages">Spanish</span> */}
          </div>
          <div className="step-item">
            <span className="step-item__number">3</span>
            {/* <span className="step-item__languages">Spanish</span> */}
          </div>
        </div>
        {/* MAKE COMPONENT */}

        {/* <div className=""></div> */}
        <Card isGray className="course-inner-card">
          <div className="course-card-title">Basic Course Details</div>
          <Formik
            initialValues={{
              name: '',
              email: '',
              short_description: '',
              image: '',
              image1: '',
              select: '',
              select2: '',
              radio: '',
            }}
            onSubmit={() => {
              // console.log('');
            }}
          >
            {({ values, setFieldValue, setFieldTouched }) => {
              return (
                <Form className="">
                  <div className="row">
                    <div className="left-part">
                      <DropZone
                        fileInputIcon="camera"
                        name="image"
                        setValue={setFieldValue}
                        value={values.image}
                        isCompulsory
                        label="Upload Banner"
                        SubTitle="Upload Photo or Video"
                        acceptTypes="image/*"
                        fileType={EnumFileType.Image}
                        // isMulti
                      />
                      <DropZone
                        fileInputIcon="camera"
                        name="image1"
                        setValue={setFieldValue}
                        value={values.image1}
                        isCompulsory
                        label="Upload Collaboration logos "
                        SubTitle="Upload logos"
                        acceptTypes="image/*"
                        fileType={EnumFileType.Image}
                        isMulti
                      />
                      <DropZone
                        fileInputIcon="camera"
                        name="image1"
                        setValue={setFieldValue}
                        value={values.image1}
                        isCompulsory
                        Title="Upload .SRT file"
                        label="Upload caption (.SRT file)"
                        SubTitle="Upload logos"
                        acceptTypes="image/*"
                        // fileType={EnumFileType.}
                        variant={fileInputEnum.LinkFileInput}
                        isMulti
                      />
                    </div>
                    <div className="right-part">
                      <InputField name="ds" label="Course Name" />
                      <ReactEditor
                        label="Course Description"
                        parentClass="h-unset"
                        name="short_description"
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        value={values?.short_description}
                      />
                      <ReactSelect
                        name="select"
                        options={[
                          { value: 'chocolate', label: 'Chocolate' },
                          { value: 'strawberry', label: 'Strawberry' },
                          { value: 'vanilla', label: 'Vanilla' },
                        ]}
                        isMulti
                        placeholder="Course Level"
                        label="Course Level"
                      />
                      <ReactSelect
                        options={[
                          { value: 'chocolate', label: 'Chocolate' },
                          { value: 'strawberry', label: 'Strawberry' },
                          { value: 'vanilla', label: 'Vanilla' },
                        ]}
                        placeholder="Teacher"
                        label="Teacher"
                        name="select2"
                      />
                      <RadioButtonGroup
                        label="Fee"
                        optionWrapper="flex flex-wrap gap-4"
                        options={[
                          {
                            label: 'Label1',
                            value: 'Label1',
                          },
                          {
                            label: 'Label2',
                            value: 'Label2',
                          },
                          {
                            label: 'Label3',
                            value: 'Label3',
                          },
                        ]}
                        name="radio"
                      />
                      <div className="cms-button">
                        <InputField
                          name="sdsd"
                          label="Link button"
                          placeholder="Enter Link button"
                        />

                        <InputField
                          name="collaboration_logos_title"
                          label="collaboration logos title"
                          placeholder="Enter collaboration logos title"
                        />
                      </div>
                      <div className="cms-button">
                        <InputField
                          name="sdsd"
                          label="Link button"
                          placeholder="Enter Link button"
                        />
                        <InputField
                          name="sdsd"
                          label="Link button URL"
                          placeholder="Enter Link button URL"
                        />
                      </div>
                      <div className="point-list-item">
                        <span className="point-list-item__title">Point 1</span>
                        <InputField
                          name="sdsd"
                          label="Point title"
                          placeholder="Enter Point title"
                        />
                        <TextArea
                          rows={5}
                          name="sd"
                          label="Point Description "
                          placeholder="Write.."
                        />
                      </div>
                      <div className="point-list-item">
                        <div className="point-list-item__title">
                          <span className="text">Point 1</span>
                          <Button className="icon icon-delete">
                            <Image iconName="trashIcon" />
                          </Button>
                        </div>

                        <div className="left-part">
                          <DropZone
                            fileInputIcon="camera"
                            name="image1"
                            setValue={setFieldValue}
                            value={values.image1}
                            isCompulsory
                            label="Upload Collaboration logos "
                            SubTitle="Upload logos"
                            acceptTypes="image/*"
                            fileType={EnumFileType.Image}
                            // isMulti
                          />
                        </div>
                        <div className="right-part">
                          <InputField
                            name="sdsd"
                            label="Point title"
                            placeholder="Enter Point title"
                          />
                          <TextArea
                            rows={5}
                            name="sd"
                            label="Point Description "
                            placeholder="Write.."
                          />
                          <div className="cms-button simple">
                            <InputField
                              name="sdsd"
                              label="Link button"
                              placeholder="Enter Link button"
                            />
                            <InputField
                              name="sdsd"
                              label="Link button URL"
                              placeholder="Enter Link button URL"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bnt-wrap">
                        <Button variants="black" className="w-fit">
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </div>

      {/* PART 2 */}
      <div className="my-12" />
      <PageHeader title="Create Course" url="./" />
      <div className="content-base">
        {/* MAKE COMPONENT */}
        <div className="step-wrapper flex items-center">
          <div className="step-item active">
            <span className="step-item__number">1</span>
            {/* <span className="step-item__languages">English</span> */}
          </div>
          <div className="step-item">
            <span className="step-item__number">2</span>
            {/* <span className="step-item__languages">Spanish</span> */}
          </div>
          <div className="step-item">
            <span className="step-item__number">3</span>
            {/* <span className="step-item__languages">Spanish</span> */}
          </div>
        </div>
        {/* MAKE COMPONENT */}

        <div className="select-module-wrap">
          <div className="select-module-item">
            <Checkbox id="check1" reverse name="name" text="Course with Modules" />
          </div>
          <div className="select-module-item">
            <Checkbox id="check2" reverse name="name" text="Course with Modules" />
          </div>
        </div>

        <div className="module-add-head-wrap">
          <span className="module-add-head-title">Course with modules</span>
          <Button
            className="w-fit"
            variants="PrimaryWood"
            onClickHandler={() => AddModule.openModal()}
          >
            Add Module
          </Button>
        </div>
        <Formik
          initialValues={{
            name: '',
            image1: '',
            short_description: '',
          }}
          onSubmit={() => {
            // console.log('');
          }}
        >
          {/* { values, setFieldValue, setFieldTouched } */}
          {({ values, setFieldValue, setFieldTouched }) => {
            return (
              <Form className="">
                <Card isGray className="module-inner-card">
                  <div className="accordion-wrap module-acc-wrap">
                    <div className="accordion-item module-acc-item">
                      <div className="accordion-title module-acc-title">
                        <div className="dnd-icon">
                          <Image iconName="dNDIcon" />
                        </div>
                        <span className="title">Module 1</span>
                        <div className="module-acc-status">
                          <span>Quiz Added</span>
                        </div>
                        <div className="btn-wrap">
                          <Button variants="PrimaryWoodLight" className="w-fit">
                            <Image iconName="copyFile" /> Duplicate Module
                          </Button>
                          <Button variants="RedOpacity" className="w-fit">
                            <Image iconName="trashIcon" /> Delete Module
                          </Button>
                        </div>
                        <div className="module-acc-arrow">
                          <Image iconName="chevronRight" />
                        </div>
                      </div>
                      <div className="accordion-content module-acc-content">
                        <DropZone
                          fileInputIcon="camera"
                          name="image1"
                          setValue={setFieldValue}
                          value={values.image1}
                          isCompulsory
                          label="Cover Image"
                          SubTitle="Upload logos"
                          acceptTypes="image/*"
                          fileType={EnumFileType.Image}
                          parentClass="max-w-[300px]"
                          // isMulti
                        />
                        <div className="module-name-wrap">
                          <InputField name="name" label="Module Title" />
                          <div className="btn-wrap">
                            <Button variants="PrimaryWoodLight">Add Quiz</Button>
                            <Button variants="blackBorder">
                              <Image iconName="plusSquare" />
                              Add Lesson
                            </Button>
                          </div>
                        </div>

                        <div className="lesson-entry-card-wrap">
                          <Card className="lesson-entry-card">
                            <span className="lesson-entry-card-delete">Delete</span>
                            <div className="dnd-icon">
                              <Image iconName="dNDIcon" />
                            </div>
                            <div className="inner">
                              <InputField
                                name="name"
                                label="Lesson Title"
                                parentClass="mb-5"
                              />
                              <ReactEditor
                                placeholder="Enter Description"
                                label="Lesson Description "
                                parentClass="h-unset"
                                name="short_description"
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                value={values?.short_description}
                              />

                              <div className="lesson-entry-media">
                                <DropZone
                                  fileInputIcon="imageIcon"
                                  name="image1"
                                  setValue={setFieldValue}
                                  value={values.image1}
                                  isCompulsory
                                  label="Lesson Banner"
                                  SubTitle="Upload"
                                  acceptTypes="image/*"
                                  fileType={EnumFileType.Image}
                                  // isMulti
                                />
                                <DropZone
                                  fileInputIcon="playButtonRound"
                                  name="image1"
                                  setValue={setFieldValue}
                                  value={values.image1}
                                  isCompulsory
                                  label="Lesson Video"
                                  SubTitle="Upload"
                                  acceptTypes="image/*"
                                  fileType={EnumFileType.Video}
                                  // isMulti
                                />
                                <div className="lesson-entry-media-caption">
                                  <DropZone
                                    fileInputIcon="imageIcon"
                                    name="image1"
                                    setValue={setFieldValue}
                                    value={values.image1}
                                    isCompulsory
                                    label="Lesson Banner"
                                    Title="Upload .SRT file"
                                    acceptTypes="image/*"
                                    // fileType={EnumFileType.Image}
                                    variant={fileInputEnum.LinkFileInput}
                                    // isMulti
                                  />
                                  <InputField name="name" label="Lesson Title" />
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="bnt-wrap module-card-action">
                  <Button variants="PrimaryWoodBorder" className="w-fit">
                    Back
                  </Button>
                  <Button variants="PrimaryWood" className="w-fit">
                    Course Preview
                  </Button>
                  <Button variants="blackBorder" className="w-fit">
                    Save as a Draft
                  </Button>
                  <Button variants="black" className="w-fit">
                    Next
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {/* Add Modual Modal */}
      <Modal
        width="max-w-[1000px]"
        headerTitle="Add Quiz (Module 1)"
        modal={AddModule}
        modalBodyClassName="module-add-quiz-modal"
      >
        <>
          <Formik
            initialValues={{
              name: '',
              image1: '',
              short_description: '',
            }}
            onSubmit={() => {
              // console.log('');
            }}
          >
            {/* { values, setFieldValue, setFieldTouched } */}
            {({ values, setFieldValue }) => {
              return (
                <Form className="">
                  <div className="module-add-filed-wrap">
                    {/* OPTION 1 */}
                    <div className="module-add-filed-item">
                      <span className="module-add-filed-counter">1</span>
                      <div className="module-add-filed-inner">
                        <div className="module-add-question-wrap">
                          <InputField
                            parentClass="module-add-question-text"
                            name="ds"
                            placeholder="Enter Question"
                          />

                          <DropZone
                            fileInputIcon="camera"
                            name="image1"
                            setValue={setFieldValue}
                            value={values.image1}
                            isCompulsory
                            Title="Upload file"
                            acceptTypes="image/*"
                            variant={fileInputEnum.LinkFileInput}
                            parentClass="module-add-question-file"
                          />
                          <ReactSelect
                            name="select"
                            options={[
                              { value: 'chocolate', label: 'Multiple Choice' },
                              { value: 'strawberry', label: 'True/False' },
                              { value: 'vanilla', label: 'Short Answer' },
                              { value: 'vanilla', label: 'Order' },
                              { value: 'vanilla', label: 'Fill in the blank' },
                              { value: 'vanilla', label: 'Multiple Answers' },
                              { value: 'vanilla', label: 'Multi Answers' },
                            ]}
                            isMulti
                            placeholder="Multiple Choice"
                            parentClass="module-add-question-select"
                          />
                        </div>
                        <div className="module-add-question-option-wrap">
                          <div className="module-add-question-option">
                            <InputField
                              withFile
                              name="ds"
                              placeholder="Enter Question"
                            />
                            <InputField
                              withFile
                              name="ds"
                              placeholder="Enter Question"
                            />
                            <InputField
                              withFile
                              name="ds"
                              placeholder="Enter Question"
                            />
                            <InputField
                              withFile
                              name="ds"
                              placeholder="Enter Question"
                            />
                          </div>
                          <div className="module-add-question-correct">
                            <ReactSelect
                              name="select"
                              options={[
                                { value: 'chocolate', label: 'Multiple Choice' },
                                { value: 'strawberry', label: 'True/False' },
                                { value: 'vanilla', label: 'Short Answer' },
                                { value: 'vanilla', label: 'Order' },
                                { value: 'vanilla', label: 'Fill in the blank' },
                                { value: 'vanilla', label: 'Multiple Answers' },
                                { value: 'vanilla', label: 'Multi Answers' },
                              ]}
                              isMulti
                              placeholder="Multiple Choice"
                              parentClass="module-add-question-select"
                            />
                            <Button isIcon variants="PrimaryWood">
                              <Image iconName="plus" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OPTION 2 */}
                    <div className="module-add-filed-item">
                      <span className="module-add-filed-counter">2</span>
                      <div className="module-add-filed-inner">
                        <div className="module-add-question-wrap">
                          <InputField
                            parentClass="module-add-question-text"
                            name="ds"
                            placeholder="Enter Question"
                          />

                          <DropZone
                            fileInputIcon="camera"
                            name="image1"
                            setValue={setFieldValue}
                            value={values.image1}
                            isCompulsory
                            Title="Upload file"
                            acceptTypes="image/*"
                            variant={fileInputEnum.LinkFileInput}
                            parentClass="module-add-question-file"
                          />
                          <ReactSelect
                            name="select"
                            options={[
                              { value: 'chocolate', label: 'Multiple Choice' },
                              { value: 'strawberry', label: 'True/False' },
                              { value: 'vanilla', label: 'Short Answer' },
                              { value: 'vanilla', label: 'Order' },
                              { value: 'vanilla', label: 'Fill in the blank' },
                              { value: 'vanilla', label: 'Multiple Answers' },
                              { value: 'vanilla', label: 'Multi Answers' },
                            ]}
                            isMulti
                            placeholder="Multiple Choice"
                            parentClass="module-add-question-select"
                          />
                          <Button isIcon variants="Red">
                            <Image iconName="trashIcon" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* OPTION 3 */}
                    <div className="module-add-filed-item">
                      <span className="module-add-filed-counter">3</span>
                      <div className="module-add-filed-inner">
                        <div className="module-add-question-wrap">
                          <InputField
                            parentClass="module-add-question-text"
                            name="ds"
                            placeholder="Enter Question"
                          />

                          <DropZone
                            fileInputIcon="camera"
                            name="image1"
                            setValue={setFieldValue}
                            value={values.image1}
                            isCompulsory
                            Title="Upload file"
                            acceptTypes="image/*"
                            variant={fileInputEnum.LinkFileInput}
                            parentClass="module-add-question-file"
                          />
                          <ReactSelect
                            name="select"
                            options={[
                              { value: 'chocolate', label: 'Multiple Choice' },
                              { value: 'strawberry', label: 'True/False' },
                              { value: 'vanilla', label: 'Short Answer' },
                              { value: 'vanilla', label: 'Order' },
                              { value: 'vanilla', label: 'Fill in the blank' },
                              { value: 'vanilla', label: 'Multiple Answers' },
                              { value: 'vanilla', label: 'Multi Answers' },
                            ]}
                            isMulti
                            placeholder="Multiple Choice"
                            parentClass="module-add-question-select"
                          />
                          <Button isIcon variants="Red">
                            <Image iconName="trashIcon" />
                          </Button>
                        </div>
                        <div className="module-add-question-option-wrap">
                          <div className="module-add-question-option column-single">
                            <InputField
                              // withFile
                              name="ds"
                              placeholder="Enter Question"
                            />
                          </div>
                          <Button isIcon variants="PrimaryWood">
                            <Image iconName="plus" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* OPTION 4 */}
                    <div className="module-add-filed-item">
                      <span className="module-add-filed-counter">4</span>
                      <div className="module-add-filed-inner">
                        <div className="module-add-question-wrap">
                          <InputField
                            parentClass="module-add-question-text"
                            name="ds"
                            placeholder="Enter Question"
                          />

                          <DropZone
                            fileInputIcon="camera"
                            name="image1"
                            setValue={setFieldValue}
                            value={values.image1}
                            isCompulsory
                            Title="Upload file"
                            acceptTypes="image/*"
                            variant={fileInputEnum.LinkFileInput}
                            parentClass="module-add-question-file"
                          />
                          <ReactSelect
                            name="select"
                            options={[
                              { value: 'chocolate', label: 'Multiple Choice' },
                              { value: 'strawberry', label: 'True/False' },
                              { value: 'vanilla', label: 'Short Answer' },
                              { value: 'vanilla', label: 'Order' },
                              { value: 'vanilla', label: 'Fill in the blank' },
                              { value: 'vanilla', label: 'Multiple Answers' },
                              { value: 'vanilla', label: 'Multi Answers' },
                            ]}
                            isMulti
                            placeholder="Multiple Choice"
                            parentClass="module-add-question-select"
                          />
                          <Button isIcon variants="Red">
                            <Image iconName="trashIcon" />
                          </Button>
                        </div>
                        <div className="module-add-question-option-wrap">
                          <div className="module-add-question-option column-four">
                            <InputField name="ds" placeholder="Enter Question" />
                            <InputField name="ds" placeholder="Enter Question" />
                            <InputField name="ds" placeholder="Enter Question" />
                            <InputField name="ds" placeholder="Enter Question" />
                          </div>
                          <div className="module-add-question-correct">
                            <Button isIcon variants="PrimaryWood">
                              <Image iconName="plus" />
                            </Button>
                            <Button isIcon variants="Red">
                              <Image iconName="trashIcon" />
                            </Button>
                          </div>
                          <div className="module-add-question-order-wrap">
                            <div className="module-add-question-order-item text">
                              Answer <span>(Drag & Drop)</span>
                            </div>
                            <div className="module-add-question-order-item">
                              <InputField name="ds" placeholder="Enter Question" />
                            </div>
                            <div className="module-add-question-order-item">
                              <InputField name="ds" placeholder="Enter Question" />
                            </div>
                            <div className="module-add-question-order-item">
                              <InputField name="ds" placeholder="Enter Question" />
                            </div>
                            <div className="module-add-question-order-item">
                              <InputField name="ds" placeholder="Enter Question" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OPTION 5 */}
                    <div className="module-add-filed-item">
                      <span className="module-add-filed-counter">5</span>
                      <div className="module-add-filed-inner">
                        <div className="module-add-question-wrap">
                          <DropZone
                            fileInputIcon="camera"
                            name="image1"
                            setValue={setFieldValue}
                            value={values.image1}
                            isCompulsory
                            Title="Upload file"
                            acceptTypes="image/*"
                            variant={fileInputEnum.LinkFileInput}
                            parentClass="module-add-question-file"
                          />
                          <ReactSelect
                            name="select"
                            options={[
                              { value: 'chocolate', label: 'Multiple Choice' },
                              { value: 'strawberry', label: 'True/False' },
                              { value: 'vanilla1', label: 'Short Answer' },
                              { value: 'vanilla2', label: 'Order' },
                              { value: 'vanilla3', label: 'Fill in the blank' },
                              { value: 'vanilla4', label: 'Multiple Answers' },
                              { value: 'vanilla5', label: 'Multi Answers' },
                            ]}
                            // isMulti
                            placeholder="Multiple Choice"
                            parentClass="module-add-question-select"
                          />
                        </div>
                        <div className="module-add-question-option-wrap">
                          <div className="module-add-fill-blank">
                            <div className="module-add-fill-blank-question">
                              <Button
                                className="whitespace-nowrap"
                                variants="PrimaryWoodBorder"
                              >
                                Add Blank
                              </Button>
                              <InputField
                                name="ds"
                                placeholder="Enter Question"
                                value="Hi My name is _______.My home is _______ and _________."
                              />
                            </div>
                            <div className="module-add-fill-blank-select">
                              <div className="module-add-fill-blank-select-wrap">
                                <InputField
                                  // withFile
                                  name="ds"
                                  placeholder="Enter Question"
                                />
                                <InputField
                                  // withFile
                                  name="ds"
                                  placeholder="Enter Question"
                                />
                                <InputField
                                  // withFile
                                  name="ds"
                                  placeholder="Enter Question"
                                />
                              </div>
                              <ReactSelect
                                name="select"
                                options={[
                                  { value: 'chocolate', label: 'Multiple Choice' },
                                  { value: 'strawberry', label: 'True/False' },
                                  { value: 'vanilla', label: 'Short Answer' },
                                  { value: 'vanilla', label: 'Order' },
                                  { value: 'vanilla', label: 'Fill in the blank' },
                                  { value: 'vanilla', label: 'Multiple Answers' },
                                  { value: 'vanilla', label: 'Multi Answers' },
                                ]}
                                isMulti
                                placeholder="Multiple Choice"
                                parentClass="module-add-question-select"
                              />
                              <Button isIcon variants="Red">
                                <Image iconName="trashIcon" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OPTION 6 */}
                    <div className="module-add-filed-item">
                      <span className="module-add-filed-counter">6</span>
                      <div className="module-add-filed-inner">
                        <div className="module-add-question-wrap">
                          <InputField
                            parentClass="module-add-question-text"
                            name="ds"
                            placeholder="Enter Question"
                          />

                          <DropZone
                            fileInputIcon="camera"
                            name="image1"
                            setValue={setFieldValue}
                            value={values.image1}
                            isCompulsory
                            Title="Upload file"
                            acceptTypes="image/*"
                            variant={fileInputEnum.LinkFileInput}
                            parentClass="module-add-question-file"
                          />
                          <ReactSelect
                            name="select"
                            options={[
                              { value: 'chocolate', label: 'Multiple Choice' },
                              { value: 'strawberry', label: 'True/False' },
                              { value: 'vanilla', label: 'Short Answer' },
                              { value: 'vanilla', label: 'Order' },
                              { value: 'vanilla', label: 'Fill in the blank' },
                              { value: 'vanilla', label: 'Multiple Answers' },
                              { value: 'vanilla', label: 'Multi Answers' },
                            ]}
                            isMulti
                            placeholder="Multiple Choice"
                            parentClass="module-add-question-select"
                          />
                        </div>
                        <div className="module-add-question-option-wrap">
                          <div className="module-add-question-option column-four">
                            <InputField name="ds" placeholder="Enter Question" />
                            <InputField name="ds" placeholder="Enter Question" />
                            <InputField name="ds" placeholder="Enter Question" />
                            <InputField name="ds" placeholder="Enter Question" />
                          </div>
                          <div className="module-add-question-correct">
                            <Button isIcon variants="Red">
                              <Image iconName="trashIcon" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OPTION 7 */}
                    <div className="module-add-filed-item">
                      <span className="module-add-filed-counter">7</span>
                      <div className="module-add-filed-inner">
                        <div className="module-add-question-wrap">
                          <InputField
                            parentClass="module-add-question-text"
                            name="ds"
                            placeholder="Enter Question"
                          />

                          <DropZone
                            fileInputIcon="camera"
                            name="image1"
                            setValue={setFieldValue}
                            value={values.image1}
                            isCompulsory
                            Title="Upload file"
                            acceptTypes="image/*"
                            variant={fileInputEnum.LinkFileInput}
                            parentClass="module-add-question-file"
                          />
                          <ReactSelect
                            name="select"
                            options={[
                              { value: 'chocolate', label: 'Multiple Choice' },
                              { value: 'strawberry', label: 'True/False' },
                              { value: 'vanilla', label: 'Short Answer' },
                              { value: 'vanilla', label: 'Order' },
                              { value: 'vanilla', label: 'Fill in the blank' },
                              { value: 'vanilla', label: 'Multiple Answers' },
                              { value: 'vanilla', label: 'Multi Answers' },
                            ]}
                            isMulti
                            placeholder="Multiple Choice"
                            parentClass="module-add-question-select"
                          />
                        </div>
                        <div className="module-add-question-option-wrap">
                          <div className="module-add-question-option column-four">
                            <InputField name="ds" placeholder="Enter Question" />
                            <InputField name="ds" placeholder="Enter Question" />
                            <InputField name="ds" placeholder="Enter Question" />
                            <InputField name="ds" placeholder="Enter Question" />
                          </div>
                          <div className="module-add-question-correct">
                            <Button isIcon variants="PrimaryWood">
                              <Image iconName="plus" />
                            </Button>
                            <Button isIcon variants="Red">
                              <Image iconName="trashIcon" />
                            </Button>
                          </div>
                          <div className="modual-add-answer-list">
                            <span className="title">Answers</span>
                            <div className="modual-add-answer-item">
                              <Checkbox id="hello1" name="sd" text="Order 1" />
                            </div>
                            <div className="modual-add-answer-item">
                              <Checkbox id="hello2" name="sd" text="Order 2" />
                            </div>
                            <div className="modual-add-answer-item">
                              <Checkbox id="hello3" name="sd" text="Order 3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="btn-wrap">
                    <Button variants="PrimaryWoodBorder">Close</Button>
                    <Button variants="black">Update</Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {/* <div className="module-add-filed-wrap">
            <div className="module-add-filed-item">
              <span className="module-add-filed-counter">1</span>
              <div className="module-add-filed-inner">sdsd</div>
            </div>
          </div> */}
        </>
      </Modal>

      {/* PART 3 */}
      <div className="my-12" />
      <div className="content-base">
        {/* MAKE COMPONENT */}
        <div className="step-wrapper flex items-center">
          <div className="step-item active">
            <span className="step-item__number">1</span>
            {/* <span className="step-item__languages">English</span> */}
          </div>
          <div className="step-item">
            <span className="step-item__number">2</span>
            {/* <span className="step-item__languages">Spanish</span> */}
          </div>
          <div className="step-item">
            <span className="step-item__number">3</span>
            {/* <span className="step-item__languages">Spanish</span> */}
          </div>
        </div>
        {/* MAKE COMPONENT */}
        <Card isGray className="add-general-course">
          <div className="course-card-title">Privacy</div>

          <div className="general-course-privacy-table">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Users</th>
                    <th>Course Visibility</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Public</td>
                    <td>
                      <Checkbox name="we" />
                    </td>
                  </tr>
                  <tr>
                    <td>Course Editor</td>
                    <td>
                      <Checkbox name="we" />
                    </td>
                  </tr>
                  <tr>
                    <td>Teachers only</td>
                    <td>
                      <Checkbox name="we" />
                    </td>
                  </tr>
                  <tr>
                    <td>Only users from specific organization</td>
                    <td>
                      <Checkbox name="we" />
                    </td>
                  </tr>
                  <tr>
                    <td>Students</td>
                    <td>
                      <Checkbox name="we" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
        <div className="btn-wrap">
          <Button variants="PrimaryWoodBorder">Back</Button>
          <Button variants="PrimaryWood">Course Preview</Button>
          <Button variants="blackBorder">Save as a Draft</Button>
          <Button variants="black">Save & Publish</Button>
        </div>
      </div>

      {/* Course Preview (General Self-Paced Course) */}

      <Button variants="Red" onClickHandler={() => CoursePreview.openModal()}>
        Course Preview (General Self-Paced Course)
      </Button>

      <Modal
        width="max-w-[1000px]"
        headerTitle="Course Preview (General Self-Paced Course)"
        modal={CoursePreview}
      >
        <div className="course-preview-wrap">
          <div className="course-preview-title">
            <span>Deaf Empowerment Network</span>
          </div>
          <div className="course-preview-banner">
            <Image src="/images/banner.png" isFromDataBase={false} />
            <div className="course-preview-banner-other">
              <div className="course-preview-tag">
                <span>Beginner</span>
              </div>
              <div className="course-preview-type">
                <span>Self Paced</span>
                <span>General Course</span>
              </div>
            </div>
          </div>

          <div className="course-preview-details-modules">
            <div className="course-preview-details">
              <div className="course-preview-details-row row">
                <div className="left-part">
                  <span className="desc-title">Course Description</span>
                  <div className="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est
                    laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                  </div>
                  <ul>
                    <li>Basic Fingerspelling</li>
                    <li>Numbers</li>
                    <li>Feelings</li>
                    <li>Family Members</li>
                    <li>Colors</li>
                    <li>Basic ASL</li>
                  </ul>
                </div>
                <div className="right-part">
                  <span className="video-title">Preview Video</span>
                  <div className={`video-wrap ${!playVideo ? 'active' : ''}`}>
                    <Button
                      onClickHandler={() => setPlayVideo(!playVideo)}
                      className="icon"
                    >
                      {playVideo ? (
                        <Image iconName="pause" />
                      ) : (
                        <Image iconName="playButtonRound" />
                      )}
                    </Button>
                    <video
                      width="100%"
                      src="/videos/banner.mp4"
                      // controls
                      muted
                      // autoPlay
                      // loop
                    />
                  </div>

                  <div className="subscription-card">
                    <div className="subscription-duration">6 Months</div>
                    <p className="subscription-text">
                      Monthly self-paced ASL courses
                    </p>
                    <span className="subscription-sub-text">
                      Access to the full Self paced courses for{' '}
                    </span>
                    <p className="subscription-price">$120.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="course-preview-module bg-white">
            <div className="course-preview-module-row row">
              <div className="left-part">
                <ul className="course-preview-module-list">
                  <li className="active">
                    <Link to="./">
                      Sign Connect
                      <Image iconName="arrowRight" />
                    </Link>
                  </li>
                  <li>
                    <Link to="./">Signs for Everyone</Link>
                  </li>
                  <li>
                    <Link to="./">Signs for Everyone</Link>
                  </li>
                  <li>
                    <Link to="./">Bridge to Deaf Culture</Link>
                  </li>
                </ul>
              </div>
              <div className="right-part">
                <div className="sign-connect">
                  <div className="sign-connect-title">Sign Connect</div>
                  <div className="sign-connect-wrap">
                    <div className="sign-connect-left">
                      <Image
                        src="/images/course-card-1.png"
                        isFromDataBase={false}
                      />
                    </div>
                    <div className="sign-connect-right">
                      <Image src="/images/quiz-img.png" isFromDataBase={false} />
                      <div className="quiz-btn-wrap">
                        <Button variants="black">Quiz</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="module-lession">
                  <div className="module-lession-title">Lessons</div>
                  <div className="module-lession-list">
                    {/* MAKE IT COMPONENT */}
                    <div className="lecture-card">
                      <div className="lecture-card-image">
                        <Image src="/images/banner.png" isFromDataBase={false} />
                        <span className="lecture-card-ducation">03:00</span>
                      </div>
                      <div className="lecture-content">
                        <p>Course Introduction</p>
                        <span>need to break some news to you! You probably ..</span>
                      </div>
                    </div>
                    {/* MAKE IT COMPONENT */}
                    <div className="lecture-card">
                      <div className="lecture-card-image">
                        <Image src="/images/banner.png" isFromDataBase={false} />
                        <span className="lecture-card-ducation">03:00</span>
                      </div>
                      <div className="lecture-content">
                        <p>Course Introduction</p>
                        <span>need to break some news to you! You probably ..</span>
                      </div>
                    </div>
                    <div className="lecture-card">
                      <div className="lecture-card-image">
                        <Image src="/images/banner.png" isFromDataBase={false} />
                        <span className="lecture-card-ducation">03:00</span>
                      </div>
                      <div className="lecture-content">
                        <p>Course Introduction</p>
                        <span>need to break some news to you! You probably ..</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* FEED BACK MODULE START HERE */}
      <PageHeader title="Feedback">
        <SearchComponent
          parentClass="min-w-[300px]"
          placeholder={t('InputSearchPlaceholder')}
        />
      </PageHeader>

      <Button variants="Blue" onClickHandler={() => ViewFeedback.openModal()}>
        View Feedback
      </Button>
      <Button variants="Green" onClickHandler={() => ReplyFeedback.openModal()}>
        Reply Feedback
      </Button>

      <Modal modal={ReplyFeedback} headerTitle={t('Text.Reply')}>
        <div className="reply-feedback-modal">
          <div className="reply-feedback-org-wrap">
            <div className="reply-feedback-org-img">
              <Image src="/images/blog-3.png" isFromDataBase={false} />
            </div>
            <div className="reply-feedback-org-details">
              <div className="tag">Organization</div>
              <p className="name">
                The Learning Center for the Deaf <span>(Public School)</span>
              </p>
              <Link to="mailto:organization@gmail.com">Organization@gmail.com</Link>
            </div>
          </div>
          <div className="reply-feedback-msg">
            <label>{t('InquiryLabel')} :</label>
            <p>
              <em>
                “Really nice idea, this adds a little flavor to all those
                dummy-texts! I can recommend setting up keystrokes for this, it'll
                speed up the process a lot!”
              </em>
            </p>
          </div>
          <div className="reply-feedback-input">
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
                  <Form className="">
                    <TextArea
                      name="name"
                      label={t('Text.Reply')}
                      placeholder={t('TextareaTypePlaceholder')}
                      rows={5}
                    />
                    <div className="btn-wrap">
                      <Button variants="PrimaryWoodLightBorder">
                        {t('Settings.cancel')}
                      </Button>
                      <Button variants="black">{t('Text.Reply')}</Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal>
      <Modal modal={ViewFeedback} headerTitle={t('Feedback.InfoModal.Title')}>
        <div className="view-feedback-modal">
          <div className="view-feedback-profile">
            <Image src="/images/blog-3.png" isFromDataBase={false} />
          </div>
          <div className="view-feedback-info">
            <div className="feedback-filed-item">
              <span>Organization Name</span>
              <p>The Learning Center for the Deaf</p>
            </div>
            <div className="feedback-filed-item">
              <span>Email</span>
              <p>Organization@gmail.com</p>
            </div>
            <div className="feedback-filed-item">
              <span>Type of Organization</span>
              <p>Public School</p>
            </div>
            <div className="feedback-filed-item">
              <span>Feedback</span>
              <p>
                <em>
                  “Really nice idea, this adds a little flavor to all those
                  dummy-texts! I can recommend setting up keystrokes for this, it'll
                  speed up the process a lot!”
                </em>
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* FEED BACK MODULE END HERE */}
    </>
  );
};

export default Static2;
