import Switch from 'components/FormElement/Switch';
import { FC } from 'react';
import '../../../index.css';

const Notification: FC = () => {
  return (
    <div className="sidebar-content-wrap">
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>Notification Settings</span>
        </div>
        <span className="sidebar-content-small-title">
          Configure your notification preferences below.
        </span>
      </div>
      <div className="sidebar-content-ntfc">
        <div className="sidebar-content-ntfc-title">
          <span>Email</span>
        </div>
        <div className="sidebar-content-ntfc-item">
          <span>Newsletter (Monthly)</span>
          <Switch small />
        </div>
        <div className="sidebar-content-ntfc-item">
          <span>New courses and updates</span>
          <Switch small />
        </div>
        <div className="sidebar-content-ntfc-item">
          <span>Course reminders and information</span>
          <Switch small />
        </div>
      </div>

      <div className="sidebar-content-ntfc">
        <div className="sidebar-content-ntfc-title">
          <span>In App</span>
        </div>
        <div className="sidebar-content-ntfc-item">
          <span>Newsletter (Monthly)</span>
          <Switch small />
        </div>
        <div className="sidebar-content-ntfc-item">
          <span>New courses and updates</span>
          <Switch small />
        </div>
        <div className="sidebar-content-ntfc-item">
          <span>Course reminders and information</span>
          <Switch small />
        </div>
      </div>
    </div>
  );
};

export default Notification;
