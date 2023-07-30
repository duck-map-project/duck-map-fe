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
  isLast: boolean;
  content: [{ id: number; name: string; image: string; color: string }];
};
