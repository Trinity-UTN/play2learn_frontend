export interface Activity {
  id: number;
  code_game: string;
  name: string;
  type: string;
  description: string;
  color: string;
  isPopular?: boolean;
  isNew?: boolean;
}
