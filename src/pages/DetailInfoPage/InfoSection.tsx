import { styled } from 'styled-components';

// TODO: 트위터 임베드 해오기
const TwitterEmbedSection = styled.section`
  width: 100%;
  height: 50px;
  padding: 25px 0;
  background-color: #fcfefe;
  border-radius: 20px;
  border: 2px dashed #1e232c33;
`;

const InfoSection = () => {
  return (
    <TwitterEmbedSection>
      <div>트위터 임베드 공간</div>
    </TwitterEmbedSection>
  );
};

export default InfoSection;
