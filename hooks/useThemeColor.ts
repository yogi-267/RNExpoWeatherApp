import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export function useThemeColor(): typeof Colors.light | typeof Colors.dark {
  const theme = useColorScheme() ?? "light"; 
  return Colors[theme];
}
