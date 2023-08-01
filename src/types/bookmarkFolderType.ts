export interface BookmarkFolderType {
  id: number;
  name: string;
  image: string;
  color: string;
}

export interface BookmarkFoldersData {
  content: [
    {
      id: number;
      name: string;
      image: string;
      color: string;
    }
  ];
  pageable: {
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export type transformedFoldersData = {
  numberOfElements: number;
  isLast: boolean;
  content: { id: number; name: string; image: string; color: string }[];
};

export type shareBookmarkFolderData = {
  id: number;
  name: string;
  memberId: number;
  username: string;
  bookmarkedEventResPage: {
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
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    pageable: {
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
    };
    first: boolean;
    last: boolean;
    empty: boolean;
  };
};

export type transformedShareFolderType = {
  id: number;
  name: string;
  memberId: number;
  username: string;
  numberOfElements: number;
  isLast: boolean;
  content: [
    {
      id: number;
      eventId: number;
      storeName: string;
      image: string;
    }
  ];
};

export type shareFolderEventsType = {
  id: number;
  eventId: number;
  storeName: string;
  image: string;
};
