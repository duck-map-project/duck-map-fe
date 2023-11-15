import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import BookmarkEvents from './BookmarkEvents';
import BookmarkFolders from './BookmarkFolders';
import { BookmarkWrapper } from './BookmarkStyle';

const Bookmark = () => {
  const [selectedFoldername, setSelectedFoldername] = useState<string | null>(
    null
  );
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [params] = useSearchParams();

  useEffect(() => {
    const name = params.get('name');
    const id = params.get('id');
    id ? setSelectedFolderId(parseInt(id)) : setSelectedFolderId(null);
    name ? setSelectedFoldername(name) : setSelectedFoldername(null);
  }, [params]);

  return (
    <BookmarkWrapper>
      {selectedFoldername && selectedFolderId ? (
        <BookmarkEvents
          setSelectedFoldername={setSelectedFoldername}
          setSelectedFolderId={setSelectedFolderId}
        />
      ) : (
        <BookmarkFolders
          setSelectedFoldername={setSelectedFoldername}
          setSelectedFolderId={setSelectedFolderId}
        />
      )}
    </BookmarkWrapper>
  );
};

export default Bookmark;
