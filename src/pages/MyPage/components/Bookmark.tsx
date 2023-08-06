import { useState } from 'react';

import BookmarkEvents from './BookmarkEvents';
import BookmarkFolders from './BookmarkFolders';
import { BookmarkWrapper } from './BookmarkStyle';

const Bookmark = () => {
  const [selectedFoldername, setSelectedFoldername] = useState<string | null>(
    null
  );
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  return (
    <BookmarkWrapper>
      {selectedFoldername && selectedFolderId ? (
        <BookmarkEvents
          foldername={selectedFoldername}
          folderId={selectedFolderId}
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
