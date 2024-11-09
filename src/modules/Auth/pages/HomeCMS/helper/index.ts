import { CmsSectionProps, pointDataArrayProps } from '../types';

export const formatCMSObjectData = ({ data }: { data: CmsSectionProps[] }) => {
  const formattedData: Record<string, string | string[] | pointDataArrayProps[]> =
    {};

  data?.forEach(({ field_name, field_value }) => {
    try {
      const parsedValue = JSON.parse(field_value);
      formattedData[field_name] = Array.isArray(parsedValue)
        ? parsedValue
        : field_value;
    } catch {
      formattedData[field_name] = field_value;
    }
  });

  return formattedData;
};
