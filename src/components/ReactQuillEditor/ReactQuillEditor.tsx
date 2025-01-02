import ErrorMessage from 'components/FormElement/ErrorMessage';
import Image from 'components/Image';
import { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style/style.css';

type Editor = {
  imageField?: boolean;
  name: string;
  value: string;
  parentClass?: string;
  setFieldValue?: (field: string, value: string, shouldValidate?: boolean) => void;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
  label?: string;
  labelClass?: string;
  isCompulsory?: boolean;
  disabled?: boolean;
  placeholder?: string;
  styles?: Object;
  onChange?: (content: string) => void;
  isLoading?: boolean;
};

const ReactEditor = ({
  imageField,
  value,
  name,
  parentClass,
  setFieldValue,
  setFieldTouched,
  label,
  labelClass,
  isCompulsory,
  disabled,
  placeholder,
  styles,
  onChange,
  isLoading = false,
}: Editor) => {
  const quillObj = useRef<ReactQuill | null>(null);

  const BlockEmbed = Quill.import('blots/block/embed');

  class DividerBlot extends BlockEmbed {
    static create() {
      const node = super.create();
      node.setAttribute('style', 'border-top: 1px solid #000; margin: 10px 0;');
      return node;
    }
  }

  DividerBlot.blotName = 'divider';
  DividerBlot.tagName = 'hr';

  Quill.register(DividerBlot);

  const insertDivider = () => {
    const quill = quillObj.current?.getEditor();
    if (quill) {
      const range = quill.getSelection();
      if (range) {
        quill.insertText(range.index, '\n', 'user');
        quill.insertEmbed(range.index + 1, 'divider', true);
        quill.insertText(range.index + 2, '\n', 'user');
        quill.setSelection(range.index + 3, 0);
      }
    } else {
      console.error('Quill editor instance is not initialized');
    }
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        handlers: {
          divider: insertDivider, // Custom handler
        },
        container: [
          [{ header: [1, 2, 3] }],
          [{ font: [] }],
          [{ size: [] }],
          [{ align: ['', 'right', 'center', 'justify'] }],
          ['bold', 'italic', 'underline', 'blockquote'],
          [{ color: [] }, { background: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          imageField ? ['link', 'image'] : [],
          ['link', 'image', 'video'],
          ['clean'],
          [{ divider: 'divider' }],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'color',
    'background',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'video',
    'divider',
  ];

  const handleContentChange = (
    _content: any,
    _delta: any,
    _source: any,
    editor: any
  ) => {
    if (setFieldValue && editor) {
      const newContent = editor.getHTML();
      setFieldValue(name, newContent);
    }

    if (onChange) {
      const newContent = editor.getHTML();
      onChange(newContent);
    }
  };

  return (
    <div className={`w-full ${parentClass ?? ''}`}>
      {label && (
        <label className={`input-label ${labelClass ?? ''}`} htmlFor={name}>
          {label}
          {isCompulsory && <span className="text-red-700">*</span>}
        </label>
      )}
      <ReactQuill
        className="notranslate"
        ref={(el) => {
          quillObj.current = el;
        }}
        theme="snow"
        value={value || undefined}
        onChange={handleContentChange}
        formats={formats}
        modules={modules}
        style={{ width: '100%', border: '1px solid #000', ...styles }}
        onBlur={() => {
          setFieldTouched?.(name, true, true);
        }}
        readOnly={disabled}
        placeholder={placeholder}
      />
      {isLoading ? (
        <div className="relative ">
          <Image loaderClassName="absolute right-3 bottom-2" loaderType="Spin" />
        </div>
      ) : (
        ''
      )}
      <ErrorMessage name={name} />
    </div>
  );
};

export default ReactEditor;
