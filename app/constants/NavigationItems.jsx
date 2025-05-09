import {
  Person,
  ManageAccounts,
  AutoGraph,
  ScatterPlot,
  Image,
} from "@mui/icons-material";

const pixelaItems = [
  {
    label: "User",
    href: "pixela-user",
    icon: <Person />,
  },
  {
    label: "Profile",
    href: "pixela-user-profile",
    icon: <ManageAccounts />,
  },
  {
    label: "Graph",
    href: "pixela-graph",
    icon: <AutoGraph />,
  },
  {
    label: "Pixel",
    href: "pixela-pixel",
    icon: <ScatterPlot />,
  },
];

export default pixelaItems;
