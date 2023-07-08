import { useState, useEffect, useRef } from 'react';

import SortDropdown from '../../components/SortButton';

import { InfoSection, EditSection } from './MyPageStyle';

const MyBookmark = () => {
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
};
const MyEvent = () => {
  return (
    // FIXME: 동적으로 데이터 받아오기
    <EventListItemBox></EventListItemBox>
  );
};

export default MyEvent;
