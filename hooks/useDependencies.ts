import { useEffect } from "react";
import useCachedResources from "./useCachedResources";
import useLiveLikeSdkInit from "./useLiveLikeSdkInit";
import * as SplashScreen from "expo-splash-screen";

export const useDependencies = () => {
  const { profile, loaded: profileLoaded } = useLiveLikeSdkInit();
  const isCachedResourceLoaded = useCachedResources();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (profileLoaded && isCachedResourceLoaded) {
      SplashScreen.hideAsync();
    }
  }, [profileLoaded, isCachedResourceLoaded]);

  return { profile, loaded: profileLoaded && isCachedResourceLoaded };
};
