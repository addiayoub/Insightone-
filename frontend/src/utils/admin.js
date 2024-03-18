// Transform user api logs
export const transformUsersData = (data) => {
  console.log("the data for transformUsersData", data);
  const newData = [];
  data?.forEach((user) => {
    user?.apiLogs?.forEach((apiLog) => {
      // console.log(`${user.username}: - chat-${chat.title}`, chat.messages);
      const { username, _id } = user;
      console.log("api log", apiLog);
      newData.push({
        _id,
        username,
        apiLog,
      });
    });
  });
  console.log("new data", newData);
  return newData;
};
