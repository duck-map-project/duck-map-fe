import { styled } from 'styled-components';

export const ManageInfoSection = styled.section`
  display: flex;
  justify-content: space-around;
  gap: 60px;
  padding: 60px;
  border-top: 2px solid var(--line-black);
  border-bottom: 2px solid var(--line-black);
  margin-bottom: 100px;
`;

export const ManageTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  > h2 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  > p {
    font-size: 16px;
  }
`;

export const ManageInfoImage = styled.img`
  width: 520px;
`;

export const ArtistList = styled.main`
  position: relative;
  width: 1156px;
  height: 900px;
  margin: 0 auto 170px;
  padding: 120px 30px 88px;
  background-color: #fffbe2;
  border: 2px solid var(--line-black);
  border-radius: 17.7px;
`;

export const ArtistListTitle = styled.h3`
  display: flex;
  align-items: center;
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;

export const ListTitleText = styled.span`
  display: block;
  position: relative;
  padding: 13px 17px;
  font-size: 3.2rem;
  font-weight: 700;
  text-align: center;
  border: 2px solid var(--line-black);
  border-radius: 50px;
  background-color: #defcf9;
  &::before {
    display: block;
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translate(3%, 12%);
    padding: 13px 17px;
    border: 2px solid var(--line-black);
    border-radius: 50px;
    background-color: #defcf9;
    z-index: -100;
  }
`;

export const ListTitleIcon = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  right: -10px;
  padding: 10px;
  border: 2px solid var(--line-black);
  border-radius: 50px;
  background-color: #fffdc7;
  text-align: center;
  vertical-align: bottom;
  > img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export const ArtistListSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 214px);
  max-height: 100%;
  grid-column-gap: 18px;
  grid-row-gap: 20px;
  padding: 0 72px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    position: relative;
    background-color: #8f9ef2;
    border: 2px solid var(--line-black);
    border-radius: 17.7px;
  }
`;
