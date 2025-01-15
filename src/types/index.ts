export interface Book {
  hexLocation: string;
  wall: number;
  shelf: number;
  volume: number;
  page: number;
  content: string;
}

export interface Theme {
  isDark: boolean;
  toggleTheme: () => void;
}