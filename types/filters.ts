export type Filters = {
  language: string;
  level: string;
  price: string;
};

export interface CatalogFilters {
  language?: string;
  price?: string;
  level?: string;
}
