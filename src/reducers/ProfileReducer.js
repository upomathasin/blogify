import { actions } from "../actions";

export const initialState = {
  user: null,
  blogs: [],
  loading: false,
  error: null,
};
export function ProfileReducer(state, action) {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        user: action.data,
        blogs: action.data.blogs,
        loading: false,
      };
    }

    case actions.profile.DATA_FETCHED_ERROR: {
      return {
        ...state,
        error: action.message,
        loading: false,
      };
    }

    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.avatar,
        },
      };
    }
    case actions.profile.USER_BIO_UPDATE: {
      return {
        ...state,
        user: {
          ...state.user,
          bio: action?.user?.bio,
        },

        loading: false,
      };
    }
  }
}
