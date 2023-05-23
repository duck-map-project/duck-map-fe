import { useEffect, useRef, useState } from 'react';
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
  const [profileModal, setProfileModal] = useState(false);
  const profileRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <PageWrapper>
      <Billboard />
      <Header
        setProfileModal={setProfileModal}
        profileRef={profileRef}
        profileModal={profileModal}
      />
      {children}
    </PageWrapper>
  );
};

export default GeneralLayout;
