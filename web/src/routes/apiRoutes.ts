const apiRoutes =  {
  login: () => '/auth/login',
  register: () => 'auth/register',
  getMe: () => 'auth/me',
  getPosts: () => '/posts',
  getAvatar: (filename: string) => `/uploads/${filename}`
};

export default apiRoutes;