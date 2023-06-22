export const getImageLink = (url?: string | null) => {
  if (url) {
    return `http://localhost:4000${url}`
  } else {
    return null;
  }
};
