interface mediaData {
  url: string;
  type: 'image' | 'video';
}

const getMedia = (media: string[]): mediaData[] => {
  console.log(media);
  return media.map((url) => {
    return { url: url, type: 'image' };
  });
};

export default getMedia;
