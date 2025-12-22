import { Cookies } from "react-cookie";
const cookies = new Cookies();

const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};
const getUser = () => {
  const user = cookies.get("user");
  return user;
};

const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

const setUser = (user) => {
  // store object directly and set expiry to 1 day (milliseconds)
  cookies.set("user", JSON.stringify({
    id: user.id,
    username: user.username,
    accessToken: user.accessToken,
  }), {
    path: "/",
    expires: new Date(Date.now() + 86400 * 1000),
  });
};

const tokenService = {
  getAccessToken,
  getUser,
  removeUser,
  setUser,
};

export default tokenService;
