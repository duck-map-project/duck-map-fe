export interface getEventParams {
  artistId: number;
  onlyInProgress: boolean;
  page: number;
  size: number;
  sort: ('empty' | 'unsorted' | 'sorted')[];
}

interface ArtistType {
  id: number;
  type: string;
}

export interface Artist {
  id: number;
  groupId: number | null;
  groupName: string | null;
  name: string;
  image: string;
  artistType: ArtistType;
}

interface Category {
  id: number;
  category: string;
}

export interface EventData {
  id: number;
  storeName: string;
  inProgress: boolean;
  fromDate: string;
  toDate: string;
  address: string;
  businessHour: string;
  hashtag: string;
  twitterUrl: string;
  artists: Artist[];
  categories: Category[];
  images: string[];
  score: number;
  likeId: number;
  likeCount: number;
  bookmarkId: number;
}

export interface Review {
  id: number;
  userProfile: string;
  username: string;
  createdAt: string;
  score: number;
  reviewImage: string;
  content: string;
}

export interface ReviewResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Review[];
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    unpaged: boolean;
    pageSize: number;
    paged: boolean;
    pageNumber: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface MainEvent {
  id: number;
  storeName: string;
  address: string;
  likeCount: number;
  reviewCount: number;
  artists: string[];
}

interface Pageable {
  offset: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
}

export interface MainEventResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: MainEvent[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface EventListData {
  id: number;
  storeName: string;
  inProgress: boolean;
  address: string;
  artists: Artist[];
  categories: Category[];
  image: string;
  likeId: number | null;
  bookmarkId: number | null;
}
export interface EventResponse extends Omit<MainEventResponse, 'content'> {
  content: EventListData[];
}

export interface TodayHashtagsResponse {
  eventId: number;
  hashtag: string;
}
