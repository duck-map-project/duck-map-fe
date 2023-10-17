import imageCompression from 'browser-image-compression';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import closeIcon from '../../../assets/close.svg';
import photoIcon from '../../../assets/photo.svg';
import Loading from '../../../components/Loading';
import CommonModal, {
  ModalPortal,
} from '../../../components/modal/CommonModal';
import { useAddImageMutation } from '../../images/imageSlice';
import { toggleGroup, toggleEditGroup } from '../../manageModalSlice';
import {
  useAddArtistsMutation,
  useEditArtistsMutation,
} from '../services/artistsSlice';
import { selectEditArtistSlice } from '../services/editArtistSlice';

import {
  ModalTitle,
  ModalCloseButton,
  ImageNameWrapper,
  ImagePreview,
  StyledInput,
  NameWrapper,
  NameInput,
  NameLabel,
  SubmitButton,
} from './GroupModalStyle';

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
  const [isRequesting, setIsRequesting] = useState(false);
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
      setGroupImage(imgFile);
      setPreviewImage(URL.createObjectURL(imgFile));
    }
  };

  //** 리팩토링 필수 */
  const onClickAddGroupBtn = async () => {
    if (groupImage === undefined) {
      if (previewImage === undefined) {
        alert('사진은 필수입니다.');
        return;
      }
    }
    setIsRequesting(true);
    if (groupImage) {
      //image-compressing
      let compressedFile;

      try {
        compressedFile = await imageCompression(groupImage, {
          maxSizeMB: 0.2,
          maxIteration: 30,
        });
      } catch (error) {
        console.error(error);
        setIsRequesting(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', compressedFile);
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
      setIsRequesting(false);
      return;
    }
    if (type === 'edit') {
      if (previewImage) {
        EditGroupInfo(previewImage.slice(8));
        setIsRequesting(false);
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
        {isRequesting && <Loading text="저장중입니다. 잠시만 기다려주세요." />}
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
          <NameWrapper>
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
          </NameWrapper>
        </ImageNameWrapper>
        <SubmitButton type="button" onClick={onClickAddGroupBtn}>
          완료
        </SubmitButton>
      </CommonModal>
    </ModalPortal>
  );
};

export default GroupModal;
