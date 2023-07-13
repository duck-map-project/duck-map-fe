import { useState } from 'react';
import { useDispatch } from 'react-redux';

import closeIcon from '../../assets/icons/close.svg';
import photoIcon from '../../assets/icons/photo.svg';
import { useAddArtistsMutation } from '../../redux/artistsSlice';
import { useAddImageMutation } from '../../redux/imageSlice';
import { toggleGroup } from '../../redux/manageModalSlice';

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

const AddGroupModal = () => {
  const [groupImage, setGroupImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [groupName, setGroupName] = useState('');
  const [addNewImage] = useAddImageMutation({});
  const [addNewGroup] = useAddArtistsMutation({});
  const dispatch = useDispatch();

  const onHideModal = () => {
    dispatch(toggleGroup());
  };

  const onChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const onChangeGroupImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imgFile = e.target.files[0];
      //파일 size 확인
      if (imgFile.size > 1024 ** 2) {
        alert('앗! 이미지가 너무 커요. 1MB 이하의 사진만 업로드 가능합니다.');
        return;
      }
      setGroupImage(imgFile);
      setPreviewImage(URL.createObjectURL(imgFile));
    }
  };

  const onClickAddGroupBtn = async () => {
    const formData = new FormData();
    if (groupImage instanceof File) {
      formData.append('file', groupImage);
      try {
        const response = await addNewImage({
          imageFile: formData,
        });
        if ('error' in response) {
          return;
        }

        sendGroupInfo(response.data.filename);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const sendGroupInfo = async (imageData: any) => {
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
      alert('앗, 제대로 저장되지 않았어요 다시 시도해주세요');
    }
  };

  return (
    <ModalPortal>
      <CommonModal className="addGroupModal" onClick={onHideModal}>
        <ModalTitle>그룹 등록하기</ModalTitle>
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
              그룹 이름을 입력해 주세요.
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

export default AddGroupModal;
