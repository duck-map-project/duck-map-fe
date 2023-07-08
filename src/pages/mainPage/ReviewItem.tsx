import { styled } from 'styled-components';

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
`;

const ReviewImg = styled.img`
  width: 190px;
  height: 158px;
  border-radius: 20px;
  border: 2px solid #000000;
  margin-bottom: 4px;
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
`;

const ReviewItem = () => {
  return (
    <Wrapper>
      <ContentBox>
        <ReviewImg src="" />
        <ShortcutsButton>바로가기</ShortcutsButton>
      </ContentBox>
      <WrapperAfter />
    </Wrapper>
  );
};

export default ReviewItem;
