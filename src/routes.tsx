import React, { Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import {
  AdminNavigation,
  CmsNavigation,
  PrivateNavigation,
  PublicNavigation,
  StudentNavigation,
} from 'constants/navigation.constant';

import AdminLayout from 'components/AdminLayout';
import Loaders from 'components/Loaders';
import SiteLoader from 'components/Loaders/SiteLoader';
import { languageConstant, LayoutConstant } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useLanguages } from 'hooks/useLanguages';
import { requestPermissionAndGetToken } from 'lib/firebase';
import RequiresAuth from 'modules/Auth/components/RequiresAuth';
import AdminDashboard from 'modules/Auth/pages/AdminDashboard';
import CMSBlog from 'modules/Auth/pages/Blog';
import BlogDetails from 'modules/Auth/pages/BlogDetails';
import CMSAbout from 'modules/Auth/pages/CMSAbout';
import CMSRefer from 'modules/Auth/pages/CMSAbout/CMSRefer';
import CMSCourse from 'modules/Auth/pages/CMSCourse';
import CMSDictionary from 'modules/Auth/pages/CMSDictionary';
import CMSEvent from 'modules/Auth/pages/CMSEvent';
import CMSGiftCard from 'modules/Auth/pages/CMSGiftCard';
import CMSOrg from 'modules/Auth/pages/CMSOrg';
import CMSPageLIst from 'modules/Auth/pages/CMSPageLIst';
import CMSProduct from 'modules/Auth/pages/CMSProduct';
import CMSVirtualClasses from 'modules/Auth/pages/CMSVirtualClasses';
import ErrorBoundary from 'modules/Auth/pages/ErrorBoundary';
import OrganizationDashboard from 'modules/Auth/pages/OrganizationDashboard';
import PrivacyPolicy from 'modules/Auth/pages/PrivacyPolicy';
import StudentDashboard from 'modules/Auth/pages/StudentDashboard';
import TeacherDashboard from 'modules/Auth/pages/TeacherDashboard';
import TermsOfUse from 'modules/Auth/pages/TermsOfUse';
import CMSSections from 'modules/CmsAdmin';
import Feedback from 'modules/Feedback';
import StudentProfile from 'modules/Profile/Pages/StudentProfile';
import ReportedComments from 'modules/ReportedComments';
import Static from 'modules/Static/Static';
import Static2 from 'modules/Static2';
import { ErrorBoundary as ErrorBoundaryDependency } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentUser,
  setUserData,
  setUserOrganization,
} from 'reduxStore/slices/authSlice';
import { setDefaultTitle } from 'reduxStore/slices/documentTitleSlice';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import {
  activeLayoutType,
  setActiveLayoutType,
} from 'reduxStore/slices/layoutSlice';
import { setRolePermission } from 'reduxStore/slices/rolePermissionSlice';
import { getAuthToken } from 'reduxStore/slices/tokenSlice';
import { checkRolePermission } from 'utils';

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: (
      <ErrorBoundaryDependency FallbackComponent={ErrorBoundary}>
        <Suspense fallback={<SiteLoader />}>{route.element}</Suspense>
      </ErrorBoundaryDependency>
    ),
  }));
};

const RequiresUnAuth = React.lazy(
  () => import('modules/Auth/components/RequiresUnAuth')
);

const NotFound = React.lazy(() => import('modules/Auth/pages/NotFound'));

// const Dashboard = React.lazy(() => import('modules/DashBoard'));
const Dictionary = React.lazy(() => import('modules/Dictionary'));
const ManageUsers = React.lazy(() => import('modules/ManageUsers'));
const Course = React.lazy(() => import('modules/Course'));
const Community = React.lazy(() => import('modules/Community'));
const AddCommunity = React.lazy(
  () => import('modules/Community/pages/AddEditCommunity')
);
const ViewCommunityDetail = React.lazy(
  () => import('modules/Community/pages/ViewCommunityDetail')
);

export type RouteObjType = {
  path?: string;
  element: JSX.Element;
  children?: RouteObject[];
  errorElement?: JSX.Element;
  feature?: string;
  permission?: string;
};

export const applyRequiresAuth = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <RequiresAuth>{route.element}</RequiresAuth>,
  }));
};

