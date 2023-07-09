import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <PageWrapper>
      <Billboard />
      <Header />
      {children}
    </PageWrapper>
  );
};

export default GeneralLayout;
