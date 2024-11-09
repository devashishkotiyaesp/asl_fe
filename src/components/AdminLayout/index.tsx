import Header from 'components/AdminLayout/components/Header';
import SiteLoader from 'components/Loaders/SiteLoader';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { SidebarSelector } from 'reduxStore/slices/layoutSlice';
import Sidebar from './components/Sidebar';
import './index.css';

const AdminLayout = () => {
  const isSidebarOpen = useSelector(SidebarSelector);
  return (
    <div className="dasboard-layout">
      <Sidebar />
      <div className={`admin-content ${isSidebarOpen ? 'show' : 'hide'}`}>
        <Header />
        <main className="style-scroll">
          <Suspense fallback={<SiteLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
