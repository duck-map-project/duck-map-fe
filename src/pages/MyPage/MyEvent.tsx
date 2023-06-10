import {
  EventListItemBox,
  // EventImage,
  // NameSection,
  // GroupName,
  // RegularTxt,
  // Tag
} from '../../components/EventListItem';
import EventImage from '../../components/EventListItem';
// import RegularTxt from '../../components/EventListItem';
import Tag from '../../components/Tag';

const MyEvent = () => {
  return (
    <EventListItemBox>
      <EventImage />
      <div>
        {/* <NameSection> */}
        {/* <GroupName>그룹명</GroupName> */}
        {/* <RegularTxt>멤버 이름</RegularTxt> */}
        {/* </NameSection> */}
        <Tag marginB="16px" />
        {/* <RegularTxt> 주소 </RegularTxt> */}
      </div>
    </EventListItemBox>
  );
};

export default MyEvent;
