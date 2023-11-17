import SideBar from './SideBar';
import * as S from './SideSectionStyle';

const SideSection = ({
  profile,
  username,
}: {
  profile: string;
  username: string | undefined;
}) => {
  return (
    <section>
      <S.ProfileWrapper>
        <S.ProfileImg src={profile} />
        <S.Username>{username}</S.Username>
      </S.ProfileWrapper>
      <SideBar />
    </section>
  );
};

export default SideSection;
