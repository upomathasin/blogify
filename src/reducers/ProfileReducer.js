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
      };
    }

    case actions.profile.DATA_FETCHED_ERROR: {
      return {
        ...state,
        error: action.message,
      };
    }

    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        user: {
          ...action.user,
          avatar: action.data.avatar,
        },
      };
    }
  }
}
