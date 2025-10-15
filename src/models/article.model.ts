export type Article = {
  id: string;
  title: string;
  description: string;
  subtitle: string;
  author: string;
  content: string;
  date: string;
  thumbnail: {
    src: string;
    alt: string;
  };
};
