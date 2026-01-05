import {
  HomeIcon,
  UserCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import Home from "/src/pages/dashboard/home";
import { ProfilePage } from "/src/pages/dashboard/profile";
import { SignIn, SignUp, Forgotpassword } from "/src/pages/auth";
import Unauthorised from "/src/pages/unauthorised/unauthorised";
import SuspendedPage from "@/pages/auth/suspended";

const icon = {
  className: "w-6 h-6 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Explore",
        path: "/Explore",
        element: <Home />,
        sidebar: true,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "My Profile",
        path: "/profile",
        element: <ProfilePage />,
        sidebar: false,
      },
    ],
  },
  {
    title: "unauthorised",
    layout: "unauthorised",
    pages: [
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Unauthorised",
        path: "/",
        element: <Unauthorised />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "forgot password",
        path: "/forgot-password",
        element: <Forgotpassword />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "blog-suspended",
        path: "/suspended",
        element: <SuspendedPage />,
        sidebar: false,
      },
    ],
  },
];

export default routes;