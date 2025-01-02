import React, { Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import {
  AdminNavigation,
  CmsNavigation,
  OrganizationNavigation,
  PrivateNavigation,
  PublicNavigation,
  StudentNavigation,
} from 'constants/navigation.constant';

import { languageConstant, LayoutConstant, Roles } from 'constants/common.constant';
import RequiresAuth from 'modules/Auth/components/RequiresAuth';
import AddEditForm from 'modules/Course/Admin/pages/AddEditForm';
import AllCourseListing from 'modules/Course/Teacher/pages/AllCourseListing';
import { ErrorBoundary as ErrorBoundaryDependency } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentUser,
  getIsAuthenticated,
  setAuthenticated,
  setUserData,
  setUserOrganization,
} from 'reduxStore/slices/authSlice';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import {
  activeLayoutType,
  setActiveLayoutType,
} from 'reduxStore/slices/layoutSlice';
import { getAuthToken } from 'reduxStore/slices/tokenSlice';
import { checkRolePermission } from 'utils';

import AdminLayout from 'components/AdminLayout';
import DownloadFile from 'components/DownloadFile';
import Loaders from 'components/Loaders';
import { useAxiosGet } from 'hooks/useAxios';
import { useLanguages } from 'hooks/useLanguages';
import Calendar from 'modules/Calendar';
import SupportRequestForm from 'modules/Feedback/Component/SupportRequestForm';
import CreateTag from 'modules/Feedback/Component/TagFormPage';
import TagsPage from 'modules/Feedback/Component/TagsPage';
import LiveAssessment from 'modules/LiveAssessment';
import AssessmentDetails from 'modules/LiveAssessment/Components/AssessmentDetails';
import InviteUserForm from 'modules/ManageUsers/pages/AddUsers/InviteUserForm';
import { setDefaultTitle } from 'reduxStore/slices/documentTitleSlice';
import { setRolePermission } from 'reduxStore/slices/rolePermissionSlice';
import supabase from 'supabase';

const ViewUser = React.lazy(() => import('modules/ManageUsers/pages/ViewUser'));

const ManageTeachers = React.lazy(
  () => import('modules/ManageStudents/pages/ManageTeachers')
);

const RemovedStudents = React.lazy(
  () => import('modules/ManageStudents/pages/RemovedStudent')
);

const AdminSettings = React.lazy(() => import('modules/Auth/pages/Settings'));

const OrganizationTypes = React.lazy(
  () => import('modules/Auth/pages/Settings/Component/OrganizationTypes')
);
const AddUser = React.lazy(() => import('modules/ManageUsers/pages/AddUsers'));
const DeletedUserLists = React.lazy(
  () => import('modules/ManageUsers/pages/DeletedUsers')
);

