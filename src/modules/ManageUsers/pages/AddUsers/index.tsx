// ** Components **
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';

// ** Constants **
import { Roles } from 'constants/common.constant';
import { PrivateNavigation } from 'constants/navigation.constant';

// ** Hooks **
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** Types **
import { RoleType } from 'types/comman';

// ** Utils **
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const AddUser = () => {
  // ** State **
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [roleForm, setRoleForm] = useState<RoleType>();

  // ** Hooks **
  const { t } = useTranslation();

  // ** Handlers **
  const handleCheckBoxChange = (
    e: ChangeEvent<HTMLInputElement>,
    searchParams: RoleType
  ) => {
    if (e.target.checked) {
      setRoleForm(searchParams);
    } else {
      setRoleForm(undefined);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title={t('UserManagement.PageHeader.Add', {
          ROLE: roleForm && activeLanguage === 1 ? roleForm : 'User',
        })}
        url={PrivateNavigation.users.view.path}
      />
      <div className="content-base">
        <div className="step-wrapper primary">
          {Array(2)
            ?.fill('')
            ?.map((_, index) => {
              return (
                <div
                  key={`Add_User_Tab${index + 1}`}
                  className={`step-item ${index <= activeLanguage ? 'active' : ''}`}
                >
                  {index >= activeLanguage ? (
                    <span className="step-item__number">{index + 1}</span>
                  ) : (
                    <span className="step-item__number">
                      <Image iconClassName="w-10 h-10" iconName="checkIcon" />
                    </span>
                  )}
                </div>
              );
            })}
        </div>
        <div className="select-create-user-wrap">
          <span className="select-create-user-title">{t('SelectUserType')}</span>
          <div className="select-create-user">
            <label htmlFor="checkAdmin" className="select-create-user-item">
              <div className="select-create-user-icon-box">
                <Image iconName="adminIcon" />
              </div>
              <p className="user-type-name">{Roles.Admin}</p>
              <Checkbox
                id="checkAdmin"
                check={roleForm === Roles.Admin}
                onChange={(e) => handleCheckBoxChange(e, Roles.Admin)}
              />
            </label>
            <label htmlFor="checkOrg" className="select-create-user-item">
              <div className="select-create-user-icon-box">
                <Image iconName="organizationIcon" />
              </div>
              <p className="user-type-name">{Roles.Organization}</p>
              <Checkbox
                id="checkOrg"
                check={roleForm === Roles.Organization}
                onChange={(e) => handleCheckBoxChange(e, Roles.Organization)}
              />
            </label>
            <label htmlFor="checkTeacher" className="select-create-user-item">
              <div className="select-create-user-icon-box">
                <Image iconName="teacherIcon" />
              </div>
              <p className="user-type-name">{Roles.Teacher}</p>
              <Checkbox
                id="checkTeacher"
                check={roleForm === Roles.Teacher}
                onChange={(e) => handleCheckBoxChange(e, Roles.Teacher)}
              />
            </label>
            <label htmlFor="checkStudent" className="select-create-user-item">
              <div className="select-create-user-icon-box">
                <Image iconName="studentIcon" />
              </div>
              <p className="user-type-name">{Roles.Student}</p>
              <Checkbox
                id="checkStudent"
                check={roleForm === Roles.Student}
                onChange={(e) => handleCheckBoxChange(e, Roles.Student)}
              />
            </label>
          </div>
        </div>

        <div className="btn-wrap">
          <Button
            variants="black"
            onClickHandler={() => {
              navigate(`/manage-users/add-users/${roleForm?.toLocaleLowerCase()}`);
              setActiveLanguage(1);
            }}
            disabled={roleForm === undefined}
          >
            {t('UserManagement.Form.Button.Next')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
