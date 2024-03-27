import "webextension-polyfill";
import { createRoot } from "react-dom/client";
import { debug } from "jssip";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/joy";
import { UAProvider } from "./providers/UAProvider";
import { HistoryProvider, type History } from "./providers/HistoryProvider";
import { SessionProvider } from "./providers/SessionProvider";
import { createUa, type Credentials } from "./lib/createUA";
import { LoginPage } from "./pages/LoginPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ConnectPage } from "./pages/ConnectPage";
import { CallPage } from "./pages/CallPage";
import { IncomingPage } from "./pages/IncomingPage";

const rootEl = document.getElementById("root")!;
const reactRoot = createRoot(rootEl);
const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/connect",
    element: <ConnectPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/call",
    element: <CallPage />,
  },
  {
    path: "/incoming",
    element: <IncomingPage />,
  },
];

chrome.storage.local
  .get(["credentials", "history"])
  .then((values: { credentials?: Credentials; history?: History }) => {
    const { credentials, history = [] } = values;
    const ua = createUa(credentials);
    const router = createMemoryRouter(routes, {
      initialEntries: credentials ? ["/connect"] : ["/login"],
    });

    reactRoot.render(
      <>
        <CssBaseline />
        <UAProvider ua={ua}>
          <HistoryProvider history={history}>
            <SessionProvider>
              <RouterProvider router={router} />
            </SessionProvider>
          </HistoryProvider>
        </UAProvider>
      </>,
    );
  });

debug("*");