const Login = React.lazy(() => import('modules/Auth/pages/Login'));
const TopBarLayout = React.lazy(() => import('components/TopBarLayout'));
const Register = React.lazy(() => import('modules/Auth/pages/Register'));
const ForgotPassword = React.lazy(() => import('modules/Auth/pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('modules/Auth/pages/ResetPassword'));
const Settings = React.lazy(() => import('modules/Auth/pages/Settings'));
const Profile = React.lazy(() => import('modules/Profile'));
const Mfa = React.lazy(() => import('modules/Auth/pages/Mfa'));
const TwoFA = React.lazy(() => import('modules/Auth/pages/TwoFA'));
const CMSHome = React.lazy(() => import('modules/Auth/pages/HomeCMS'));

const Routes = () => {
  const authToken = useSelector(getAuthToken);
  const getUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { getLanguages } = useLanguages();
  const storeLang = useSelector(useLanguage);
  const [getRequest, { isLoading }] = useAxiosGet();
  const activeLayout = useSelector(activeLayoutType);
  const [activeRoutes, setActiveRoutes] = useState<RouteObjType[]>([]);

  useEffect(() => {
    document.title = 'ASL Shop';
    dispatch(setDefaultTitle());
  }, [window.location.href]);

  useEffect(() => {
    if (authToken) {
      requestPermissionAndGetToken(authToken, getUser);
    } else if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getRequest('/get-logged-in-user', {});
      dispatch(
        setUserData({
          user: response.data,
        })
      );
      dispatch(setUserOrganization(response?.data?.organizations ?? []));
      dispatch(setActiveLayoutType(response.data?.role.role ?? LayoutConstant.CMS));
      const rolePermission = response.data?.rolePermissions?.map(
        (
          rolePermission: {
            id: string;
            role_id: string;
            permission_id: string;
            feature_id: string;
            feature: { name: string };
            permission: { name: string };
          }
        ) => {
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
    };
    if (authToken) {
      fetchUser();
    }
  }, [authToken]);

  useEffect(() => {
    if (!window.location.href.includes(PublicNavigation.somethingWentWrong)) {
      getLanguages();
    }
  }, []);

  const loadLanguage = async () => {
    try {
      if (storeLang?.allLanguages && storeLang?.defaultLanguage) {
        await Promise.allSettled(
          storeLang?.allLanguages?.map(
            async (element: { name: string; short_name: string }) => {
              const translationModule = await import(
                `localization/${element?.name}/translation.json`
              );
              i18n.addResourceBundle(
                element?.short_name,
                'translation',
                translationModule,
                true,
                true
              );
            }
          )
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
      await i18n?.changeLanguage(
        storeLang.language ?? storeLang?.defaultLanguage ?? languageConstant.EN
      );
    } catch (error) {
      // handle error
    }
  };

  useEffect(() => {
    if (!window.location.href.includes(PublicNavigation.somethingWentWrong)) {
      loadLanguage();
    }
  }, [storeLang.language, i18n]);

  const getLayoutComponent = () => {
    if (authToken) {
      switch (activeLayout) {
        case LayoutConstant.CMS:
          setActiveRoutes(routesForCMSOnlyPublic);
          break;
        case LayoutConstant.Student:
          setActiveRoutes(routesForStudent);
          break;
        case LayoutConstant.Teacher:
          setActiveRoutes(routesForTeacher);
          break;
        case LayoutConstant.Admin:
          setActiveRoutes([...routesForCMSOnlyPublic, ...routesForAdmin]);
          break;
        case LayoutConstant.Organization:
          setActiveRoutes([...routesForOrganization]);
          break;
        default:
      }
    } else {
      setActiveRoutes(routesForCMSOnlyPublic);
    }
  };
  useEffect(() => {
    getLayoutComponent();
  }, [activeLayout, authToken]);

  const notFound: RouteObjType[] = [
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      ),
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
    ...notFound,
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
    // {
    //   path: AdminNavigation.dashboard.view.path,
    //   element: <AdminDashboard />,
    // },
    // TEMP CMS END
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
      path: AdminNavigation.cms_management.view.path,
      element: <CMSPageLIst />,
    },
    {
      path: StudentNavigation.community.view.path,
      element: <Community />,
    },
    {
      path: AdminNavigation.cms_management.edit.path,
      element: <CMSSections />,
    },
    {
      path: AdminNavigation.settings.view.path,
      element: <Settings />,
    },
    {
      path: PrivateNavigation.profile.view.path,
      element: <Profile />,
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
    ...notFound,
  ];

  // Student Routes
  const StudentRoutes = [
    {
      path: PrivateNavigation.dashboard.view.path,
      element: <StudentDashboard />,
    },
    {
      path: StudentNavigation.community.add.path,
      element: <AddCommunity />,
    },
    {
      path: PrivateNavigation.courses.view.path,
      element: <Course />,
    },
    {
      path: PrivateNavigation.profile.view.path,
      element: <Profile />,
    },
    ...notFound,
  ];

  // Teacher Routes
  const TeacherRoutes = [
    {
      path: PrivateNavigation.dashboard.view.path,
      element: <TeacherDashboard />,
    },
    {
      path: PrivateNavigation.profile.view.path,
      element: <Profile />,
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
    ...notFound,
  ];

  const routesForNotAuthenticatedOnly: RouteObjType[] = applySuspense([
    {
      element: <RequiresUnAuth />,
      // element: <RequiresUnAuth />,
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

  let finalRoutes = [...activeRoutes, ...routesForNotAuthenticatedOnly, ...notFound];

  // Logic to ensures that only routes that the user has permission to access are included in the finalRoutes array.
  finalRoutes = finalRoutes.filter((route) => {
    if (route?.feature && route?.permission) {
      return checkRolePermission(route.feature, route.permission);
    }
    return true;
  });

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter(finalRoutes);

  return (
    <>
      {isLoading ? (
        <Loaders type="SiteLoader" />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};

export default Routes;
