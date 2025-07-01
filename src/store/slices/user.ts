import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  username: string;
  avatar: string;
  fullname: string;
}

const initialState: UserState = {
  id: "",
  username: "",
  avatar: "",
  fullname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, username, avatar, fullname } = action.payload;

      state.id = id;
      state.username = username;
      state.avatar = avatar;
      state.fullname = fullname;
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
