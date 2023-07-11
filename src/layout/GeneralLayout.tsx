import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import AddGroupModal from '../components/modals/AddGroupModal';
import { selectGroupModalState } from '../redux/manageModalSlice';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const groupModalState = useSelector(selectGroupModalState);

  return (
    <PageWrapper>
      <Billboard />
      {groupModalState && <AddGroupModal />}
      <Header />
      {children}
    </PageWrapper>
  );
};

export default GeneralLayout;
