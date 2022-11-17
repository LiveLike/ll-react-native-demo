import { useEffect, useState } from "react";
import { initApi } from "@livelike/engagement-api";

const createStorageStrategy = () => {
  let _value;
  return {
    get() {
      return _value;
    },
    set(value) {
      _value = value;
    },
  };
};

export default function useLiveLikeSdkInit() {
  const [initResult, setInitResult] = useState({
    profile: null,
    loaded: false,
  });

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function initLLSdk() {
      try {
        // SplashScreen.preventAutoHideAsync();

        await initApi({
          endpoint: "https://cf-blast-dig.livelikecdn.com/api/v1/",
          clientId: "lom9db0XtQUhOZQq1vz8QPfSpiyyxppiUVGMcAje",
          storageStrategy: createStorageStrategy(),
        }).then((profile) => {
          setInitResult({ profile, loaded: true });
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
        setInitResult({ profile: null, loaded: true });
      }
    }

    initLLSdk();
  }, []);

  return initResult;
}
