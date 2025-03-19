
export interface Weather {
    resolvedAddress: string;
    currentConditions: {
      temp: number;
      humidity: number;
      windspeed: number;
    };
  }
  