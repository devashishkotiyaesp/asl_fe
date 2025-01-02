import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToast, removeToast } from 'reduxStore/slices/toastSlice';
import './style/toast.css';

const ToastIcon = (variant?: string) => {
  switch (variant) {
    case 'Error':
      return <Image iconName="crossIcon" iconClassName="w-full h-full relative" />;
    case 'Warning':
      return <Image iconName="infoIconI" iconClassName="w-full h-full relative" />;
    case 'Success':
      return <Image iconName="checkIcon" iconClassName="w-full h-full relative" />;
    case 'Info':
      return <Image iconName="infoIconI" iconClassName="w-full h-full relative" />;
    default:
      return <Image iconName="crossIcon" iconClassName="w-full h-full relative" />;
  }
};

const Toast = () => {
  const toastMessage = useSelector(getToast);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<number[]>([]);

  useEffect(() => {
    setTimeout(() => {
      return toastMessage.map((dat) => dispatch(removeToast({ id: dat.id }))) || [];
    }, 2000);
    setIsVisible(toastMessage.map((dat) => dat.id) || []);
  }, [toastMessage]);
  const ToastClasses = (type?: string, variant?: string) => {
    switch (variant) {
      case 'Error':
        return type === 'dark' ? 'error ' : ' ';
      case 'Warning':
        return type === 'dark' ? 'warning ' : ' ';
      case 'Success':
        return type === 'dark' ? 'success ' : ' ';
      case 'Info':
        return type === 'dark' ? 'info ' : ' ';
      default:
        return type === 'dark' ? ' ' : '';
    }
  };
  return (
    <>
      {toastMessage.length ? (
        <div className="toast-notification">
          {toastMessage.map((toast) => (
            <div
              key={toast.id}
              style={{
                opacity: isVisible.includes(toast.id) ? 1 : 0,
                transform: `translateX(${
                  isVisible.includes(toast.id) ? '0' : '30px'
                })`,
                transition: 'opacity 0.5s, transform 0.5s',
              }}
              className={` ${ToastClasses(
                'dark',
                toast.variant
              )} toast-inner ${toast.type}`}
            >
              <span className={`toast-icon ${ToastClasses('dark', toast.variant)}`}>
                {ToastIcon(toast.variant)}
              </span>
              <div className="toast-content">
                <p className="toast-title">{toast.variant}</p>
                <span className="toast-desc">{toast.message}</span>
              </div>
              <Button
                onClickHandler={() => dispatch(removeToast({ id: toast.id }))}
                className="toast-close"
              >
                <Image iconName="crossIcon" iconClassName="w-full h-full" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Toast;
