import { styled } from 'styled-components';

type imgType = {
  image: string;
};

export const ListItem = styled.article`
  width: 214px;
  margin: 0 auto;
  border: 2px solid var(--line-black);
  border-radius: 3.9px;
  background-color: var(--bg2);
`;

export const ListItemTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  text-align: center;
`;

export const ArtistName = styled.span`
  position: relative;
  display: block;
  width: 50%;
  font-weight: 700;
  font-size: 1.7rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &::after {
    display: block;
    position: absolute;
    content: '';
    width: 80px;
    height: 7.8px;
    top: 14px;
    right: -10px;
    background-color: #ffbcbc;
    opacity: 40%;
  }
`;

export const CommonButton = styled.button`
  display: block;
  position: relative;
  width: 42px;
  height: 23px;
  padding: 3.6px 0px 3px 0px;
  border: 1.5px solid var(--line-black);
  border-radius: 15px;
  background-color: #fffbe3;
  > img {
    position: absolute;
    width: 30px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ArtistImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 155px;
  overflow: hidden;
  margin-bottom: 20px;
  border-top: 2px solid var(--line-black);
  border-bottom: 2px solid var(--line-black);
`;

export const ArtistImg = styled.div<imgType>`
  height: 100%;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
`;
