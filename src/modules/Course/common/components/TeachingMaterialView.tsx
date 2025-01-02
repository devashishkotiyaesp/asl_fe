import Button from 'components/Button/Button';
import Card from 'components/Card';
import MaterialsBox from 'components/MaterialsBox';
import { format } from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import { TeachingMaterialVieTypes } from 'modules/Course/Admin/form/types/courseContentManager.types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { MaterialTypeEnum } from '../constants';

const TeachingMaterialView = () => {
  const { t } = useTranslation();
  const [getMaterial, { isLoading }] = useAxiosGet();
  const { id } = useParams();
  const [practiceMaterials, setPracticeMaterials] =
    useState<TeachingMaterialVieTypes>();
  const getPracticeMaterials = async () => {
    const { data } = await getMaterial('/courses/course-material', {
      params: {
        slug: id,
      },
    });
    setPracticeMaterials(data);
  };

  useEffect(() => {
    getPracticeMaterials();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 p-4 ">
        <div className="lazy w-full h-20" />
        <div className="lazy !w-full h-28" />
        <div className="lazy !w-1/2 h-28" />
        <div className="lazy w-full h-48" />
      </div>
    );
  }

  return (
    <>
      <Card
        className="practice-materials-card shadow-none rounded-none"
        title="Teaching Materials"
      >
        <div className="">
          <span className="teacher-practice-materials-title">
            {t('CourseManagement.CoursePreview.TeachingMaterials.Documents')}
          </span>
          <div className="teacher-practice-materials-list">
            {practiceMaterials?.course_material
              .filter((item) => item.material_type === MaterialTypeEnum.TEACHING)
              .map((material) => (
                <MaterialsBox
                  isDownload
                  boxVariant="filePDF"
                  fileName={material?.material_media_url
                    ?.split('/')
                    ?.pop()
                    ?.split('.')
                    .slice(0, -1)
                    .toString()}
                  date={format(new Date(material?.updated_at), 'dd-mm-yyyy')}
                />
              ))}
          </div>
        </div>
        <Card
          className="teaching-card"
          title={t(
            'CourseManagement.CoursePreview.TeachingMaterials.VideoMaterials'
          )}
          isGray
          minimal
        >
          {practiceMaterials?.course_teaching_media?.map((media) => (
            <div className="teaching-materials-item">
              <div className="">
                <p>{media.title}</p>
                <Link to={media.link}>{media.link}</Link>
              </div>
              <Button variants="PrimaryWood">
                {t('CourseManagement.CoursePreview.TeachingMaterials.View')}
              </Button>
            </div>
          ))}
        </Card>
      </Card>
    </>
  );
};

export default TeachingMaterialView;
