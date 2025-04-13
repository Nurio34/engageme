import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  avatar: string;
}

const initialState: UserState = {
  username: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { username, avatar } = action.payload;

      state.username = username;
      state.avatar = avatar;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
