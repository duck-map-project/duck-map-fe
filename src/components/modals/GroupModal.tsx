import imageCompression from 'browser-image-compression';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import closeIcon from '../../assets/icons/close.svg';
import photoIcon from '../../assets/icons/photo.svg';
import {
  useAddArtistsMutation,
  useEditArtistsMutation,
} from '../../redux/artistsSlice';
import { selectEditArtistSlice } from '../../redux/editArtistSlice';
import { useAddImageMutation } from '../../redux/imageSlice';
import { toggleGroup } from '../../redux/manageModalSlice';
import { toggleEditGroup } from '../../redux/manageModalSlice';

import {
  ModalTitle,
  ModalCloseButton,
  ImageNameWrapper,
  ImagePreview,
  StyledInput,
  NameInput,
  NameLabel,
  SubmitButton,
} from './AddGroupModalStyle';
import CommonModal from './CommonModal';
import { ModalPortal } from './CommonModal';

type ModalType = {
  type: 'add' | 'edit';
};

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const GroupModal = ({ type }: ModalType) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [groupImage, setGroupImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [groupName, setGroupName] = useState('');
  const [isImgCompressing, setIsImgCompressing] = useState(false);
  const [addNewImage] = useAddImageMutation({});
  const [addNewGroup] = useAddArtistsMutation();
  const [editGroup] = useEditArtistsMutation();
  const editData = useSelector(selectEditArtistSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'edit') {
      setGroupName(editData.name);
      if (editData.image === '/images/null') {
        setPreviewImage(testImg);
        return;
      }
      setPreviewImage(baseURL + editData.image);
    }
  }, [editData]);

  const onHideModal = () => {
    if (type === 'add') {
      dispatch(toggleGroup());
      return;
    }
    dispatch(toggleEditGroup());
  };

  const onChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const onChangeGroupImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imgFile = e.target.files[0];
      imgFile && setPreviewImage(URL.createObjectURL(imgFile));
      try {
        setIsImgCompressing(true);
        const compressedFile = await imageCompression(imgFile, {
          maxSizeMB: 0.2,
          maxIteration: 30,
        });
        setGroupImage(compressedFile);
        setIsImgCompressing(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //** 리팩토링 필수 */
  const onClickAddGroupBtn = async () => {
    if (isImgCompressing) {
      alert('사진 처리 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (groupImage === undefined) {
      if (previewImage === undefined) {
        alert('사진은 필수입니다.');
      }
    }

    if (groupImage) {
      const formData = new FormData();
      formData.append('file', groupImage);
      try {
        const response = await addNewImage({
          imageFile: formData,
        });
        if ('error' in response) {
          return;
        }
        if (type === 'add') {
          sendGroupInfo(response.data.filename);
          return;
        } else if (type === 'edit') {
          EditGroupInfo(response.data.filename);
        }
      } catch (error) {
        console.error(error);
      }
      return;
    }
    if (type === 'edit') {
      if (previewImage) {
        EditGroupInfo(previewImage.slice(8));
      }
    }
  };

  const sendGroupInfo = async (imageData: string) => {
    const groupData = {
      artistTypeId: 1,
      name: groupName,
      image: imageData,
    };
    try {
      await addNewGroup(groupData);
      onHideModal();
    } catch (error) {
      console.error(error);
      alert('앗, 제대로 저장되지 않았어요. 다시 시도해주세요');
    }
  };

  const EditGroupInfo = async (imageData: string) => {
    const groupData = {
      artistTypeId: 1,
      name: groupName,
      image: imageData,
    };
    try {
      await editGroup({ artistId: editData.id, artistValue: groupData });
      onHideModal();
    } catch (error) {
      console.error(error);
      alert('앗, 제대로 저장되지 않았어요. 다시 시도해주세요.');
    }
  };

  return (
    <ModalPortal>
      <CommonModal className="addGroupModal" onClick={onHideModal}>
        <ModalTitle>그룹 {type === 'add' ? '등록' : '수정'}하기</ModalTitle>
        <ModalCloseButton type="button" onClick={onHideModal}>
          <img src={closeIcon} />
        </ModalCloseButton>
        <ImageNameWrapper>
          <ImagePreview htmlFor="artistImage" previewimage={previewImage}>
            <img src={photoIcon} alt="그룹 이미지 선택" />
          </ImagePreview>
          <StyledInput
            type="file"
            id="artistImage"
            accept="image/png, image/jpeg"
            onChange={onChangeGroupImage}
          />
          <div>
            <NameLabel htmlFor="artistName">
              그룹 이름을 {type === 'add' ? '입력' : '수정'}해 주세요.
            </NameLabel>
            <NameInput
              type="text"
              id="artistName"
              value={groupName}
              onChange={onChangeGroupName}
              placeholder="그룹 이름"
            />
          </div>
        </ImageNameWrapper>
        <SubmitButton type="button" onClick={onClickAddGroupBtn}>
          완료
        </SubmitButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default GroupModal;
