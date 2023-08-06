import { useDispatch } from 'react-redux';

import { toggleEventListArtist } from '../../redux/manageModalSlice';

import { ModalCloseButton } from './AddEventModalStyle';
import { ArtistSearchInput } from './ArtistSelectModalStyle';
import CommonModal, { ModalPortal } from './CommonModal';
import * as S from './EventArtistModalStyle';

const EventArtistModal = () => {
  const dispatch = useDispatch();
  const handleCloseButton = () => {
    dispatch(toggleEventListArtist());
  };
  return (
    <ModalPortal>
      <CommonModal width="1156">
        <ModalCloseButton type="button" onClick={handleCloseButton} />
        <S.Wrapper>
          <S.LeftSection>
            <S.CurrentArtist />
            <S.TextBox>검색된 최애 아티스트명</S.TextBox>
            <S.ArtistNameText></S.ArtistNameText>
            <S.ArtistTypeWrapper>
              <S.ArtistTypeButton type="button"></S.ArtistTypeButton>
            </S.ArtistTypeWrapper>
            <S.ButtonWrapper>
              <S.SubmitButton type="button">확인</S.SubmitButton>
            </S.ButtonWrapper>
          </S.LeftSection>
          <S.RightSection>
            <S.Title>아티스트 검색하기</S.Title>
            <S.GroupSelectSection>
              <ArtistSearchInput />
              <S.ArtistListWrapper>
                <S.ArtistListSection></S.ArtistListSection>
              </S.ArtistListWrapper>
            </S.GroupSelectSection>
          </S.RightSection>
        </S.Wrapper>
      </CommonModal>
    </ModalPortal>
  );
};

export default EventArtistModal;
