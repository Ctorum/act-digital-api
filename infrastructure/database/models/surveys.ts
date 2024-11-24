export interface Survey {
  id: number;
  title: string;
  target_audience: string;
  questions: string[];
  created_at: Date;
  updated_at: Date;
}
