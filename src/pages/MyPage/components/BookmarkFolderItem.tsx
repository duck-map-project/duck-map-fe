import { useDispatch } from 'react-redux';

import { ReactComponent as Bookmarkfoldericon } from '../../../assets/icons/bookmark-folder.svg';
import deleteicon from '../../../assets/icons/crosspink.svg';
import pencilicon from '../../../assets/icons/editpencilbig.svg';
import { emojiArray } from '../../../components/modals/EmojiArray';
import { useDeleteBookmarkFolderMutation } from '../../../redux/bookmarkFolderSlice';
import { editFolderInfo } from '../../../redux/editBookmarkFolderSlice';
import { toggleEditBookmarkFolder } from '../../../redux/manageModalSlice';

import * as S from './BookmarkFolderItemStyle';

type FolderItemProps = {
  folderId: number;
  foldername: string;
  isEditmode: boolean;
  image: string;
  color: string;
  setSelectedFoldername: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number | null>>;
};

const BookmarkFolderItem = ({
  folderId,
  foldername,
  image,
  color,
  isEditmode,
  setSelectedFoldername,
  setSelectedFolderId,
}: FolderItemProps) => {
  const dispatch = useDispatch();
  const folderEmoji = image.slice(8);
  const [deleteFolder] = useDeleteBookmarkFolderMutation();

  const onClickFolder = () => {
    setSelectedFoldername(foldername);
    setSelectedFolderId(folderId);
  };
  const onClickEditBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(editFolderInfo({ folderId, name: foldername, image, color }));
    dispatch(toggleEditBookmarkFolder());
  };

  const onClickDeleteBtn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      !window.confirm(
        '폴더 삭제 시, 저장된 이벤트도 함께 사라지게 됩니다. 그래도 삭제하시겠습니까? '
      )
    ) {
      return;
    }

    const res = await deleteFolder(folderId);
    if ('error' in res) {
      const errorData = res;
      const error = errorData.error;
      if ('data' in error) {
        const { status } = error;
        alert(`에러가 발생하였습니다. Error Code: ${status}`);
      }
    } else {
      alert('성공적으로 삭제되었습니다.');
    }
  };

  return (
    <S.FolderWrapper onClick={onClickFolder}>
      <Bookmarkfoldericon fill={color} />
      <S.EmojiPreview img={folderEmoji}>
        <img
          src={emojiArray.find((emoji) => emoji.value === folderEmoji)?.img}
        />
      </S.EmojiPreview>
      {isEditmode && (
        <S.SettingIconsWrapper>
          <S.SettingIcon onClick={onClickEditBtn}>
            <img src={pencilicon} />
          </S.SettingIcon>
          <S.SettingIcon onClick={onClickDeleteBtn}>
            <img src={deleteicon} />
          </S.SettingIcon>
        </S.SettingIconsWrapper>
      )}
      <S.FolderNameWrapper>
        <S.NameIcon>
          <img src={pencilicon} />
        </S.NameIcon>
        <S.FolderName>{foldername}</S.FolderName>
      </S.FolderNameWrapper>
    </S.FolderWrapper>
  );
};

export default BookmarkFolderItem;
