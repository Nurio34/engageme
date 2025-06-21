import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  username: string;
  avatar: string;
}

const initialState: UserState = {
  id: "",
  username: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, username, avatar } = action.payload;

      state.id = id;
      state.username = username;
      state.avatar = avatar;
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
