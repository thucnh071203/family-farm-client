import instance from "../Axios/axiosConfig";

export const getOwnProfile = async () => {
  const response = await instance.get('/api/account/own-profile');
  return response.data;
};

