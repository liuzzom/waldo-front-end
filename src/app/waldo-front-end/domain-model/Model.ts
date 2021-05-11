export interface Model{
  id: string;
  name: string;
  sources: string[];
  description?: string;
  uploaded: string;
  lastModified: string;
  supportedProviders: string[];
  defaultProvider: string;
  metadata?: any;
}
