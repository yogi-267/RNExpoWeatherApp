export interface WeatherData {
    city: string;
    temperature: number;
    condition: string;
    icon: string;
    description?: string;
    otherFactors?: { label: string; value: string; icon: any }[];
    forecast: { day: string; tempMax: string; tempMin: string; icon: string }[];
  }
  