const apiRoutes =  {
  login: () => '/auth/login',
  register: () => 'auth/register',
  me: () => '/me',
  getPosts: () => '/posts',
  getAvatar: (filename: string) => `/uploads/${filename}`,
  uploads: () => '/uploads',
  avatar: () => '/me/avatar'
};

export default apiRoutes;