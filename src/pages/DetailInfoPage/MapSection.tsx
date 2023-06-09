import { styled } from 'styled-components';

import px2vw from '../../utils/px2vw';

const PageWrapper = styled.section`
  width: 100%;
  padding: 177px ${px2vw(146)} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapSpace = styled.section`
  width: 100%;
  height: ${px2vw(554)};
  background-color: #000;
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
