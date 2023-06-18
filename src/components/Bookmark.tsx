import { styled } from 'styled-components';

export const BookmarkBox = styled.div`
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BookmarkImgBox = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
`;

const ForderImage = styled.img`
  width: 100%;
`;

const ForderName = styled.div`
  text-align: center;
  margin: 10px 0 20px 0;
`;

interface MyBookmarkProps {
  forderName: string;
  forderImage: string;
}

const BookmarkItem = (item: MyBookmarkProps) => {
  return (
    <BookmarkBox>
      <BookmarkImgBox>
        <ForderImage src="{item.forderImage}" />
      </BookmarkImgBox>
      <ForderName>{item.forderName}</ForderName>
    </BookmarkBox>
  );
};

export default BookmarkItem;
