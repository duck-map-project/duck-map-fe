import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import plusicon from '../../../assets/icons/cross.svg';
import editicon from '../../../assets/icons/editpencil.svg';
import starticon from '../../../assets/icons/starIcon.svg';
import { useGetBookmarkFoldersQuery } from '../../../features/bookmarkFolderSlice';
import { toggleAddBookmarkFolder } from '../../../features/manageModalSlice';
import { BookmarkFolderType } from '../../../types/bookmarkFolderType';

import BookmarkFolderItem from './BookmarkFolderItem';
import * as S from './BookmarkFoldersStyle';

type FolderProps = {
  setSelectedFoldername: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number | null>>;
};

const BookmarkFolders = ({
  setSelectedFoldername,
  setSelectedFolderId,
}: FolderProps) => {
  const dispatch = useDispatch();
  const [numberOfFolders, setNumberOfFolders] = useState(0);
  const [isLast, setIsLast] = useState(true);
  const [isEditmode, setIsEditmode] = useState(false);
  const [bookmarkFoldersArray, setBookmarkFoldersArray] = useState<
    BookmarkFolderType[]
  >([]);

  const {
    data: bookmarkFoldersData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBookmarkFoldersQuery({});

  //무한스크롤 상태
  isLast;

  useEffect(() => {
    if (bookmarkFoldersData) {
      setBookmarkFoldersArray(bookmarkFoldersData.content);
      setNumberOfFolders(bookmarkFoldersData.numberOfElements);
      setIsLast(bookmarkFoldersData.isLast);
    }
  }, [bookmarkFoldersData]);

  const onClickAddNewFolder = () => {
    dispatch(toggleAddBookmarkFolder());
  };

  const onClickToggleEditmode = () => {
    setIsEditmode((prev) => !prev);
  };

  const onClickNoEditmode = () => {
    setIsEditmode(false);
  };

  let content;
  if (isLoading) {
    content = <div>북마크 폴더를 불러오는 중입니다.</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else if (isSuccess) {
    content = bookmarkFoldersArray.map((folder) => (
      <BookmarkFolderItem
        key={folder.id}
        folderId={folder.id}
        foldername={folder.name}
        image={folder.image}
        color={folder.color}
        isEditmode={isEditmode}
        setSelectedFoldername={setSelectedFoldername}
        setSelectedFolderId={setSelectedFolderId}
      />
    ));
  }
  return (
    <>
      <S.FoldersHeader>
        <S.Path>
          <S.Star src={starticon} />
          <span>북마크</span>
        </S.Path>
        <S.SettingBtnWrapper>
          <S.SettingBtn onClick={onClickAddNewFolder}>
            <img src={plusicon} />
            <S.SettingBtnText>북마크 폴더 추가하기</S.SettingBtnText>
          </S.SettingBtn>
          <S.GoEditBtn
            onClick={onClickToggleEditmode}
            editmode={isEditmode ? isEditmode.toString() : undefined}
          >
            <img src={editicon} />
            <S.SettingBtnText>북마크 편집하기</S.SettingBtnText>
          </S.GoEditBtn>
        </S.SettingBtnWrapper>
      </S.FoldersHeader>
      <S.FoldersContainer onClick={onClickNoEditmode}>
        {numberOfFolders ? (
          content
        ) : (
          <div> 북마크 폴더가 존재하지 않습니다.</div>
        )}
      </S.FoldersContainer>
    </>
  );
};

export default BookmarkFolders;
