import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type PhotoInfoType = {
  landscape?: string;
  large?: string;
  large2x?: string;
  medium?: string;
  original: string;
  portrait?: string;
  small?: string;
  tiny?: string;
};

export type PhotoObjectTypes = {
  avg_color: string;
  height: number;
  width: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  url: string;
  src: PhotoInfoType;
};

type InitialPhotosStateTypes = {
  photos: PhotoObjectTypes[];
  currentPage: number;
  isLoading: boolean;
  isHidden: boolean;
  modalID: string | null;
  columnsNumber: number;
  liked: Array<number>;
  collected: Array<number>;
  headerImage: string;
  authorName: string;
  authorLink: string;
};

const initialState: InitialPhotosStateTypes = {
  photos: [],
  currentPage: 1,
  isLoading: false,
  isHidden: true,
  modalID: null,
  columnsNumber: 4,
  headerImage: '',
  authorName: '',
  authorLink: '',
  liked: [],
  collected: [],
};

export const getHeaderImage = createAsyncThunk('photos/getHeaderImage', async () => {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=mountains&orientation=landscape&size=medium&per_page=20&page=1`,
    {
      headers: {
        Authorization: '563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf',
      },
    }
  );

  const { photos } = await response.json();
  return photos[Math.floor(Math.random() * photos.length)];
});

export const loadPhotos = createAsyncThunk('photos/loadPhotos', async (page: number) => {
  const response = await fetch(`https://api.pexels.com/v1/curated?per_page=20&&page=${page}`, {
    headers: {
      Authorization: '563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf',
    },
  });
  return await response.json();
});

export const performSearch = createAsyncThunk(
  'photos/performSearch',
  async ({ value, page }: { value: string; page: number }) => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${value}&per_page=20&&page=${page}`, {
      headers: {
        Authorization: '563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf',
      },
    });
    return await response.json();
  }
);

export const loadSearchedPhotos = createAsyncThunk(
  'photos/loadSearchedPhotos',
  async ({ value, page }: { value: string; page: number }) => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${value}&per_page=20&&page=${page}`, {
      headers: {
        Authorization: '563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf',
      },
    });
    return await response.json();
  }
);

export const loadCollectionPhotos = createAsyncThunk('photos/loadCollectionPhotos', async (id: number) => {
  const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      Authorization: '563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf',
    },
  });
  return await response.json();
});

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    initLikes: (state) => {
      state.liked = JSON.parse(localStorage.getItem('likes') ?? '[]');
    },
    addLike: (state, action) => {
      localStorage.setItem('likes', JSON.stringify(state.liked.concat(action.payload)));

      state.liked = state.liked.concat(action.payload);
    },
    removeLike: (state, action) => {
      const copy = [...state.liked];
      copy.splice(copy.indexOf(action.payload), 1);
      state.liked = [...copy];
      localStorage.setItem('likes', JSON.stringify(state.liked));
    },
    initCollectibles: (state) => {
      state.collected = JSON.parse(localStorage.getItem('collected') ?? '[]');
    },
    addCollectible: (state, action) => {
      localStorage.setItem('collected', JSON.stringify(state.collected.concat(action.payload)));

      state.collected = state.collected.concat(action.payload);
    },
    removeCollectible: (state, action) => {
      const copy = [...state.collected];
      copy.splice(copy.indexOf(action.payload), 1);
      state.collected = [...copy];
      localStorage.setItem('collected', JSON.stringify(state.collected));
    },
    clearPhotos: (state) => {
      state.photos = [];
      state.currentPage = 2;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPhotos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadPhotos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.photos = state.photos.concat(action.payload.photos);
    });

    builder.addCase(performSearch.pending, (state) => {
      state.isLoading = true;
      state.photos = [];
      state.currentPage = 2;
    });
    builder.addCase(performSearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.photos = state.photos.concat(action.payload.photos);
    });

    builder.addCase(loadSearchedPhotos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadSearchedPhotos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.photos = state.photos.concat(action.payload.photos);
    });

    builder.addCase(loadCollectionPhotos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadCollectionPhotos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.photos = state.photos.concat(action.payload);
    });

    builder.addCase(getHeaderImage.fulfilled, (state, action) => {
      state.headerImage = action.payload.src.large2x;
      state.authorName = action.payload.photographer;
      state.authorLink = action.payload.url;
    });
  },
});

export const { initCollectibles, initLikes, addCollectible, addLike, removeCollectible, removeLike, clearPhotos } =
  photosSlice.actions;

export default photosSlice.reducer;
