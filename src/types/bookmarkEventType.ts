export interface BookmarkEventType {
  id: number;
  eventId: number;
  storeName: string;
  image: string;
}
export interface BookmarkEventsData {
  totalPages: number;
  totalElements: number;
  size: number;
  content: [
    {
      id: number;
      eventId: number;
      storeName: string;
      image: string;
    }
  ];
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

export interface transformedEventsData {
  isLast: boolean;
  numberOfElements: number;
  content: {
    id: number;
    eventId: number;
    storeName: string;
    image: string;
  }[];
}
