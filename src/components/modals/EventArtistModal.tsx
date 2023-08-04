import { useState } from 'react';

import { ModalCloseButton } from './AddEventModalStyle';
import ArtistListItem from './ArtistListItem';
import { ArtistSearchInput } from './ArtistSelectModalStyle';
import CommonModal, { ModalPortal } from './CommonModal';
import * as S from './EventArtistModalStyle';

const EventArtistModal = () => {
  const [groupId, _setGroupId] = useState<number | null>(null);
  return (
    <ModalPortal>
      <CommonModal width="1156">
        <ModalCloseButton />
        <S.Wrapper>
          <S.LeftSection>
            <S.CurrentArtist />
            <S.TextBox>검색된 최애 아티스트명</S.TextBox>
            <S.ArtistNameText>최애 이름</S.ArtistNameText>
            <S.ArtistTypeWrapper>
              <S.ArtistTypeButton>ex</S.ArtistTypeButton>
            </S.ArtistTypeWrapper>
            <S.ButtonWrapper>
              {groupId ? <S.PrevButton>그룹 재선택</S.PrevButton> : null}
              <S.SubmitButton>확인</S.SubmitButton>
            </S.ButtonWrapper>
          </S.LeftSection>
          <S.RightSection>
            <S.GroupSelectSection groupId={groupId}>
              {groupId ? null : <ArtistSearchInput />}

              <S.ArtistListSection>
                <ArtistListItem image="test" currentId={1} selectedIds={[1]} />
              </S.ArtistListSection>
            </S.GroupSelectSection>
          </S.RightSection>
        </S.Wrapper>
      </CommonModal>
    </ModalPortal>
  );
};

export default EventArtistModal;
