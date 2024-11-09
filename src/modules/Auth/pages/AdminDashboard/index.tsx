// import Image from 'components/Image';
// import { languageConstant } from 'constants/common.constant';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { setLanguage, useLanguage } from 'reduxStore/slices/languageSlice';
// import { useDispatch } from 'react-redux';
import './index.css';

const AdminDashboard = () => {
  // const { language, defaultLanguage } = useSelector(useLanguage);
  // const dispatch = useDispatch();

  // const [toggleSidebar, setToggleSidebar] = useState(true);

  return (
    <>Hello Admin</>
    // <section className="dasboard-layout">
    //   <div className={`sidebar ${toggleSidebar ? 'show' : 'hide'}`}>
    //     <div className="sidebar-logo">
    //       <Link to="#!">
    //         <Image src="/images/logo.png" />
    //       </Link>
    //     </div>
    //     <div className="sidebar-title">
    //       <span>Admin</span>
    //     </div>
    //     <div className="sidebar-list">
    //       <ul className="scroll-hide">
    //         <li className="sidebar-list__item active">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="dashboardIcon" />
    //             </span>
    //             <span className="text">Dashboard</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Manage Users</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Manage Courses</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Manage Organizations</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Manage Subscription</span>
    //             <span className="icon-more">
    //               <Image iconName="chevronRight" />
    //             </span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Calendar</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">ASL Dictionary</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Community</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">CMS Management</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Audit Log</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Feedback and Support</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Metrics & Analytics</span>
    //           </Link>
    //         </li>
    //         <li className="sidebar-list__item has-menu">
    //           <Link to="./">
    //             <span className="icon">
    //               <Image iconName="userHexa" />
    //             </span>
    //             <span className="text">Settings</span>
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div className={`admin-content ${toggleSidebar ? 'show' : 'hide'}`}>
    //     <div className="admin-header">
    //       <div className="admin-header__inner">
    //         <div
    //           onClick={() => setToggleSidebar(!toggleSidebar)}
    //           className="sidebar-trigger"
    //         >
    //           <Image iconName="menuIcon" />
    //         </div>
    //         <div className="flex items-center ml-auto">
    //           <div className="flex items-center w-[90px] rounded-full bg-LightGray relative z-1 mr-5">
    //             <span
    //               //  shadow-[inset_2px_1px_10px_#0000004d]
    //               className={`block w-[45px] aspect-square rounded-full absolute top-0 bg-LightWood -z-1 transition-all duration-300 ${language === languageConstant.EN ||
    //                   (!language && defaultLanguage === languageConstant.EN)
    //                   ? 'left-0'
    //                   : 'left-1/2'
    //                 }`}
    //             />
    //             <span
    //               className="w-[45px] aspect-square rounded-full cursor-pointer flex items-center justify-center text-black text-base leading-normal"
    //               onClick={() =>
    //                 dispatch(setLanguage({ language: languageConstant.EN }))
    //               }
    //             >
    //               EN
    //             </span>
    //             <span
    //               className="w-[45px] aspect-square rounded-full cursor-pointer flex items-center justify-center text-black text-base leading-normal"
    //               onClick={() =>
    //                 dispatch(setLanguage({ language: languageConstant.ES }))
    //               }
    //             >
    //               ES
    //             </span>
    //           </div>

    //           <div className="header-notification">
    //             <Image iconName="notification" />
    //             <span className="update" />
    //           </div>

    //           <div className="header-profile">
    //             <Image src="/images/profile.png" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default AdminDashboard;