const ManageStudents = React.lazy(() => import('modules/ManageStudents'));
const ASLLevels = React.lazy(
  () => import('modules/Auth/pages/Settings/Component/ASLLevels')
);
const Blog = React.lazy(() => import('modules/Blog'));
const CreateBlog = React.lazy(() => import('modules/Blog/Pages/CreateBlog'));
const AdminDashboard = React.lazy(() => import('modules/Auth/pages/AdminDashboard'));
const ErrorBoundary = React.lazy(() => import('modules/Auth/pages/ErrorBoundary'));
const OrganizationDashboard = React.lazy(
  () => import('modules/Auth/pages/OrganizationDashboard')
);
const PrivacyPolicy = React.lazy(() => import('modules/Cms/pages/PrivacyPolicy'));
const StudentDashboard = React.lazy(
  () => import('modules/Auth/pages/StudentDashboard')
);
const TeacherDashboard = React.lazy(
  () => import('modules/Auth/pages/TeacherDashboard')
);
const TermsOfUse = React.lazy(() => import('modules/Cms/pages/TermsOfUse'));
const CMSBlog = React.lazy(() => import('modules/Cms/pages/Blog'));
const BlogDetails = React.lazy(() => import('modules/Cms/pages/BlogDetails'));
const CMSAbout = React.lazy(() => import('modules/Cms/pages/CMSAbout'));
const CMSRefer = React.lazy(() => import('modules/Cms/pages/CMSRefer'));
const CMSCourse = React.lazy(() => import('modules/Cms/pages/CMSCourse'));
const CMSDictionary = React.lazy(() => import('modules/Cms/pages/CMSDictionary'));
const CMSEvent = React.lazy(() => import('modules/Cms/pages/CMSEvent'));
const CMSGiftCard = React.lazy(() => import('modules/Cms/pages/CMSGiftCard'));
const CMSOrg = React.lazy(() => import('modules/Cms/pages/CMSOrg'));
const CMSPageLIst = React.lazy(() => import('modules/Cms/pages/CMSPageLIst'));
const CMSProduct = React.lazy(() => import('modules/Cms/pages/CMSProduct'));
const CMSVirtualClasses = React.lazy(
  () => import('modules/Cms/pages/CMSVirtualClasses')
);
const CMSSections = React.lazy(() => import('modules/CmsAdmin'));
const AddOrEditEvent = React.lazy(
  () => import('modules/CmsAdmin/Events/Components/AddOrEditEvent')
);
const Feedback = React.lazy(() => import('modules/Feedback'));
const StudentProfile = React.lazy(
  () => import('modules/Profile/Pages/StudentProfile')
);
const ReportedComments = React.lazy(() => import('modules/ReportedComments'));
const Static = React.lazy(() => import('modules/Static/Static'));
const Static2 = React.lazy(() => import('modules/Static2'));
const Static3 = React.lazy(() => import('modules/Static3'));
const Static4 = React.lazy(() => import('modules/Static4'));
const Static5 = React.lazy(() => import('modules/Static5'));

const RequiresUnAuth = React.lazy(
  () => import('modules/Auth/components/RequiresUnAuth')
);

const NotFound = React.lazy(() => import('modules/Auth/pages/NotFound'));

// const Dashboard = React.lazy(() => import('modules/DashBoard'));
const Dictionary = React.lazy(() => import('modules/Dictionary'));
const StudentDictionaryPage = React.lazy(
  () => import('modules/Dictionary/pages/StudentDictionaryPage')
);
const StudentDictionarySignPage = React.lazy(
  () => import('modules/Dictionary/pages/StudentDictionarySignPage')
);
const ManageUsers = React.lazy(() => import('modules/ManageUsers'));
const Course = React.lazy(() => import('modules/Course'));
const Community = React.lazy(() => import('modules/Community'));
const AddCommunity = React.lazy(
  () => import('modules/Community/pages/AddEditCommunity')
);
const StudentCommunityPage = React.lazy(
  () => import('modules/Community/pages/StudentCommunityPage')
);
const ViewCommunityDetail = React.lazy(
  () => import('modules/Community/pages/ViewCommunityDetail')
);
const AuditLog = React.lazy(() => import('modules/AuditLog/index'));

const Login = React.lazy(() => import('modules/Auth/pages/Login'));
const TopBarLayout = React.lazy(() => import('components/TopBarLayout'));
const Register = React.lazy(() => import('modules/Auth/pages/Register'));
const ForgotPassword = React.lazy(() => import('modules/Auth/pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('modules/Auth/pages/ResetPassword'));
const AcceptInvite = React.lazy(() => import('modules/Auth/pages/AcceptInvite'));
// const Settings = React.lazy(() => import('modules/Auth/pages/Settings'));
const CourseCategory = React.lazy(
  () => import('modules/Course/CourseCategory/index')
);
const Profile = React.lazy(() => import('modules/Profile'));
const Mfa = React.lazy(() => import('modules/Auth/pages/Mfa'));
const TwoFA = React.lazy(() => import('modules/Auth/pages/TwoFA'));
const CMSHome = React.lazy(() => import('modules/Cms/pages/HomeCMS'));
// const StudentCourse = React.lazy(() => import('modules/Course/Student'));
const CourseDetailTab = React.lazy(
  () => import('modules/Course/common/pages/CourseDetailTab')
);
const LessonView = React.lazy(
  () => import('modules/Course/common/pages/lessonView')
);

export type RouteObjType = {
  path?: string;
  element: JSX.Element;
  children?: RouteObject[];
  errorElement?: JSX.Element;
  feature?: string;
  permission?: string;
};

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: (
      <ErrorBoundaryDependency FallbackComponent={ErrorBoundary}>
        <Suspense fallback={<Loaders />}>{route.element}</Suspense>
      </ErrorBoundaryDependency>
    ),
  }));
};

