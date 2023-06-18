import BookmarkBox from '../../components/Bookmark';

import feedData from './feedData.json';

const MyBookmark = () => {
  return (
    <>
      {feedData.map((feed, key) => (
        <BookmarkBox
          key={key}
          forderImage={feed.forderImage}
          forderName={feed.forderName}
        />
      ))}
    </>
  );
};

export default MyBookmark;
