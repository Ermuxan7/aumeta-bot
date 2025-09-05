export const setTokens = (tokens: {
  access_token: string;
  refresh_token: string;
}) => {
  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("refresh_token", tokens.refresh_token);
};

export const getAccessToken = () => localStorage.getItem("access_token");
