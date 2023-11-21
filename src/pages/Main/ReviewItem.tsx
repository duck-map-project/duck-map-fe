import { styled } from 'styled-components';

import shortcutImg from '../../assets/shortcuts-arrow.svg';
import { useRouter } from '../../hooks/useRouter';
import media from '../../utils/mediaQuery';

const Wrapper = styled.li`
  position: relative;
`;

const ContentBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 208px;
  height: 208px;
  border: 2px solid #000000;
  border-radius: 20px;
  background-color: #c3ffe7;
  position: relative;
  z-index: 99;
  padding-top: 10px;
  ${media.mobile`
    width: 98px;
    height: auto;
    border: 1px solid #000000;
    border-radius: 5.81px;
    padding-top: 3px;
    padding-bottom: 4px;
  `}
`;

const WrapperAfter = styled.div`
  display: block;
  width: 208px;
  height: 208px;
  border: 2px solid #000000;
  border-radius: 20px;
  background-color: #f8f8fa;
  position: absolute;
  top: 8px;
  left: 9px;
  z-index: 9;
  ${media.mobile`
    width: 100%;
    height: 100%;
    border: 1px solid #000000;
    border-radius: 5.81px;
    top: 4px;
    left: 4px;
  `}
`;

const ReviewImg = styled.img`
  width: 190px;
  height: 158px;
  border-radius: 20px;
  border: 2px solid #000000;
  margin-bottom: 4px;
  ${media.mobile`
    width: 90px;
    height: 76px;
    border: 1px solid #000000;
    border-radius: 5.81px;
    margin-bottom: 3px;
  `}
`;

const ShortcutsButton = styled.button`
  width: 94px;
  padding: 2px 0;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.248125;
  background-color: #f8f8fa;
  border: 2px solid #000000;
  border-radius: 20px;
  box-shadow: 3px 3px 0px 0px #00000040;
  ${media.mobile`
    width: fit-content;
    padding: 3.5px 9.5px;
    border: 1px solid #000000;
    border-radius: 5.81px;
    box-shadow: 0.8719722628593445px 0.8719722628593445px 0px 0px #00000040;
  `}
`;

const ShortcutTxt = styled.p`
  ${media.mobile`
      display: none;
  `}
`;

const ShortcutImg = styled.img`
  display: none;
  ${media.mobile`
    display: block;
    width: 8px;
  `}
`;

interface ReviewItemProps {
  image: string;
  reviewId: number;
}

const ReviewItem = ({ image, reviewId }: ReviewItemProps) => {
  const { routeTo } = useRouter();
  return (
    <Wrapper>
      <ContentBox>
        <ReviewImg src={image} />
        <ShortcutsButton
          type="button"
          onClick={() => {
            routeTo(`/review/${reviewId}`);
          }}
        >
          <ShortcutTxt>바로가기</ShortcutTxt>
          <ShortcutImg src={shortcutImg} alt="바로가기" />
        </ShortcutsButton>
      </ContentBox>
      <WrapperAfter />
    </Wrapper>
  );
};

export default ReviewItem;
