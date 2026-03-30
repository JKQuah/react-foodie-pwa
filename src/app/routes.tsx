import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Feed } from "./pages/Feed";
import { Search } from "./pages/Search";
import { HostJoin } from "./pages/HostJoin";
import { HostCreate } from "./pages/HostCreate";
import { PlanDetail } from "./pages/PlanDetail";
import { MatchDiscovery } from "./pages/MatchDiscovery";
import { MatchFinding } from "./pages/MatchFinding";
import { MatchResults } from "./pages/MatchResults";
import { PlanningRoom } from "./pages/PlanningRoom";
import { MatchConfirm } from "./pages/MatchConfirm";
import { Settings } from "./pages/Settings";
import { ChatList } from "./pages/ChatList";
import { ChatDetail } from "./pages/ChatDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Feed },
      { path: "search", Component: Search },
      { path: "host", Component: HostJoin },
      { path: "host/create", Component: HostCreate },
      { path: "host/:id", Component: PlanDetail },
      { path: "match", Component: MatchDiscovery },
      { path: "match/finding", Component: MatchFinding },
      { path: "match/results", Component: MatchResults },
      { path: "match/room", Component: PlanningRoom },
      { path: "match/confirm", Component: MatchConfirm },
      { path: "chats", Component: ChatList },
      { path: "chats/:id", Component: ChatDetail },
      { path: "settings", Component: Settings },
    ],
  },
]);