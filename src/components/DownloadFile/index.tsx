import { useEffect } from 'react';

const DownloadFile = () => {
  useEffect(() => {
    const downloadFile = () => {
      const fileUrl = '/apple-app-site-association';

      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = 'apple-app-site-association';
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    };

    downloadFile();
  }, []);

  return null;
};

export default DownloadFile;
