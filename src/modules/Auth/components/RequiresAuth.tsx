import SiteLoader from 'components/Loaders/SiteLoader';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary as ErrorBoundaryDependency } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { currentPageCount } from 'reduxStore/slices/paginationSlice';
import ErrorBoundary from '../pages/ErrorBoundary';

type Props = {
  children: JSX.Element;
};

const RequiresAuth = ({ children }: Props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentPageCount({ currentPage: 1 }));
  }, [location, dispatch]);

  return (
    // Setup error boundary to capture runtime errors
    <ErrorBoundaryDependency FallbackComponent={ErrorBoundary}>
      <Suspense fallback={<SiteLoader />}>{children}</Suspense>
    </ErrorBoundaryDependency>
  );
};

export default RequiresAuth;
