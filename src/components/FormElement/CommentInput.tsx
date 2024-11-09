import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { Conversations } from 'modules/Community/types';
import DropZone from './DropZoneField';
import { EnumFileType } from './enum';
import InputField from './InputField';
import './style/commentInput.css';

interface ICommentInputProps {
  className?: string;
  placeHolder?: string;
  isReply?: boolean;
  postData?: Conversations;
  toggleComments?: () => void;
  parentId?: string;
  refetch?: (postId: string) => void;
  countRefetch?: () => void;
}

const CommentInput = ({
  isReply,
  className,
  placeHolder,
  postData,
  parentId,
  toggleComments,
  refetch,
  countRefetch,
}: ICommentInputProps) => {
  const [createComment] = useAxiosPost();
  const initialValues = {
    post_id: postData?.id,
    description: '',
    attachments: [],
    parent_thread_id: parentId ?? null,
  };
  const OnSubmit = async (values: FormikValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((item) => {
          formData.append('attachments', item);
        });
      } else if (!Array.isArray(value)) {
        if (key === 'description' && value === '') return;
        formData.append(key, value as string);
      }
    });
    const { error } = await createComment('/comment', formData);
    if (!error) {
      if (postData?.id) {
        countRefetch?.();
        refetch?.(postData?.id);
      }
    }
  };
  return (
    <div className={`comment-input ${className ?? ''}`}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          OnSubmit(values);
          resetForm();
        }}
        // enableReinitialize
      >
        {({ values, setFieldValue }) => {
          const isButtonDisabled =
            !values.description && values.attachments.length === 0;
          return (
            <Form>
              <div className="comment-input-wrap">
                <InputField
                  parentClass="input-wrap"
                  placeholder={placeHolder ?? 'Comment here..'}
                  type="text"
                  className="text-input"
                  value={values.description}
                  name="description"
                />

                <DropZone
                  isCompulsory
                  name="attachments"
                  setValue={setFieldValue}
                  acceptTypes="image/*"
                  value={values?.attachments}
                  variant="commentFileInput"
                  isMulti
                  fileInputIcon="linkIcon"
                  fileType={EnumFileType.Image}
                />
              </div>

              {isReply ? (
                <>
                  {/*  */}
                  <Button
                    type="submit"
                    className={`comment-input-submit ${isButtonDisabled ? 'cursor-not-allowed' : ''}`}
                    disabled={isButtonDisabled}
                  >
                    <Image iconName="send" />
                  </Button>
                </>
              ) : (
                <div className="comment-submit">
                  <Button
                    variants="black"
                    type="submit"
                    className={`w-fit ${isButtonDisabled ? 'cursor-not-allowed' : ''}`}
                    disabled={isButtonDisabled}
                  >
                    Send
                  </Button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
      {!isReply && (
        <div className="coment-count">
          <Button onClickHandler={toggleComments}>
            {postData?.parentCommentCount} Comments
          </Button>
          <Image iconName="chevronRight" />
        </div>
      )}
    </div>
  );
};

export default CommentInput;
