export interface mylikeType {
  id: number;
  storeName: string;
  inProgress: boolean;
  address: number;
  artists: [{
    id: number;
    groupId: number;
    groupName: string;
    name: string;
    image: string;
    artistType: {
      id: number;
      type: string;
    };
  }];
  categories: [{
    id: number;
    category: string;
  }];
  image: string;
  likeId: number;
  bookmarkId: number;
}[];

export interface mylikeEventsType {
  totalPages: number;
  totalElements: number;
  size: number;
  content: [{
    id: number;
    storeName: string;
    inProgress: boolean;
    address: number;
    artists: [{
      id: number;
      groupId: number;
      groupName: string;
      name: string;
      image: string;
      artistType: {
        id: number;
        type: string;
      };
    }];
    categories: [{
      id: number;
      category: string;
    }];
    image: string;
    likeId: number;
    bookmarkId: number;
  }];
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

export interface transformedMylike {
  numberOfElements: number;
  isLast: boolean;
  content: [{
    id: number;
    storeName: string;
    inProgress: boolean;
    address: number;
    artists: [{
      id: number;
      groupId: number;
      groupName: string;
      name: string;
      image: string;
      artistType: {
        id: number;
        type: string;
      };
    }];
    categories: [{
      id: number;
      category: string;
    }];
    image: string;
    likeId: number;
    bookmarkId: number;
  }];
}
