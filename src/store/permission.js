import { createAction, createSlice } from "@reduxjs/toolkit";

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    entities: false,
    isLoading: true,
  },
  reducers: {
    permissionRequested: (state) => {
      state.isLoading = true;
    },
    permissionsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    permissionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    permissionsUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const { reducer: permissionsReducer, actions } = permissionsSlice;

const { permissionsReceived, permissionRequested, permissionsRequestFailed } =
  actions;

const addPermissionReceived = createAction(
  "permissions/addPermissionsReceived"
);

export const loadPermission = (payload) => () => async (dispatch) => {
  dispatch(permissionRequested());
  try {
    dispatch(permissionsReceived(payload));
  } catch (error) {
    dispatch(permissionsRequestFailed(error.message));
  }
};

export default permissionsReducer;
