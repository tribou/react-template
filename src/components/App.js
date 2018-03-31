// @flow
import React from "react";
import Helmet from "react-helmet";

import Modal from "src/components/shared/Modal";
import LoadingIndicator from "src/components/shared/LoadingIndicator";
import ErrorMessage from "src/components/shared/ErrorMessage";
import vars from "config/variables";
import type { ReduxProps } from "./";

type Props = ReduxProps & {
  children: React$Element<*>
};

const App = (props: Props) => {
  const {
    appDescription,
    appIcon,
    appLogo,
    appTitle,
    appLogoWidth,
    appLogoHeight,
    colorTheme
  } = vars;

  const { ROOT_URL } = props;

  return (
    <div id="application">
      <Helmet
        htmlAttributes={{ lang: "en" }}
        defaultTitle={appTitle}
        titleTemplate={`${appTitle} - %s`}
        meta={[
          { name: "theme-color", content: colorTheme },
          { name: "msapplication-TileColor", content: colorTheme },
          { name: "msapplication-TileImage", content: `${ROOT_URL}${appLogo}` },
          { property: "og:title", content: appTitle },
          { property: "og:image", content: `${ROOT_URL}${appLogo}` },
          { property: "og:image:width", content: appLogoWidth },
          { property: "og:image:height", content: appLogoHeight },
          { property: "og:url", content: ROOT_URL },
          { property: "og:description", content: appDescription },
          { name: "description", content: appDescription }
        ]}
        link={[
          { rel: "shortcut icon", href: appIcon },
          { rel: "apple-touch-icon", href: appIcon }
        ]}
      />
      <LoadingIndicator />

      {props.children}

      <ErrorMessage />
      <Modal />
    </div>
  );
};

export default App;
