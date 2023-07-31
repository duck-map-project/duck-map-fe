import { useGetEventCategoryQuery } from '../../redux/eventCategoryType';

import CategoryListItem from './CategoryListItem';
import { CategoryListSection } from './CategoryListStyle';

const CategoryList = () => {
  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useGetEventCategoryQuery();
  isLoading;
  isError;
  error;

  let content;

  if (categoryData) {
    content = categoryData.map((data) => (
      <CategoryListItem key={data.id} id={data.id} text={data.category} />
    ));
  } else if (isLoading) {
    content = <div>카테고리 목록을 불러오는 중입니다</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <CategoryListSection>{content}</CategoryListSection>;
};

export default CategoryList;
