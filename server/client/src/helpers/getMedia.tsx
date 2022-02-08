const getMedia = (media: string[]): [string, 'image' | 'video'][] => {
  return media.map((url) => {
    return [url, 'image'];
  });
};

export default getMedia;
