export interface getEventParams {
  artistId: number;
  inProgress: boolean;
  page: number;
  size: number;
  sort: ('empty' | 'unsorted' | 'sorted')[];
}

export interface EventData {
  id: number;
  storeName: string;
  inProgress: boolean;
  address: string;
  artists: [
    {
      id: number;
      groupId: number;
      groupName: string;
      name: string;
      image: {
        fileUrl: string;
      };
      artistType: {
        id: number;
        type: string;
      };
    }
  ];
  categories: [
    {
      id: number;
      category: string;
    }
  ];
  image: {
    fileUrl: string;
  };
  like: boolean;
  bookmark: boolean;
}
