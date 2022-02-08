const getMedia = (media: string[]): [string, 'image' | 'video'][] => {
  console.log(media);
  return media.map((url) => {
    return [url, 'image'];
  });
};

export default getMedia;