const notFound: RouteObjType[] = [
  {
    path: '*',
    element: <NotFound />,
  },
];

// Auth routes
const AuthenticationRoutes = [
  {
    path: PublicNavigation.login,
    element: <Login />,
  },
  {
    path: PublicNavigation.register,
    element: <Register />,
  },
  {
    path: PublicNavigation.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: PublicNavigation.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: PublicNavigation.mfa,
    element: <Mfa />,
  },
  {
    path: PublicNavigation.twoFA,
    element: <TwoFA />,
  },
  {
    path: PublicNavigation.Static,
    element: <Static />,
  },
  {
    path: PublicNavigation.Static2,
    element: <Static2 />,
  },
  {
    path: PublicNavigation.Static3,
    element: <Static3 />,
  },
  {
    path: PublicNavigation.Static4,
    element: <Static4 />,
  },
  {
    path: PublicNavigation.Static5,
    element: <Static5 />,
  },
  {
    path: PublicNavigation.acceptInvite,
    element: <AcceptInvite />,
  },
];

// Cms Routes
const CmsRoutes = [
  // TEMP CMS
  {
    path: CmsNavigation.Home,
    element: <CMSHome />,
  },
  {
    path: CmsNavigation.Course,
    element: <CMSCourse />,
  },
  {
    path: CmsNavigation.VirtualClasses,
    element: <CMSVirtualClasses />,
  },
  {
    path: CmsNavigation.Dictionary,
    element: <CMSDictionary />,
  },
  {
    path: CmsNavigation.Org,
    element: <CMSOrg />,
  },
  {
    path: CmsNavigation.Blog,
    element: <CMSBlog />,
  },
  {
    path: CmsNavigation.BlogDetails,
    element: <BlogDetails />,
  },
  {
    path: CmsNavigation.About,
    element: <CMSAbout />,
  },
  {
    path: CmsNavigation.Event,
    element: <CMSEvent />,
  },
  {
    path: CmsNavigation.Refer,
    element: <CMSRefer />,
  },
  {
    path: CmsNavigation.GiftCard,
    element: <CMSGiftCard />,
  },
  {
    path: CmsNavigation.Product,
    element: <CMSProduct />,
  },
  {
    path: CmsNavigation.PrivacyPolicy,
    element: <PrivacyPolicy />,
  },
  {
    path: CmsNavigation.StudentProfile,
    element: <StudentProfile />,
  },
  {
    path: CmsNavigation.TermsOfUse,
    element: <TermsOfUse />,
  },
  {
    path: '/shop',
    element: <NotFound />,
  },
  {
    path: '/apple-app-site-association',
    element: <DownloadFile />,
  },
  {
    path: '/.well-known/apple-app-site-association',
    element: <DownloadFile />,
  },
  ...notFound,
];

