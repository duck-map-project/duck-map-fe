import { styled } from 'styled-components';

import KakaoMap from '../../components/KakaoMap';

const PageWrapper = styled.section`
  width: 100%;
  padding: 26px 28px 26px 25px;
  background-color: #fcfefe;
  border-radius: 20px;
  border: 2px dashed #1e232c33;
`;

const MapSection = () => {
  return (
    <PageWrapper>
      <KakaoMap size="detail" />
    </PageWrapper>
  );
};

export default MapSection;
