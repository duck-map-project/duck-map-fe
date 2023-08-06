import { hsvaToHex, hexToHsva } from '@uiw/color-convert';
import Wheel from '@uiw/react-color-wheel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { ReactComponent as BookmarkFolder } from '../../assets/icons/bookmark-folder.svg';
import closesmallicon from '../../assets/icons/close-small.svg';
import closeicon from '../../assets/icons/close.svg';
import {
  useAddBookmarkFolderMutation,
  useUpdateBookmarkFolderMutation,
} from '../../redux/bookmarkFolderSlice';
import { selectEditBookmarkFolder } from '../../redux/editBookmarkFolderSlice';
import {
  toggleAddBookmarkFolder,
  toggleEditBookmarkFolder,
} from '../../redux/manageModalSlice';

import {
  EmojiBox,
  EmojiLabel,
  EmojiLists,
  EmojiPreview,
  EmojiPreviewFolderWrapper,
  ModalContent,
  ModalCloseButton,
  ModalTitle,
  FolderColorSection,
  FoldericonSection,
  FoldernameSection,
  IconSectionTitle,
  IconSelectSection,
  Previewtext,
  ColorBox,
  ColorPreviewFolderWrapper,
  ColorSectionTitle,
  ColorSelectSection,
  AddNewFolderBtn,
} from './AddBookmarkFolderStyle';
import CommonModal from './CommonModal';
import { ModalPortal } from './CommonModal';
import { emojiArray } from './EmojiArray';

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
      <EmojiLabel htmlFor={value} selected={isSelected}>
        <img src={img} />
      </EmojiLabel>
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
        <ModalContent>
          <ModalTitle>
            북마크 폴더 {type === 'add' ? '추가' : '수정'}하기
          </ModalTitle>
          <ModalCloseButton type="button" onClick={onHideModal}>
            <img src={closeicon} />
          </ModalCloseButton>
          <FoldernameSection>
            <label>
              북마크 폴더 이름을 {type === 'add' ? '입력' : '수정'}해 주세요.
            </label>
            <input
              type="text"
              placeholder={
                type === 'add' ? '북마크 폴더 이름' : '선택한 북마크 폴더 이름'
              }
              value={foldername}
              onChange={onChangeFoldername}
            />
            <span onClick={onDeleteCurrentFoldername}>
              <img src={closesmallicon} />
            </span>
          </FoldernameSection>
          <FoldericonSection>
            <IconSectionTitle>폴더 아이콘을 선택해 주세요.</IconSectionTitle>
            <IconSelectSection>
              <EmojiBox>
                <EmojiLists>
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
                </EmojiLists>
              </EmojiBox>
              <EmojiPreviewFolderWrapper>
                <BookmarkFolder fill="#DEFCF9" />
                <EmojiPreview img={selectEmoji}>
                  <img
                    src={
                      emojiArray.find((emoji) => emoji.value === selectEmoji)
                        ?.img
                    }
                  />
                </EmojiPreview>
                <Previewtext>미리보기</Previewtext>
              </EmojiPreviewFolderWrapper>
            </IconSelectSection>
          </FoldericonSection>
          <FolderColorSection>
            <ColorSectionTitle>폴더 컬러를 선택해 주세요.</ColorSectionTitle>
            <ColorSelectSection>
              <ColorBox>
                <Wheel
                  color={hsva}
                  onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
                />
              </ColorBox>
              <ColorPreviewFolderWrapper>
                <BookmarkFolder fill={selectColor} />
                <Previewtext>미리보기</Previewtext>
              </ColorPreviewFolderWrapper>
            </ColorSelectSection>
          </FolderColorSection>
          <AddNewFolderBtn
            type="button"
            onClick={type === 'add' ? onClickAddNewFolder : onClickEditFolder}
          >
            완료
          </AddNewFolderBtn>
        </ModalContent>
      </CommonModal>
    </ModalPortal>
  );
};

export default BookmarkFolderModal;