// Admin Routes
const AdminRoutes = [
  {
    path: AdminNavigation.dashboard.view.path,
    element: <AdminDashboard />,
  },
  {
    path: AdminNavigation.dictionary.view.path,
    element: <Dictionary />,
  },
  {
    path: PrivateNavigation.users.view.path,
    element: <ManageUsers />,
  },
  {
    path: PrivateNavigation.users.viewUser.path,
    element: <ViewUser />,
  },
  {
    path: PrivateNavigation.deletedUser.view.path,
    element: <DeletedUserLists />,
  },
  {
    path: PrivateNavigation.users.add.path,
    element: <AddUser />,
  },
  {
    path: PrivateNavigation.users.add_user.path,
    element: <InviteUserForm />,
  },
  {
    path: AdminNavigation.cms_management.view.path,
    element: <CMSPageLIst />,
  },
  {
    path: StudentNavigation.community.view.path,
    element: <Community />,
  },
  {
    path: StudentNavigation.community.add.path,
    element: <AddCommunity />,
  },
  {
    path: StudentNavigation.community.edit.path,
    element: <AddCommunity />,
  },
  {
    path: AdminNavigation.cms_management.edit.path,
    element: <CMSSections />,
  },
  {
    path: PrivateNavigation.profile.view.path,
    element: <Profile />,
  },
  {
    path: PrivateNavigation.courses.view.path,
    element: <Course />,
  },
  {
    path: AdminNavigation.static.view.path,
    element: <Static />,
  },
  {
    path: StudentNavigation.community.viewDetail.path,
    element: <ViewCommunityDetail />,
  },
  {
    path: AdminNavigation.reported_comments.view.path,
    element: <ReportedComments />,
  },
  {
    path: AdminNavigation.feedback.view.path,
    element: <Feedback />,
  },
  {
    path: AdminNavigation.event.create.path,
    element: <AddOrEditEvent />,
  },
  {
    path: AdminNavigation.event.edit.path,
    element: <AddOrEditEvent />,
  },
  {
    path: AdminNavigation.blog.view.path,
    element: <Blog />,
  },
  {
    path: AdminNavigation.blog.add.path,
    element: <CreateBlog />,
  },
  {
    path: AdminNavigation.blog.edit.path,
    element: <CreateBlog />,
  },
  {
    path: AdminNavigation.calendar.view.path,
    element: <Calendar />,
  },
  {
    path: AdminNavigation.settings.view.path,
    element: <AdminSettings />,
  },
  {
    path: AdminNavigation.settings.asl_level.path,
    element: <ASLLevels />,
  },
  {
    path: AdminNavigation.settings.course_category.path,
    element: <CourseCategory />,
  },
  {
    path: AdminNavigation.settings.organization_types.path,
    element: <OrganizationTypes />,
  },
  {
    path: AdminNavigation.settings.support_faqs.path,
    element: <SupportRequestForm />,
  },
  {
    path: AdminNavigation.settings.tags.path,
    element: <TagsPage />,
  },
  {
    path: AdminNavigation.audit_log.view.path,
    element: <AuditLog />,
  },
  {
    path: PrivateNavigation.courses.add.path,
    element: <AddEditForm />,
  },
  {
    path: PrivateNavigation.courses.edit.path,
    element: <AddEditForm />,
  },
  {
    path: PrivateNavigation.courses.detailView.path,
    element: <CourseDetailTab />,
  },
  {
    path: PrivateNavigation.courses.lessonView.path,
    element: <LessonView />,
  },
  {
    path: AdminNavigation.tag.edit.path,
    element: <CreateTag />,
  },
  {
    path: AdminNavigation.tag.add.path,
    element: <CreateTag />,
  },
  ...notFound,
];

// Student Routes
const StudentRoutes = [
  {
    path: StudentNavigation.community.view.path,
    element: <StudentCommunityPage />,
  },
  {
    path: PrivateNavigation.dashboard.view.path,
    element: <StudentDashboard />,
  },
  {
    path: StudentNavigation.community.add.path,
    element: <AddCommunity />,
  },
  {
    path: StudentNavigation.community.viewDetail.path,
    element: <ViewCommunityDetail />,
  },
  {
    path: PrivateNavigation.profile.view.path,
    element: <Profile />,
  },
  {
    path: StudentNavigation.courses.view.path,
    element: <Course />,
  },
  {
    path: StudentNavigation.courses.assessmentView.path,
    element: <AssessmentDetails />,
  },
  {
    path: StudentNavigation.courses.bookAppointment.path,
    element: <LiveAssessment />,
  },
  {
    path: StudentNavigation.courses.detailView.path,
    element: <CourseDetailTab />,
  },
  {
    path: StudentNavigation.courses.lessonView.path,
    element: <LessonView />,
  },
  {
    path: StudentNavigation.courses.list.path,
    element: <AllCourseListing />,
  },
  {
    path: StudentNavigation.dictionary.view.path,
    element: <StudentDictionaryPage />,
  },
  {
    path: StudentNavigation.dictionary.viewSign.path,
    element: <StudentDictionarySignPage />,
  },
  ...notFound,
];

