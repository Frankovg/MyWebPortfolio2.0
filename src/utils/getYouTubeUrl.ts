export const getYouTubeUrl = (url: string) => {
  try {
    const newUrl = new URL(url);

    const videoId = newUrl.pathname.split("/").pop();
    return `https://www.youtube.com/watch?v=${videoId}`;

  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.error(err + ', Invalid URL')
    return null;
  }
}
