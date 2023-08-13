import { styled } from 'styled-components';

import disabledMapIcon from '../assets/disabled-map-icon.svg';

import { Place } from './AdressInput';

export const EventInputWrapper = styled.section`
  position: relative;
  background-repeat: no-repeat;
`;

export const AddrestList = styled.ul`
  width: 804px;
  height: 148px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: scroll;
  background-color: #f8f8fa;
  border: 2px solid #1e232c;
  border-top: none;
  border-radius: 0 0 30px 30px;
  position: absolute;
  padding: 10px 23px 0 24px;
  top: 50px;
  left: 34px;
  z-index: 9;
`;

const AddressItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 28px;
  background-image: url(${disabledMapIcon});
  background-repeat: no-repeat;
`;

const StoreName = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.248125;
  color: #1e232c;
`;

const Address = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.248333333333333;
  color: #747983;
`;
const Category = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.247857142857143;
  color: #8b8e97;
`;

interface AddressItemProps {
  place: any;
  onClick: (place: Place) => void;
}

export const AddressItem = ({ place, onClick }: AddressItemProps) => {
  return (
    <AddressItemWrapper onClick={() => onClick(place)}>
      <div>
        <StoreName>{place.place_name}</StoreName>
        <Address>{place.address_name}</Address>
      </div>
      <Category>{place.category_group_name}</Category>
    </AddressItemWrapper>
  );
};
