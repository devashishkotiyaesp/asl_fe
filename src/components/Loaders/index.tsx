import LogoAnimate from './LogoAnimate';

interface ILoadersProps {
  type?: 'Spin' | 'SiteLoader';
  className?: string;
}

const Loaders = ({ type, className }: ILoadersProps) => {
  return (
    <>
      {type === 'SiteLoader' ? (
        <div
          className={`bg-black/80 fixed top-0 left-0 w-full h-full z-5 bg-dark/70 flex items-center justify-center ${
            className ?? ''
          }`}
        >
          <LogoAnimate />
        </div>
      ) : (
        <span
          className={`animate-spin h-5 w-5 inline-block border-4 border-solid border-gray-300/50 border-l-gray-300 rounded-full ${
            className ?? ''
          }`}
        />
      )}
    </>
  );
};

export default Loaders;
