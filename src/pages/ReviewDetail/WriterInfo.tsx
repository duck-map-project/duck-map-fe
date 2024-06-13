import React from 'react';

import * as S from './ReviewDetailStyle';

interface WriterInfoProps {
  src: string;
  userName: string;
  eventStoreName: string;
}

const WriterInfo = ({ src, userName, eventStoreName }: WriterInfoProps) => {
  return (
    <S.InfoSection>
      <S.UserProfile src={src} />
      <S.UserText>{userName}</S.UserText>
      <S.StoreName>{eventStoreName}</S.StoreName>
    </S.InfoSection>
  );
};

export default WriterInfo;
