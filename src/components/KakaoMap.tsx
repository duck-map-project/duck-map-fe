import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { css, styled } from 'styled-components';

import customMarker from '../assets/marker.svg';
import { selectPlaces } from '../features/events/services/eventPlaceSlice';
import { useRouter } from '../hooks/useRouter';
import media from '../utils/mediaQuery';

export const MapSection = styled.section<KakaoMapProps>`
  width: 100%;
  ${(props) => (props.size ? sizes[props.size] : '')};
  ${media.mobile`
  height: 339px;
  `}
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

const address = css`
  height: 286px;
  border-top: 2px solid #1e232c;
  border-bottom: 2px solid #1e232c;
`;

const sizes = { main, eventList, detail, address };

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  size: 'main' | 'eventList' | 'detail' | 'address';
}

interface MarkerInfo {
  id: number | null;
  coords: any;
  placeName: string;
}

const KakaoMap = ({ size }: KakaoMapProps) => {
  const placeList = useSelector(selectPlaces);
  const { routeTo } = useRouter();

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const markers: MarkerInfo[] = [];

    if (placeList && placeList.length > 0) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      placeList.forEach((place) => {
        if (place.address && place.storeName) {
          const address = place.address.join(' ');
          geocoder.addressSearch(address, function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              const placeName = place.storeName.join(' ') || address;

              markers.push({
                id: place.id || null,
                coords,
                placeName,
              });

              if (markers.length === placeList.length) {
                const bounds = new window.kakao.maps.LatLngBounds();
                markers.forEach((markerInfo) => {
                  bounds.extend(markerInfo.coords);

                  const markerImage = new window.kakao.maps.MarkerImage(
                    customMarker,
                    new window.kakao.maps.Size(36, 44)
                  );

                  const marker = new window.kakao.maps.Marker({
                    map,
                    position: markerInfo.coords,
                    image: markerImage,
                  });

                  window.kakao.maps.event.addListener(
                    marker,
                    'click',
                    function () {
                      const clickedMarkerId = markerInfo.id;
                      if (clickedMarkerId) routeTo(`/event/${clickedMarkerId}`);
                    }
                  );

                  const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${markerInfo.placeName}</div>`,
                  });
                  infowindow.open(map, marker);
                });

                map.setBounds(bounds);
              }
            }
          });
        }
      });
    }
  }, [placeList]);
  return <MapSection id="map" size={size} />;
};

export default KakaoMap;
