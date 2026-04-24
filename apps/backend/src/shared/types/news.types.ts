export interface INews {
  _id: string;
  title: string;
  slug: string;
  body: string;
  thumbnail: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
  createdAt: string;
}

export interface ICreateNewsDto {
  title: string;
  body: string;
  thumbnail?: string;
  author: string;
  category: string;
  tags?: string[];
  isPublished?: boolean;
}
