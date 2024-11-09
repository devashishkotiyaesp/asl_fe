import './style/siteLoader.css';

const SiteLoader = ({ className }: { className?: string }) => {
  return (
    <div className="i__Site__Loader z-[12]">
      <span
        className={`animate-spin h-12 w-12 inline-block border-4 border-solid border-gray-300/50 border-l-gray-300 rounded-full ${
          className ?? ''
        }`}
      />
    </div>
  );
};

export default SiteLoader;
