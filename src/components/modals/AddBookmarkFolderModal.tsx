import { hsvaToHex } from '@uiw/color-convert';
import Wheel from '@uiw/react-color-wheel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as BookmarkFolder } from '../../assets/icons/bookmark-folder.svg';
import closesmallicon from '../../assets/icons/close-small.svg';
import closeicon from '../../assets/icons/close.svg';
import { useAddBookmarkFolderMutation } from '../../redux/bookmarkFolderSlice';
import { toggleBookmarkFolder } from '../../redux/manageModalSlice';

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

const BookmarkFolderModal = () => {
  const [foldername, setFoldername] = useState('');
  const [selectEmoji, setSelectEmoji] = useState('heartred');
  const dispatch = useDispatch();

  //color-picker
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [selectColor, setSelectColor] = useState('#83aee6');

  const [addNewBookmarkFolder] = useAddBookmarkFolderMutation();

  useEffect(() => {
    setSelectColor(hsvaToHex(hsva));
  }, [hsva]);

  const onHideModal = () => {
    dispatch(toggleBookmarkFolder());
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

  const onClickAddNewFolder = async () => {
    await addNewBookmarkFolder({
      name: foldername,
      image: selectEmoji,
      color: selectColor,
    });
  };
  return (
    <ModalPortal>
      <CommonModal onClick={onHideModal} width="860">
        <ModalContent>
          <ModalTitle>북마크 폴더 추가하기</ModalTitle>
          <ModalCloseButton type="button" onClick={onHideModal}>
            <img src={closeicon} />
          </ModalCloseButton>
          <FoldernameSection>
            <label>북마크 폴더 이름을 입력해 주세요.</label>
            <input
              type="text"
              placeholder="북마크 폴더 이름"
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
          <AddNewFolderBtn onClick={onClickAddNewFolder}>완료</AddNewFolderBtn>
        </ModalContent>
      </CommonModal>
    </ModalPortal>
  );
};

export default BookmarkFolderModal;
