import { User } from "../../../../../../types";

export const getUsers = (users: User[]) => {
  const last = { name: users[0].name, id: users[0].userId };
  const lastSecond = { name: users[1]?.name, id: users[1]?.userId };
  const lastThird = { name: users[2]?.name, id: users[2]?.userId };
  const isMoreThanThree = users.length > 3;

  return { last, lastSecond, lastThird, isMoreThanThree };
};