// Teacher Routes
const TeacherRoutes = [
  {
    path: StudentNavigation.community.view.path,
    element: <StudentCommunityPage />,
  },
  {
    path: PrivateNavigation.dashboard.view.path,
    element: <StudentDashboard />,
  },
  {
    path: StudentNavigation.community.add.path,
    element: <AddCommunity />,
  },
  {
    path: StudentNavigation.community.viewDetail.path,
    element: <ViewCommunityDetail />,
  },
  {
    path: PrivateNavigation.courses.view.path,
    element: <Course />,
  },
  {
    path: PrivateNavigation.courses.list.path,
    element: <AllCourseListing />,
  },
  {
    path: PrivateNavigation.courses.edit.path,
    element: <AddEditForm />,
  },
  {
    path: PrivateNavigation.courses.detailView.path,
    element: <CourseDetailTab />,
  },
  {
    path: PrivateNavigation.courses.lessonView.path,
    element: <LessonView />,
  },
  {
    path: PrivateNavigation.dashboard.view.path,
    element: <TeacherDashboard />,
  },
  {
    path: PrivateNavigation.profile.view.path,
    element: <Profile />,
  },
  {
    path: StudentNavigation.dictionary.view.path,
    element: <StudentDictionaryPage />,
  },
  {
    path: StudentNavigation.dictionary.viewSign.path,
    element: <StudentDictionarySignPage />,
  },
  ...notFound,
];

// Organization Routes
const OrganizationRoutes = [
  {
    path: PrivateNavigation.dashboard.view.path,
    element: <OrganizationDashboard />,
  },
  {
    path: PrivateNavigation.profile.view.path,
    element: <Profile />,
  },
  {
    path: OrganizationNavigation.manageStudent.view.path,
    element: <ManageStudents />,
  },
  {
    path: OrganizationNavigation.deletedStudent.view.path,
    element: <RemovedStudents />,
  },
  {
    path: OrganizationNavigation.manageTeachers.view.path,
    element: <ManageTeachers />,
  },
  ...notFound,
];

const routesForNotAuthenticatedOnly: RouteObjType[] = applySuspense([
  {
    element: <RequiresUnAuth />,
    children: AuthenticationRoutes,
  },
  ...notFound,
]);

const routesForCMSOnlyPublic: RouteObjType[] = applySuspense([
  {
    element: <TopBarLayout />,
    children: CmsRoutes,
  },
]);

const routesForAdmin: RouteObjType[] = applySuspense([
  { element: <AdminLayout />, children: AdminRoutes },
]);

const routesForOrganization: RouteObjType[] = applySuspense([
  { element: <AdminLayout />, children: OrganizationRoutes },
]);

const routesForStudent: RouteObjType[] = applySuspense([
  { element: <TopBarLayout />, children: StudentRoutes },
]);

const routesForTeacher: RouteObjType[] = applySuspense([
  { element: <TopBarLayout />, children: TeacherRoutes },
]);

