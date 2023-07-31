import React from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

import closeIcon from '../assets/close.svg';
import { removeArtist } from '../redux/setEventElemetsSlice';

const Selected = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.248125;
  padding: 6.5px 26px 6.5px 10px;
  border-radius: 20px;
  border: 2px solid #1e232c;
  background-color: #eff2f3;
  box-shadow: 4px 4px 0px 0px #00000040;
  position: relative;
`;

const SelectedDeleteButton = styled.button`
  width: 8px;
  height: 8px;
  background-image: url(${closeIcon});
  background-size: 8px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

interface SelectedElementProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  artistId: number;
}

const SelectedElement: React.FC<SelectedElementProps> = ({
  children,
  artistId,
}) => {
  const dispatch = useDispatch();
  const handleRemoveArtist = () => {
    dispatch(removeArtist(artistId));
  };
  return (
    <Selected>
      <span>{children}</span>
      <SelectedDeleteButton onClick={handleRemoveArtist} />
    </Selected>
  );
};

export default SelectedElement;
