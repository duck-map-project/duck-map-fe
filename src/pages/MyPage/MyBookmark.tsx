import EventListItem from '../../components/EventListItem';

import feedData from './feedData.json';

const MyBookmark = () => {
  return (
    <>
      {feedData.map((feed, key) => (
        <EventListItem
          key={key}
          groupName={feed.groupName}
          member={feed.member}
          address={feed.address}
          eventImg={feed.eventImg}
        />
      ))}
    </>
  );
};

export default MyBookmark;
