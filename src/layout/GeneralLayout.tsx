import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import MobileTab from '../components/MobileTab';
import media from '../utils/mediaQuery';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const PageWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  ${media.mobile`
    margin-bottom: 80px;
  `}
`;

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <PageWrapper>
      <Billboard />
      <Header />
      {children}
      <MobileTab />
    </PageWrapper>
  );
};

export default GeneralLayout;
