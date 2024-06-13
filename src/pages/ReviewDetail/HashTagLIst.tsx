import React from 'react';

import * as S from './ReviewDetailStyle';

interface hashTagListProps {
  hashTags: string[];
}

const HashTagLIst = ({ hashTags }: hashTagListProps) => {
  return (
    <S.HashTagSection>
      {hashTags.map((hasTag, i) => (
        <S.HashTag key={i}>{hasTag}</S.HashTag>
      ))}
    </S.HashTagSection>
  );
};

export default HashTagLIst;
