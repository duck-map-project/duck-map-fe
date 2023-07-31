import { useGetArtistsTypeQuery } from '../../redux/artistsTypeSlice';

import ArtistTypeListItem from './ArtistTypeListItem';
import { ArtistTypeListSection } from './ArtistTypeListStyle';

const ArtistTypeList = () => {
  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useGetArtistsTypeQuery();

  let content;

  if (categoryData) {
    content = categoryData.map((data) => (
      <ArtistTypeListItem key={data.id} id={data.id} text={data.type} />
    ));
  } else if (isLoading) {
    content = <div>아티스트 타입 목록을 불러오는 중입니다</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <ArtistTypeListSection>{content}</ArtistTypeListSection>;
};

export default ArtistTypeList;