const Routes = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { fetchLanguages } = useLanguages();
  const [getRequest, { isLoading }] = useAxiosGet();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const activeLayout = useSelector(activeLayoutType);
  const authToken = useSelector(getAuthToken);
  const getUser = useSelector(getCurrentUser);
  const storeLang = useSelector(useLanguage);
  const [activeRoutes, setActiveRoutes] = useState<RouteObjType[]>([]);

  const applyAuthSuspense = (routes: RouteObjType[]): RouteObjType[] => {
    return routes.map((route) => ({
      ...route,
      element: (
        <ErrorBoundaryDependency FallbackComponent={ErrorBoundary}>
          <RequiresAuth>
            <Suspense fallback={<Loaders />}>{route.element}</Suspense>
          </RequiresAuth>
        </ErrorBoundaryDependency>
      ),
    }));
  };

  let finalRoutes = [
    ...activeRoutes,
    ...applyAuthSuspense(routesForNotAuthenticatedOnly),
  ];

  useEffect(() => {
    document.title = 'ASL Shop';
    dispatch(setDefaultTitle());
  }, [window.location.href]);

  useEffect(() => {
    // For Global BG color
    const element = document.getElementsByTagName('body')[0];
    if (
      getUser?.role?.role === Roles.Student ||
      getUser?.role?.role === Roles.Teacher
    ) {
      element.style.backgroundColor = '#f2f2f2';
    }
    // For Global BG color
  }, [getUser]);

  useEffect(() => {
    if (authToken) {
      fetchUser();
    }
  }, [authToken]);

  useEffect(() => {
    if (!window.location.href.includes(PublicNavigation.somethingWentWrong)) {
      fetchLanguages();
    }
  }, []);

  useEffect(() => {
    if (!window.location.href.includes(PublicNavigation.somethingWentWrong)) {
      fetchLanguages();
      loadLanguage();
    }
  }, [storeLang.language, i18n]);

  useEffect(() => {
    getLayoutComponent();
  }, [activeLayout, authToken]);

  const fetchUser = async () => {
    const response = await getRequest('/get-logged-in-user');
    const userdata = await supabase.auth.getSession();
    dispatch(setAuthenticated({ isAuthenticated: true }));
    dispatch(
      setUserData({
        user: {
          ...response.data,
          last_sign_id: userdata?.data?.session?.user?.last_sign_in_at ?? '',
        },
      })
    );
    dispatch(setUserOrganization(response?.data?.organizations ?? []));
    dispatch(setActiveLayoutType(response.data?.role?.role ?? LayoutConstant.CMS));
    const rolePermission = response.data?.rolePermissions?.map(
      (rolePermission: {
        id: string;
        role_id: string;
        permission_id: string;
        feature_id: string;
        feature: { name: string };
        permission: { name: string };
      }) => {
        return {
          id: rolePermission.id,
          roleId: rolePermission.role_id,
          permissionId: rolePermission.permission_id,
          featureId: rolePermission.feature_id,
          feature_name: rolePermission.feature?.name,
          permission_name: rolePermission.permission?.name,
        };
      }
    );
    dispatch(setRolePermission(rolePermission));
    if (Object.values(PublicNavigation).includes(window?.location?.pathname)) {
      switch (response.data?.role?.role) {
        case LayoutConstant.Student:
          window.location.href = '/';
          break;
        case LayoutConstant.Teacher:
          window.location.href = '/';
          break;
        case LayoutConstant.Admin:
          window.location.href = '/admin';
          break;
        case LayoutConstant.Organization:
          window.location.href = '/admin';
          break;
        default:
          window.location.href = '/';
      }
    }
  };

  const loadLanguage = async () => {
    try {
      if (storeLang?.allLanguages && storeLang?.defaultLanguage) {
        await Promise.allSettled(
          storeLang?.allLanguages?.map(async (language) => {
            const translationModule = await import(
              `localization/${language?.name}/translation.json`
            );
            i18n.addResourceBundle(
              language?.short_name,
              'translation',
              translationModule,
              true,
              true
            );
          })
        );
      } else {
        const translationModule = await import(
          'localization/english/translation.json'
        );
        i18n.addResourceBundle(
          languageConstant.EN,
          'translation',
          translationModule,
          true,
          true
        );
      }
      await i18n?.changeLanguage(storeLang?.language);
    } catch (error) {
      console.log({ error });
      // handle error
    }
  };

  const getLayoutComponent = () => {
    if (authToken) {
      switch (activeLayout) {
        case LayoutConstant.CMS:
          setActiveRoutes(routesForCMSOnlyPublic);
          break;
        case LayoutConstant.Student:
          setActiveRoutes(applyAuthSuspense(routesForStudent));
          break;
        case LayoutConstant.Teacher:
          setActiveRoutes(applyAuthSuspense(routesForTeacher));
          break;
        case LayoutConstant.Admin:
          setActiveRoutes(
            applyAuthSuspense([...routesForAdmin, ...routesForCMSOnlyPublic])
          );
          break;
        case LayoutConstant.Organization:
          setActiveRoutes(applyAuthSuspense([...routesForOrganization]));
          break;
        default:
      }
    } else {
      setActiveRoutes(applyAuthSuspense(routesForCMSOnlyPublic));
    }
  };

  // Logic to ensures that only routes that the user has permission to access are included in the finalRoutes array.
  finalRoutes = finalRoutes.filter((route) => {
    if (route?.feature && route?.permission) {
      return checkRolePermission(route.feature, route.permission);
    }
    return true;
  });

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter(finalRoutes);
  return isLoading || (isAuthenticated && activeLayout === LayoutConstant.CMS) ? (
    <Loaders type="SiteLoader" />
  ) : (
    <RouterProvider router={router} />
  );
};

export default Routes;
