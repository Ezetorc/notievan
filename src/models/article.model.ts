export type Article = {
  id: string;
  title: string;
  authorId: string;
  description: string;
  subtitle: string;
  content: string;
  createdAt: string;
  thumbnail: {
    url: string | null;
    alt: string | null;
  };
};
