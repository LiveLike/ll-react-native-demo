import { useEffect, useState } from "react";
import { init } from "@livelike/javascript";

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

        await init({
          endpoint: "https://cf-blast-dig.livelikecdn.com/api/v1/",
          clientId: "lom9db0XtQUhOZQq1vz8QPfSpiyyxppiUVGMcAje",
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
