import { hsvaToHex, hexToHsva } from '@uiw/color-convert';
import Wheel from '@uiw/react-color-wheel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import closesmallicon from '../../../assets/close-small.svg';
import closeicon from '../../../assets/close.svg';
import CommonModal, {
  ModalPortal,
} from '../../../components/modal/CommonModal';
import { emojiArray } from '../../../utils/EmojiArray';
import {
  toggleAddBookmarkFolder,
  toggleEditBookmarkFolder,
} from '../../modal/manageModalSlice';
import {
  useAddBookmarkFolderMutation,
  useUpdateBookmarkFolderMutation,
} from '../services/bookmarkFolderApiSlice';
import { selectEditBookmarkFolder } from '../services/setBookmarkFolderSlice';

import * as S from './BookmarkFolderStyle';

type EmojiType = {
  value: string;
  img: string;
  name: string;
  isSelected: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type FolderModalType = {
  type: 'add' | 'edit';
};

const Emoji = ({ value, img, name, isSelected, onChange }: EmojiType) => {
  return (
    <>
      <S.EmojiLabel htmlFor={value} selected={isSelected}>
        <img src={img} />
      </S.EmojiLabel>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        className="sr-only"
        onChange={onChange}
      />
    </>
  );
};

const BookmarkFolderModal = ({ type }: FolderModalType) => {
  const [folderId, setFolderId] = useState<number>(0);
  const [foldername, setFoldername] = useState('');
  const [selectEmoji, setSelectEmoji] = useState('heartred');

  //color-picker
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [selectColor, setSelectColor] = useState('');

  const dispatch = useDispatch();
  const editData = useSelector(selectEditBookmarkFolder);

  useEffect(() => {
    if (type === 'edit') {
      setFolderId(editData.folderId);
      setFoldername(editData.name);
      setSelectEmoji(editData.image.slice(8));
      setHsva(hexToHsva(editData.color));
    }
  }, [editData]);

  const [addNewBookmarkFolder] = useAddBookmarkFolderMutation();
  const [editBookmarkFolder] = useUpdateBookmarkFolderMutation();

  useEffect(() => {
    setSelectColor(hsvaToHex(hsva));
  }, [hsva]);

  const onHideModal = () => {
    if (type === 'add') {
      dispatch(toggleAddBookmarkFolder());
    } else if (type === 'edit') {
      dispatch(toggleEditBookmarkFolder());
    }
  };

  const onChangeFoldername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoldername(e.target.value);
  };

  const onDeleteCurrentFoldername = () => {
    setFoldername('');
  };

  const onSelectEmoji = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectEmoji(e.target.value);
  };

  const onClickAddNewFolder = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (foldername === '') {
      alert('폴더 이름을 작성해주세요.');
      return;
    }
    await addNewBookmarkFolder({
      name: foldername,
      image: selectEmoji,
      color: selectColor,
    });
    onHideModal();
  };

  const onClickEditFolder = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (foldername === '') {
      alert('폴더 이름을 작성해주세요.');
      return;
    }
    const data = {
      name: foldername,
      image: selectEmoji,
      color: selectColor,
    };
    await editBookmarkFolder({ folderId, folderValue: data });
    onHideModal();
  };

  return (
    <ModalPortal>
      <CommonModal onClick={onHideModal} width="860">
        <S.ModalContent>
          <S.ModalTitle>
            북마크 폴더 {type === 'add' ? '추가' : '수정'}하기
          </S.ModalTitle>
          <S.ModalCloseButton type="button" onClick={onHideModal}>
            <img src={closeicon} />
          </S.ModalCloseButton>
          <S.FoldernameSection>
            <S.FoldernameLabel>
              북마크 폴더 이름을 {type === 'add' ? '입력' : '수정'}해 주세요.
            </S.FoldernameLabel>
            <S.FoldernameInput
              type="text"
              placeholder={
                type === 'add' ? '북마크 폴더 이름' : '선택한 북마크 폴더 이름'
              }
              value={foldername}
              onChange={onChangeFoldername}
            />
            <S.FoldernameDeleteBtn onClick={onDeleteCurrentFoldername}>
              <img src={closesmallicon} />
            </S.FoldernameDeleteBtn>
          </S.FoldernameSection>
          <S.FoldericonSection>
            <S.IconSectionTitle>
              폴더 아이콘을 선택해 주세요.
            </S.IconSectionTitle>
            <S.IconSelectSection>
              <S.EmojiBox>
                <S.EmojiLists>
                  {emojiArray.map((emoji) => (
                    <Emoji
                      key={emoji.id}
                      name={emoji.name}
                      value={emoji.value}
                      img={emoji.img}
                      onChange={onSelectEmoji}
                      isSelected={emoji.value === selectEmoji}
                    />
                  ))}
                </S.EmojiLists>
              </S.EmojiBox>
              <S.EmojiPreviewFolderWrapper>
                <S.StyledBookmarkFolder fill="#DEFCF9" />
                <S.EmojiPreview img={selectEmoji}>
                  <img
                    src={
                      emojiArray.find((emoji) => emoji.value === selectEmoji)
                        ?.img
                    }
                  />
                </S.EmojiPreview>
                <S.Previewtext>미리보기</S.Previewtext>
              </S.EmojiPreviewFolderWrapper>
            </S.IconSelectSection>
          </S.FoldericonSection>
          <S.FolderColorSection>
            <S.ColorSectionTitle>
              폴더 컬러를 선택해 주세요.
            </S.ColorSectionTitle>
            <S.ColorSelectSection>
              <S.ColorBox>
                <Wheel
                  color={hsva}
                  onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
                />
              </S.ColorBox>
              <S.ColorPreviewFolderWrapper>
                <S.StyledBookmarkFolder fill={selectColor} />
                <S.Previewtext>미리보기</S.Previewtext>
              </S.ColorPreviewFolderWrapper>
            </S.ColorSelectSection>
          </S.FolderColorSection>
          <S.AddNewFolderBtn
            type="button"
            onClick={type === 'add' ? onClickAddNewFolder : onClickEditFolder}
          >
            완료
          </S.AddNewFolderBtn>
        </S.ModalContent>
      </CommonModal>
    </ModalPortal>
  );
};

export default BookmarkFolderModal;
