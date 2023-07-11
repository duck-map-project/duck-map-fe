import { useEffect } from 'react';
import { styled } from 'styled-components';

export const MapSection = styled.section`
  width: 100%;
  height: 460px;
`;

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      // TODO: 기본 옵션 변경
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const _map = new window.kakao.maps.Map(container, options);
  }, []);
  return <MapSection id="map" />;
};

export default KakaoMap;
