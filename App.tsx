import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useColorScheme from "./hooks/useColorScheme";
import { useDependencies } from "./hooks/useDependencies";
import Navigation from "./navigation";

export default function App() {
  const { profile, loaded } = useDependencies();
  const colorScheme = useColorScheme();

  if (!loaded) {
    return null;
  } else if (!profile) {
    return (
      <SafeAreaProvider>
        <View>
          <Text>User Profile not initialised!</Text>
        </View>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
