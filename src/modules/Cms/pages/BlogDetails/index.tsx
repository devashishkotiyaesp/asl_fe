import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import { useAxiosGet } from 'hooks/useAxios';
import { CMSEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import './index.css';
// ** Date Functions **
import Breadcrumbs from 'components/Breadcrumbs';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';

interface CMSBlogDataInterface {
  title: string;
  tag?: string;
  created_at: Date | string;
  author?: string;
  social_media_links?: {
    instagram_link?: string;
    facebook_link?: string;
    twitter_link?: string;
  };
  image_path?: string;
  details?: string;
  conclusion_title?: string;
  conclusion?: string;
  designation?: string;
  bio?: string;
  slug: string;
  id: string;
}

interface BlogAll {
  count: number;
  currentPage: number;
  data: CMSBlogDataInterface[];
  lastPage: number;
  limit: number;
}

interface CMSBlogInterface {
  field_name: string;
  field_type: string;
  field_value: string;
  language: string;
  id: string;
}

interface CMSBlogAllDataInterface {
  title_of_hashTag: string;
  hashTag_description: string;
  button_title: string;
  banner_image: string;
  title_hashTag: string;
  button_text: string;
  button_url: string;
}

const BlogDetails = () => {
  const [getApi] = useAxiosGet();
  const { slug } = useParams();
  const [blogAllData, setBlogAllData] = useState<BlogAll>();
  const [blogDetail, setBlogDetail] = useState<CMSBlogDataInterface>();
  const [blogData, setBlogData] = useState<CMSBlogAllDataInterface>();
  const storeLang = useSelector(useLanguage);

  const fetchBlog = async () => {
    const { data: blogDetailData } = await getApi(`/blog`, {
      params: {
        slug,
      },
    });
    setBlogDetail(
      blogDetailData?.data?.find((data: CMSBlogDataInterface) => data?.slug === slug)
    );
    const { data } = await getApi(`/blog`, {
      params: {
        sort: '-created_at',
        limit: 5,
      },
    });
    setBlogAllData({
      ...data,
      data: data?.data?.filter((data: CMSBlogDataInterface) => data?.slug !== slug),
    });

    const { data: blogsData } = await getApi(`/cms-page-section`, {
      params: {
        sectionName: CMSEnum.Blog,
      },
    });
    const blog: CMSBlogAllDataInterface = {
      title_of_hashTag: '',
      hashTag_description: '',
      button_title: '',
      banner_image: '',
      title_hashTag: '',
      button_text: '',
      button_url: '',
    };

    blogsData?.blog?.forEach((data: CMSBlogInterface) => {
      const key: keyof CMSBlogAllDataInterface =
        data?.field_name as keyof CMSBlogAllDataInterface;
      if (data?.field_name) {
        blog[key] = data?.field_value;
      }
    });
    setBlogData(blog);
  };
  useEffect(() => {
    fetchBlog();
  }, [slug, storeLang]);
  return (
    <>
      <section className="blog-details">
        <div className="container">
          <Breadcrumbs
            items={[
              { url: '/cms-blog', label: 'Blog' },
              { url: '', label: blogDetail?.title ?? '' },
            ]}
            variant="slash"
          />
          <div className="wrapper">
            <div className="left-part">
              <div className="section-title">
                <span className="hashtag-label">{blogDetail?.tag}</span>
                <h1 className="h2">{blogDetail?.title}</h1>
              </div>
              <div className="blog-date-social">
                <div className="blog-date-wrap">
                  <div className="blog-date-item">
                    <Image iconName="calendar" />
                    {blogDetail &&
                      format(new Date(blogDetail?.created_at), 'MMM dd, yyyy')}
                  </div>
                  <div className="blog-date-item">
                    <Image iconName="editPen" />
                    {blogDetail?.author}
                  </div>
                </div>
                <div className="blog-social">
                  <ul>
                    <li>
                      <Link
                        to={blogDetail?.social_media_links?.instagram_link ?? ''}
                      >
                        <Image iconName="instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to={blogDetail?.social_media_links?.facebook_link ?? ''}>
                        <Image iconName="facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link to={blogDetail?.social_media_links?.twitter_link ?? ''}>
                        <Image iconName="x" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="blog-content-wrap">
                <div className="blog-content-img">
                  <Image src={blogDetail?.image_path} alt="" />
                </div>
                <div className="blog-content">
                  <p
                    className="blog-content"
                    dangerouslySetInnerHTML={{
                      __html: blogDetail?.details ?? '',
                    }}
                  />
                </div>

                <div className="blog-conclusion">
                  <span className="blog-conclusion-title">
                    {blogDetail?.conclusion_title}
                  </span>
                  {blogDetail?.conclusion}
                </div>

                <div className="author">
                  <div className="author-inner">
                    <div className="author-profile">
                      <div className="img">
                        <img src="/images/sign-1.png" alt="" />
                      </div>
                      <div className="author-data">
                        <span>{blogDetail?.author}</span>
                        <span>{blogDetail?.designation}</span>
                        <div className="author-social">
                          <ul>
                            <li>
                              <Link
                                to={
                                  blogDetail?.social_media_links?.instagram_link ??
                                  ''
                                }
                              >
                                <Image iconName="instagram" />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={
                                  blogDetail?.social_media_links?.twitter_link ?? ''
                                }
                              >
                                <Image iconName="x" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="author-content">
                      <p>{blogDetail?.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-part">
              <div className="recent-blog">
                <span className="recent-blog-title">Latest Posts</span>
                {blogAllData?.data?.map((data) => {
                  return (
                    <>
                      <Link
                        key={data?.slug}
                        to={`/cms-blog-details/${data?.slug}`}
                        className="recent-blog-item"
                      >
                        <div className="recent-blog-img">
                          <Image src={data?.image_path} />
                        </div>
                        <div className="recent-blog-content">
                          <p>{data?.title}</p>
                          <div className="blog-date-item">
                            <Image iconName="calendar" />
                            {format(new Date(data?.created_at), 'MMM dd, yyyy')}
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
                {/* <Link to="#!" className="recent-blog-item">
                  <div className="recent-blog-img">
                    <Image src="images/blog-3.png" />
                  </div>
                  <div className="recent-blog-content">
                    <p>The Cultural Significance of American Sign Language</p>
                    <div className="blog-date-item">
                      <Image iconName="calendar" />
                      Oct 17, 2023
                    </div>
                  </div>
                </Link>
                <Link to="#!" className="recent-blog-item">
                  <div className="recent-blog-img">
                    <Image src="images/blog-3.png" />
                  </div>
                  <div className="recent-blog-content">
                    <p>The Cultural Significance of American Sign Language</p>
                    <div className="blog-date-item">
                      <Image iconName="calendar" />
                      Oct 17, 2023
                    </div>
                  </div>
                </Link>
                <Link to="#!" className="recent-blog-item">
                  <div className="recent-blog-img">
                    <Image src="images/blog-3.png" />
                  </div>
                  <div className="recent-blog-content">
                    <p>The Cultural Significance of American Sign Language</p>
                    <div className="blog-date-item">
                      <Image iconName="calendar" />
                      Oct 17, 2023
                    </div>
                  </div>
                </Link>
                <Link to="#!" className="recent-blog-item">
                  <div className="recent-blog-img">
                    <Image src="images/blog-3.png" />
                  </div>
                  <div className="recent-blog-content">
                    <p>The Cultural Significance of American Sign Language</p>
                    <div className="blog-date-item">
                      <Image iconName="calendar" />
                      Oct 17, 2023
                    </div>
                  </div>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CMSCTA
        variant="2"
        linkText={blogData?.button_text}
        leftImagePath={blogData?.banner_image}
        title={blogData?.button_title}
        linkURL={blogData?.button_url ?? ''}
      />
      <GlobalSection />
    </>
  );
};

export default BlogDetails;
