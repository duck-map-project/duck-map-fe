import { useState, useEffect, useRef } from 'react';

import SortDropdown from '../../components/SortButton';

import { InfoSection, EditSection } from './MyPageStyle';

const MyEvent = () => {
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const [SortModal, setSortModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target as Node)
      ) {
        setSortModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <InfoSection>
        <SortDropdown
          sortButtonRef={sortButtonRef}
          clicked={SortModal}
          setClicked={setSortModal}
        />
      </InfoSection>
      <EditSection></EditSection>
    </>
  );
};

export default MyEvent;
