import BlogCard from 'components/BlogCard';
import Button from 'components/Button/Button';
import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import SearchComponent from 'components/search';
import { useAxiosGet } from 'hooks/useAxios';
import { t } from 'i18next';
import { CMSEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstCharacter, useDebounce } from 'utils';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import './index.css';
// ** Date Functions **
import Loaders from 'components/Loaders';
import NoDataFound from 'components/NoDataFound';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { CmsSectionDataProps } from '../HomeCMS/types';

interface CMSBlogInterface {
  field_name: string;
  field_type: string;
  field_value: string;
  language: string;
  id: string;
}

interface CMSBlogDataInterface {
  title_of_hashTag: string;
  hashTag_description: string;
  button_title: string;
  banner_image: string;
  title_hashTag: string;
  button_text: string;
  button_url: string;
}

interface CMSBlogAllInterface {
  title: string;
  tag: string;
  created_at: Date | string;
  author: string;
  social_media_links: {
    instagram_link: string;
    facebook_link: string;
    twitter_link: string;
  };
  image_path: string;
  details: string;
  conclusion: string;
  designation: string;
  bio: string;
  slug: string;
  id: string;
}
const CMSBlog = () => {
  const [getApi, { isLoading }] = useAxiosGet();
  const [blogData, setBlogData] = useState<CMSBlogDataInterface>();
  const [blogDetail, setBlogDetail] = useState<CMSBlogAllInterface[]>();
  const [cmsData, setCmsData] = useState<CmsSectionDataProps>();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 300);
  const [dataFound, setDataFound] = useState<boolean>(false);
  const storeLang = useSelector(useLanguage);

  const fetchBlog = async () => {
    const { data } = await getApi(`/cms-page-section`, {
      params: {
        sectionName: CMSEnum.Blog,
      },
    });
    setCmsData(data);
    const blog: CMSBlogDataInterface = {
      title_of_hashTag: '',
      hashTag_description: '',
      button_title: '',
      banner_image: '',
      title_hashTag: '',
      button_text: '',
      button_url: '',
    };

    data?.blog?.forEach((data: CMSBlogInterface) => {
      const key: keyof CMSBlogDataInterface =
        data?.field_name as keyof CMSBlogDataInterface;
      if (data?.field_name) {
        blog[key] = data?.field_value;
      }
    });

    setBlogData(blog);
  };

  const fetchBlogDetailData = async () => {
    const { data: blogDetailData } = await getApi(`/blog`, {
      params: {
        page,
        limit: 12,
        search: capitalizeFirstCharacter(debounceSearch),
        searchFields: 'title',
      },
    });
    if (blogDetailData?.data?.length === 0 && page === 1) {
      setDataFound(true);
    } else {
      setDataFound(false);
    }
    if (debounceSearch || page === 1) {
      setBlogDetail(blogDetailData?.data);
    } else {
      setBlogDetail((prevData) => [...(prevData || []), ...blogDetailData.data]);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [storeLang]);

  useEffect(() => {
    fetchBlogDetailData();
  }, [page, debounceSearch, storeLang]);

  return (
    <>
      <section className="blog-sec">
        <div className="container">
          <div className="wrapper">
            <div className="left-part">
              <div className="section-title">
                {blogData?.title_hashTag && (
                  <span className="hashtag-label">{blogData?.title_hashTag}</span>
                )}
                {/* {smallTitle && <span className="small-title">{smallTitle}</span>} */}
                <h1 className="h2">{blogData?.title_of_hashTag}</h1>
                <p>{blogData?.hashTag_description}</p>
              </div>
            </div>
            <div className="right-part">
              <div className="blog-search">
                <SearchComponent
                  parentClass="min-w-[300px]"
                  onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBlogDetail([]);
                    setSearch(e?.target?.value);
                  }}
                  isSearchIcon={false}
                  value={search}
                  placeholder={t('Blog.confirmText.search')}
                  onClear={() => {
                    setBlogDetail([]);
                    setSearch('');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-list">
        <div className="container">
          <div className="flex justify-center">
            {isLoading && <Loaders />}
            {!isLoading && dataFound && (
              <NoDataFound message="No Data Found" desc="" />
            )}
          </div>
          <div className="blog-list-wrapper">
            {blogDetail &&
              blogDetail?.length > 0 &&
              blogDetail?.map((blog) => {
                return (
                  <div key={blog?.slug}>
                    <BlogCard
                      date={format(new Date(blog?.created_at), 'MMM dd, yyyy')}
                      imagePath={blog?.image_path}
                      linkURL={`/cms-blog-details/${blog?.slug}`}
                      title={blog?.title}
                      isFormDataBase
                    />
                  </div>
                );
              })}
          </div>

          {blogDetail && blogDetail?.length > 11 && (
            <div className="load-more">
              <Button
                onClickHandler={() => {
                  setPage(page + 1);
                }}
              >
                <Link to="#!">
                  Load More <Image iconName="arrowDownRounded" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <CMSCTA
        variant="2"
        linkText={blogData?.button_text}
        leftImagePath={blogData?.banner_image}
        title={blogData?.button_title}
        linkURL={blogData?.button_url ?? ''}
        ctaOne={cmsData?.blog}
        isFormDataBase
      />
      <GlobalSection />
    </>
  );
};

export default CMSBlog;
