import Image from 'components/Image';

const ManageStudentLanguage = () => {
  return (
    <div className="sidebar-content-wrap">
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>Language Preference</span>
        </div>
        <span className="sidebar-content-small-title">
          Select your language for written text
        </span>
      </div>
      <div className="learn-asl-select-wrap languages-wrap">
        <div className="learn-asl-select-item active">
          <span className="flag-icon">
            <Image iconName="flagUSA" iconClassName="w-full h-full" />
          </span>
          <span className="check-name">English</span>
          <span className="check-icon">
            <Image iconName="checkIcon" iconClassName="w-full h-full" />
          </span>
        </div>
        <div className="learn-asl-select-item ">
          <span className="flag-icon">
            <Image iconName="flagEspanol" iconClassName="w-full h-full" />
          </span>
          <span className="check-name">Español</span>
          <span className="check-icon">
            <Image iconName="checkIcon" iconClassName="w-full h-full" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentLanguage;
