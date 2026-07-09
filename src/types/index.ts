export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
