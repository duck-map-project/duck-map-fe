import { styled } from 'styled-components';

const PageWrapper = styled.section`
  width: 100%;
  padding: 177px 146px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
`;

const MapSpace = styled.section`
  width: 100%;
  height: 554px;
`;

const MapSection = () => {
  return (
    <PageWrapper>
      <MapSpace />
      {/* TODO: TextBox 컴포넌트 추가되면 교체 */}
      <div>주소</div>
    </PageWrapper>
  );
};

export default MapSection;
