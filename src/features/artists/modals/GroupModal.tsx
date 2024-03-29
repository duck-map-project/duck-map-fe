import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import closeIcon from '../../../assets/close.svg';
import photoIcon from '../../../assets/photo.svg';
import defaultImage from '../../../assets/user-profile.svg';
import Loading from '../../../components/Loading';
import CommonModal from '../../../components/modal/CommonModal';
import useImageProcessing from '../../../hooks/useImageProcessing';
import { performApiAction } from '../../../utils/apiHelpers';
import { ModalProps } from '../../modal/modalsSlice';
import {
  useAddArtistsMutation,
  useEditArtistsMutation,
} from '../services/artistsApiSlice';
import { selectEditArtistSlice } from '../services/setArtistSlice';

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

const GroupModal = ({ type, onClose }: ModalProps) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [groupImage, setGroupImage] = useState<File>(); //File 자체
  const [previewImage, setPreviewImage] = useState<string>(''); //프리뷰 이미지용 blob
  const [savedImagefile, setSavedImagefile] = useState<string>(''); // 저장된 이미지의 filename
  const [groupName, setGroupName] = useState<string | undefined>(undefined);
  const [isRequesting, setIsRequesting] = useState(false);
  const [addGroup] = useAddArtistsMutation();
  const [editGroup] = useEditArtistsMutation();
  const { ImageProcessing } = useImageProcessing();
  const editData = useSelector(selectEditArtistSlice);

  useEffect(() => {
    if (type === 'edit') {
      setGroupName(editData.name);
      if (editData.image === '/images/null') {
        setPreviewImage(defaultImage);
        return;
      }
      setSavedImagefile(editData.image.slice(8));
      setPreviewImage(baseURL + editData.image);
    }
  }, [editData]);

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

  const onClickSaveBtnHandler = async () => {
    try {
      setIsRequesting(true);

      if (!groupName) {
        alert('그룹아티스트의 이름을 입력해주세요.');
        throw new Error('Invalid Group-Artist name');
      }

      if (!groupImage && !savedImagefile) {
        alert('그룹아티스트의 사진을 업로드 해주세요.');
        throw new Error('Invalid Group-Artist Picture');
      }

      const filename = await ImageProcessing({
        newImage: groupImage,
        savedImage: savedImagefile,
      });

      if (type === 'add' && filename) {
        const data = {
          artistTypeId: 1,
          name: groupName,
          image: filename,
        };
        const successMessage =
          '그룹 아티스트의 정보가 정상적으로 추가되었습니다.';
        performApiAction(data, addGroup, onClose, successMessage);
      } else if (type === 'edit' && filename) {
        const data = {
          artistTypeId: 1,
          name: groupName,
          image: filename,
        };
        const successMessage =
          '그룹 아티스트의 정보가 정상적으로 수정되었습니다.';
        performApiAction(
          {
            artistId: editData.id,
            artistValue: data,
          },
          editGroup,
          onClose,
          successMessage
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <CommonModal className="addGroupModal" onClick={onClose}>
      {isRequesting && <Loading />}
      <ModalTitle>그룹 {type === 'add' ? '등록' : '수정'}하기</ModalTitle>
      <ModalCloseButton type="button" onClick={onClose}>
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
      <SubmitButton type="button" onClick={onClickSaveBtnHandler}>
        완료
      </SubmitButton>
    </CommonModal>
  );
};

export default GroupModal;
