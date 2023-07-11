import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

import closeIcon from '../../assets/icons/close.svg';
import photoIcon from '../../assets/icons/photo.svg';
import { useAddArtistsMutation } from '../../redux/artistsSlice';
import { useAddImageMutation } from '../../redux/imageSlice';
import { toggleGroup } from '../../redux/manageModalSlice';

import CommonModal from './CommonModal';
import { ModalPortal } from './CommonModal';

// type groupType = {
//   type: string;
// };

type imageType = {
  previewimage: string;
};

const AddGroupModal = () => {
  // const [groupType, setGroupType] = useState('group');
  const [groupImage, setGroupImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [groupName, setGroupName] = useState('');
  const [addNewImage] = useAddImageMutation({});
  const [addNewGroup] = useAddArtistsMutation({});
  const dispatch = useDispatch();

  const onHideModal = () => {
    dispatch(toggleGroup());
  };

  // const onClickGroupType = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setGroupType(e.target.value);
  // };

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
    console.log(imageData);
    const groupData = {
      artistTypeId: 1,
      name: groupName,
      image: imageData,
    };
    try {
      const response = await addNewGroup(groupData);
      console.log(response);
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
        {/* <TypeTitle>아티스트 타입</TypeTitle>
        <TypeWrapper>
          <GroupTypeLabel htmlFor="group" type={groupType}>
            그룹
          </GroupTypeLabel>
          <StyledInput
            type="radio"
            id="group"
            name="artistType"
            value="group"
            onChange={onClickGroupType}
            // defaultChecked
          />
          <ArtistTypeLabel htmlFor="artist" type={groupType}>
            아티스트
          </ArtistTypeLabel>
          <StyledInput
            type="radio"
            id="artist"
            name="artistType"
            value="artist"
            onChange={onClickGroupType}
          />
        </TypeWrapper> */}
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

const ModalTitle = styled.h4`
  width: 300px;
  padding: 13px 58px;
  margin: 24px 0 50px;
  background-color: #fcf9a4;
  border-radius: 73px;
  border: 2.937px solid var(--line-black);
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 17px;
`;

// const TypeTitle = styled.span`
//   font-size: 24px;
//   font-weight: 700;
// `;

// const TypeWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 15px;
//   margin: 10px 0 32px;
// `;

// const TypeLabel = styled.label`
//   width: 130px;
//   font-size: 20px;
//   font-weight: 400;
//   text-align: center;
//   padding: 10px 20px;
//   border-radius: 30px;
//   border: 2px solid var(--line-black);
//   background: #f8f8fa;
//   box-shadow: 4.4px 4.4px 0px 0px rgba(0, 0, 0, 0.25);
//   cursor: pointer;
`;

// const ArtistTypeLabel = styled(TypeLabel)<groupType>`;
//   ${(props) =>
//     props.type === 'group'
//       ? ``
//       : `
//         color: #8F9196;
//         border-radius: 30px;
//         border: 2.056px solid #8B8E97;
//         background: #EDEDED;
//         `}
// `;

// const GroupTypeLabel = styled(TypeLabel)<groupType>`
//   ${(props) =>
//     props.type === 'group'
//       ? `
//         color: #8F9196;
//         border-radius: 30px;
//         border: 2.056px solid var(--unnamed, #8B8E97);
//         background: var(--unnamed, #EDEDED);
//         `
//       : ``}
// `;

const ImagePreview = styled.label<imageType>`
  display: block;
  position: relative;
  width: 232px;
  height: 232px;
  border: 2px solid var(--line-black);
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  ${(props) =>
    props.previewimage
      ? `
        background-image: url(${props.previewimage});
        background-size: cover;
        background-position: center center;
        `
      : `
        background-color: var(--line-grey2);
        `}
  & > img {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StyledInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;

const ImageNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 26px;
`;

const NameLabel = styled.label`
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin: 10px 20px;
`;
const NameInput = styled.input`
  width: 360px;
  height: 58px;
  padding: 20px;
  /* color: #4e5761; */
  font-size: 20px;
  font-weight: 400;
  background-color: #f8f8fa;
  border: 1.4px solid var(--font-black);
  border-radius: 30px;
  &::placeholder {
    font-size: 20px;
    color: 4e5761;
  }
`;

const SubmitButton = styled.button`
  width: 202px;
  font-size: 35px;
  font-weight: 700;
  padding: 16px;
  border: 3px solid var(--line-black);
  border-radius: 73px;
  background-color: #defcf9;
`;
