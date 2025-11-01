import { useLocation, Link, useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  Drawer,
} from "@material-tailwind/react";
import { Sidenav } from "/src/components/layouts/layout";
import {
  UserCircleIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import { useMaterialTailwindController } from "@/components/context";
import { useAuth } from "@/components/auth/AuthContext";

// Import ThemeToggle component
import { ThemeToggle, ThemeToggleLine } from "@/components/ThemeToggle"; // Adjust path if necessary

export function DashboardNavbar({ routegiven }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { logout } = useAuth(); // Destructure the logout function from useAuth
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  return (
    <div className=" w-full ">
      <div className="hidden md:block">
        <div className="w-full capitalize ">
          <div className="w-full items-center flex justify-between mb-4">
            <div className="flex flex-row items-center">
              <div className="h-14 mx-3 flex flex-col">
                <img
                  src="/img/animal.png"
                  alt=""
                  className="h-full grayscale aspect-square  block dark:hidden"
                />
                <img
                  src="/img/animal.png"
                  alt=""
                  className="h-full invert aspect-square hidden dark:block"
                />
              </div>
              <Breadcrumbs
                className={`bg-transparent p-0 transition-all text-lg ${
                  fixedNavbar ? "mt-1" : ""
                }`}
              >
                <Link to={`/${layout}`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal transition-all opacity-50 hover:text-blue-500 hover:opacity-100 text-primarytext dark:text-primarytext-dark"
                  >
                    {layout}
                  </Typography>
                </Link>
                {page && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-primarytext dark:text-primarytext-dark"
                  >
                    {page}
                  </Typography>
                )}
              </Breadcrumbs>
            </div>
            <div className="flex items-center">
              <div className="mr-auto md:mr-4 md:w-56">
                <Input label="Search" />
              </div>

              {/* Theme Toggle Button - Integrated cleanly into the navbar */}
              <ThemeToggle />
              <div className="block">
                <Menu>
                  <MenuHandler>
                    <IconButton variant="text" color="blue-gray">
                      <BellIcon className="w-5 h-5 text-blue-gray-500" />
                    </IconButton>
                  </MenuHandler>
                </Menu>
              </div>
              <Button
                variant="text"
                color="blue-gray"
                className="items-center gap-1 px-4 normal-case xl:flex"
                onClick={logout}
              >
                <UserCircleIcon className="w-5 h-5 text-blue-gray-500" />
                Log out
              </Button>
            </div>
          </div>
          <Sidenav routes={routegiven} />
        </div>
      </div>
      <div className="block md:hidden">
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "tween" }}
              className="w-full mb-2"
            >
              <Input label="Search" />
            </motion.div>
          )}
        </AnimatePresence>
        <Drawer
          placement="right"
          open={isDrawerOpen}
          onClose={closeDrawer}
          overlay={false}
          className="bg-white dark:bg-gray-800 text-primarytext dark:text-primarytext-dark"
        >
          <div className="flex items-center justify-between p-4">
            <Typography
              variant="h5"
              color="blue-gray"
              className="dark:text-white"
            >
              Menu
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between"> 
              {/* Theme Toggle Button - Integrated cleanly into the navbar */}
              <ThemeToggle/>
                    <Button
                variant="text"
                className="items-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 gap-1 px-4 normal-case xl:flex"
              >
                      <BellIcon className="w-5 h-5 rounded-full " />
                    </Button>
              <Button
                variant="text"
                className="items-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 gap-1 px-4 normal-case xl:flex"
                onClick={() => navigate(`/${layout}/profile`)}
              >
                <UserCircleIcon className="w-5 h-5" />
              </Button>
            </div>

            <Sidenav routes={routegiven} />
          </div>
        </Drawer>

        <div className="flex flex-col items-center justify-between">
          <div className="flex w-full items-center justify-between mb-2">
            <div className="items-center w-full capitalize flex flex-row">
              <div className="h-8 mr-3">
                <img
                  src="/img/animal.png"
                  alt=""
                  className="h-full grayscale aspect-square block dark:hidden"
                />
                <img
                  src="/img/animal.png"
                  alt=""
                  className="h-full invert aspect-square hidden dark:block"
                />
              </div>
              <Breadcrumbs
                className={`bg-transparent p-0 transition-all ${
                  fixedNavbar ? "mt-1" : ""
                }`}
              >
                <Link to={`/${layout}`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal transition-all opacity-50 hover:text-blue-500 hover:opacity-100 text-primarytext dark:text-primarytext-dark"
                  >
                    {layout}
                  </Typography>
                </Link>
                {page && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-primarytext dark:text-primarytext-dark"
                  >
                    {page}
                  </Typography>
                )}
              </Breadcrumbs>
            </div>
            <div className="flex items-center">
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={toggleSearch}
                className="mr-2"
              >
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
              </IconButton>
              <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
                onClick={openDrawer}
              >
                <Bars3Icon
                  strokeWidth={3}
                  className="w-6 h-6 text-blue-gray-500"
                />
              </IconButton>
            </div>
          </div>
          <div className="w-full">{/* <Sidenav routes={routegiven} /> */}</div>
        </div>
      </div>
    </div>
  );
}

DashboardNavbar.displayName =
  "/src/components/layouts/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
