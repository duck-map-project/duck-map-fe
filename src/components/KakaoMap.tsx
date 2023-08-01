import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { css, styled } from 'styled-components';

import { selectAddress, selectStoreName } from '../redux/eventPlaceSlice';

export const MapSection = styled.section<KakaoMapProps>`
  width: 100%;
  ${(props) => (props.size ? sizes[props.size] : '')};
`;

const main = css`
  height: 460px;
`;

const eventList = css`
  height: 204px;
  border-radius: 20px;
`;

const detail = css`
  height: 450px;
`;

const sizes = { main, eventList, detail };

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  size: 'main' | 'eventList' | 'detail';
}

interface MarkerInfo {
  coords: any;
  placeName: string;
}

const KakaoMap = ({ size }: KakaoMapProps) => {
  const addressList = useSelector(selectAddress);
  const storeList = useSelector(selectStoreName);
  console.log(storeList);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      // TODO: 기본 옵션 변경
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const markers: MarkerInfo[] = [];

    const geocoder = new window.kakao.maps.services.Geocoder();

    addressList.forEach((address, index) => {
      geocoder.addressSearch(address, function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const placeName = storeList[index] || address;

          markers.push({
            coords,
            placeName,
          });

          if (markers.length === addressList.length) {
            markers.forEach((markerInfo) => {
              const marker = new window.kakao.maps.Marker({
                map,
                position: markerInfo.coords,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${markerInfo.placeName}</div>`,
              });
              infowindow.open(map, marker);
            });

            let totalLat = 0;
            let totalLng = 0;
            markers.forEach((markerInfo) => {
              totalLat += markerInfo.coords.getLat();
              totalLng += markerInfo.coords.getLng();
            });
            const avgLat = totalLat / markers.length;
            const avgLng = totalLng / markers.length;

            map.setCenter(new window.kakao.maps.LatLng(avgLat, avgLng));
          }
        }
      });
    });
  }, [addressList, storeList]);

  return <MapSection id="map" size={size} />;
};

export default KakaoMap;
