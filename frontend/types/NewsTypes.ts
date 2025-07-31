export interface NewsItem {
  title?: string;
  link?: string;
  pubDate?: string;
  pubTime?: string;
  pubDateTime?: string;
  author?: string;
  category?: string;
  description?: string;
  imgLink?: string;
  source?: string;
}

export interface NewsCardProps {
  title?: string;
  date?: string;
  author?: string;
  description?: string;
  link?: string;
  source?: string;
  imgLink?: string;
}

export interface SidebarProps {
  onFeedsUpdate?: () => void;
}

export interface SearchBoxProps {
  onSearch: (searchTerm: string, selectedSource: string) => void;
  sources: string[];
  resultCount: number;
  totalCount: number;
}

export interface Feed {
  name: string;
  url: string;
}
