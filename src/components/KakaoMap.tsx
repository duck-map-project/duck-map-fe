import { useEffect } from 'react';
import { css, styled } from 'styled-components';

export const MapSection = styled.section<KakaoMapProps>`
  width: 100%;
  ${(props) =>
    props.size === 'main' ? main : props.size === 'eventList' ? eventList : ''};
`;

const main = css`
  height: 460px;
`;

const eventList = css`
  height: 204px;
  border-radius: 20px;
`;

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  size: 'main' | 'eventList';
}

const KakaoMap = ({ size }: KakaoMapProps) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      // TODO: 기본 옵션 변경
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const _map = new window.kakao.maps.Map(container, options);
  }, []);
  return <MapSection id="map" size={size} />;
};

export default KakaoMap;
