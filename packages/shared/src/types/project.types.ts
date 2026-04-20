export enum ProjectCategory {
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  FOOD = 'food',
  WATER = 'water',
  COMMUNITY = 'community',
  ORPHAN = 'orphan',
}

export interface IProject {
  _id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  impactStat: string;
  location: string;
  images: string[];
  isActive: boolean;
  order: number;
  createdAt: string;
}

export interface ICreateProjectDto {
  title: string;
  category: ProjectCategory;
  description: string;
  impactStat: string;
  location: string;
  order?: number;
}
