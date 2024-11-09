import Header from 'components/TopBarLayout/Header';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export type Props = {
  children?: React.ReactNode;
};

// Layout for CMS Pages
const TopBarLayout: FC = () => {
  return (
    <div className="">
      <Header />
      <div className="overflow-auto mt-[100px] style-scroll max-h-[calc(100dvh_-_100px)]">
        {/* {children} */}
        <Outlet />
      </div>
    </div>
  );
};

export default TopBarLayout;
