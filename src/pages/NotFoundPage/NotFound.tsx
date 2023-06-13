import Icon from '../../assets/logo-icon.png';
import Button from '../../components/Button';
import { useRouter } from '../../hooks/useRouter';

import { PageWrapper, Image, Message } from './NotFoundStyle';

const NotFound = () => {
  const { routeTo } = useRouter();
  return (
    <PageWrapper>
      <Image src={Icon} />
      <Message>
        죄송합니다. 페이지를 찾을 수 없습니다.
        <br />
        요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다.
      </Message>
      <Button
        size="mid"
        color="white"
        onClick={() => {
          routeTo('/');
        }}
      >
        홈으로 이동
      </Button>
    </PageWrapper>
  );
};

export default NotFound;
