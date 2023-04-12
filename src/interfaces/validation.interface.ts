export interface ValidationError {
  constraints: string[];
  property: string;
  value: string;
  children: any[];
}
