"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NAV_LINKS } from "@/constants";
import { useClickOutside } from "@/hooks";
import { cn } from "@/lib";
import { useClerk } from "@clerk/nextjs";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { BrainCircuit, LucideIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { RefObject, useEffect, useRef, useState } from "react";
import AnimationContainer from "./global/animation-container";
import Icons from "./global/icons";
import Wrapper from "./global/wrapper";

const APP_NAME = "Artintel";

// Utility function to scroll to anchor
const scrollToAnchor = (anchorId: string) => {
  const element = document.getElementById(anchorId.replace("#", ""));
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const { user } = useClerk();
  const pathname = usePathname();

  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);

  const mobileMenuRef = useClickOutside(() => {
    if (open) setOpen(false);
  });

  const { scrollY } = useScroll({
    target: ref as RefObject<HTMLDivElement>,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  // Handle anchor links on page load
  useEffect(() => {
    if (pathname.includes("#")) {
      const anchor = pathname.split("#")[1];
      if (anchor) {
        scrollToAnchor(anchor);
      }
    }
  }, [pathname]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.includes("#")) {
      e.preventDefault();

      // Check if we're already on the page that contains the anchor
      const currentPath = pathname.split("#")[0];
      const targetPath = href.split("#")[0];

      if (currentPath === targetPath || (currentPath === "/" && targetPath === "")) {
        // We're on the same page, just scroll to the anchor
        scrollToAnchor(href.split("#")[1]);
      } else {
        // We need to navigate to the page first, then scroll to the anchor
        window.location.href = href;
      }
    }
  };

  return (
    <header
      className="fixed w-full top-4 inset-x-0 z-50 px-4 md:px-8 lg:px-12"
      data-oid="pmuldp8"
    >
      {/* Desktop Navbar */}
      <motion.div
        animate={{
          width: visible ? "85%" : "100%",
          y: visible ? 10 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 40,
        }}
        className={cn(
          "hidden lg:flex max-w-6xl mx-auto rounded-full transition-all duration-300 border border-transparent",
          visible
            ? "bg-background/60 backdrop-blur-md shadow-lg py-2 border-t-foreground/20 border-b-foreground/10 border-x-foreground/15"
            : "bg-transparent py-4",
        )}
        data-oid="ggxwjug"
      >
        <Wrapper
          className="flex items-center justify-between"
          data-oid="zcidh5a"
        >
          <div className="flex items-center space-x-8" data-oid="5.p2t.u">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              data-oid="mpmj5os"
            >
              <Link
                href="/"
                className="flex items-center gap-2"
                data-oid="byz2o3y"
              >
                <Image
                  src="/icons/artintel-logo.png"
                  alt="Artintel Logo"
                  width={24}
                  height={24}
                  className="text-primary"
                  data-oid="n3yd2jk"
                />

                <span
                  className="text-lg font-bold font-heading !leading-none bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
                  data-oid="5v4:t:n"
                >
                  {APP_NAME}
                </span>
              </Link>
            </motion.div>

            <NavigationMenu data-oid="h9hn4v5">
              <NavigationMenuList data-oid="dm00f41">
                {NAV_LINKS.map((link, index) => (
                  <NavigationMenuItem key={index} data-oid="zthju0_">
                    {link.submenu ? (
                      <>
                        <NavigationMenuTrigger data-oid="h9z6wv0">
                          {link.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent data-oid="a8_ln1q">
                          <ul
                            className="grid w-[400px] gap-3 p-4 md:grid-cols-2"
                            data-oid="j1bn76e"
                          >
                            {link.submenu.map((item, idx) => (
                              <ListItem
                                key={idx}
                                title={item.name}
                                href={item.link}
                                icon={BrainCircuit}
                                onClick={(e) => handleAnchorClick(e, item.link)}
                                data-oid="3vguagk"
                              >
                                {item.description || ""}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={link.link}
                        legacyBehavior
                        passHref
                        onClick={(e) => handleAnchorClick(e, link.link)}
                        data-oid="z0oo_sd"
                      >
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                          data-oid="_sf0kwo"
                        >
                          {link.name}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <AnimationContainer
            animation="fadeLeft"
            delay={0.1}
            data-oid="0xrrd2_"
          >
            <div className="flex items-center gap-x-4" data-oid="ws9d8n6">
              {user ? (
                <Link
                  href="/dashboard"
                  className={buttonVariants({ size: "sm" })}
                  data-oid="iv31c_e"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                    data-oid="ft6yl5n"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className={buttonVariants({ size: "sm" })}
                    data-oid="qe_x9r_"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </AnimationContainer>
        </Wrapper>
      </motion.div>

      {/* Mobile Navbar */}
      <motion.div
        animate={{
          y: visible ? 10 : 0,
          borderTopLeftRadius: open ? "0.75rem" : "2rem",
          borderTopRightRadius: open ? "0.75rem" : "2rem",
          borderBottomLeftRadius: open ? "0" : "2rem",
          borderBottomRightRadius: open ? "0" : "2rem",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={cn(
          "flex max-w-6xl mx-auto relative flex-col lg:hidden w-full justify-between items-center py-4 z-50 rounded-full",
          visible
            ? "bg-background/60 backdrop-blur-md shadow-lg border-t-foreground/20 border-b-foreground/10 border-x-foreground/15"
            : "bg-transparent",
          open && "border-transparent",
        )}
        data-oid="7m2l8uf"
      >
        <Wrapper
          className="flex items-center justify-between"
          data-oid="g_t.9z:"
        >
          <div
            className="flex items-center justify-between gap-x-4 w-full"
            data-oid="sx17gst"
          >
            <AnimationContainer
              animation="fadeRight"
              delay={0.1}
              data-oid="om0gb.r"
            >
              <Link
                href="/"
                className="flex items-center gap-2"
                data-oid="u6rv10r"
              >
                <Image
                  src="/icons/artintel-logo.png"
                  alt="Artintel Logo"
                  width={24}
                  height={24}
                  className="text-primary"
                  data-oid="214hrxj"
                />

                <span
                  className="text-lg font-bold font-heading !leading-none bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
                  data-oid=":i46qcd"
                >
                  {APP_NAME}
                </span>
              </Link>
            </AnimationContainer>

            <AnimationContainer
              animation="fadeLeft"
              delay={0.1}
              data-oid="ej26q1s"
            >
              <div
                className="flex items-center justify-center gap-x-4"
                data-oid="g83r3t6"
              >
                {!user && (
                  <Button size="sm" variant="ghost" asChild data-oid="-e02ik.">
                    <Link href="/signin" data-oid="5yw16fu">
                      Sign In
                    </Link>
                  </Button>
                )}
                {open ? (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setOpen(!open)}
                    data-oid="lzgtzc9"
                  >
                    <XIcon className="h-5 w-5" data-oid="1ozny9m" />
                  </Button>
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setOpen(!open)}
                    data-oid="63g:p6m"
                  >
                    <MenuIcon className="h-5 w-5" data-oid="qegv7uv" />
                  </Button>
                )}
              </div>
            </AnimationContainer>
          </div>
        </Wrapper>

        <AnimatePresence data-oid="d:lgfm9">
          {open && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex rounded-b-xl absolute top-16 bg-background/90 backdrop-blur-lg inset-x-0 z-50 flex-col items-start justify-start gap-2 w-full px-4 py-6 shadow-xl"
              data-oid="-r5a8km"
            >
              {NAV_LINKS.map((navItem, idx) => (
                <AnimationContainer
                  key={`link-${idx}`}
                  animation="fadeRight"
                  delay={0.1 * (idx + 1)}
                  className="w-full"
                  data-oid="n3ykwn3"
                >
                  <Link
                    href={navItem.link}
                    onClick={() => setOpen(false)}
                    className="relative hover:text-foreground hover:bg-accent w-full px-4 py-2 rounded-lg block"
                    data-oid="pmlri.p"
                  >
                    <motion.span data-oid="ut1uign">{navItem.name}</motion.span>
                  </Link>

                  {navItem.submenu && (
                    <div className="pl-4 mt-1 space-y-1" data-oid="0yr30z-">
                      {navItem.submenu.map((subItem, subIdx) => (
                        <Link
                          key={`sublink-${subIdx}`}
                          href={subItem.link}
                          onClick={() => setOpen(false)}
                          className="text-sm text-muted-foreground hover:text-foreground w-full px-4 py-1.5 rounded-lg block"
                          data-oid="j30hu9o"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </AnimationContainer>
              ))}

              <AnimationContainer
                animation="fadeUp"
                delay={0.5}
                className="w-full pt-2 mt-2 border-t border-border/40"
                data-oid="1t7b6kg"
              >
                {user ? (
                  <Link href="/dashboard" className="w-full" data-oid="bbar:98">
                    <Button
                      onClick={() => setOpen(false)}
                      variant="default"
                      className="w-full"
                      data-oid="qks5lkp"
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <div
                      className="grid grid-cols-2 gap-2 w-full"
                      data-oid=":dovm7r"
                    >
                      <Link
                        href="/signin"
                        className="w-full"
                        data-oid="ief4yn9"
                      >
                        <Button
                          onClick={() => setOpen(false)}
                          variant="outline"
                          className="w-full"
                          data-oid="fv1ast-"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link
                        href="/signup"
                        className="w-full"
                        data-oid="m139cns"
                      >
                        <Button
                          onClick={() => setOpen(false)}
                          variant="default"
                          className="w-full"
                          data-oid="3x1dogy"
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </AnimationContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

// ListItem component for the dropdown menu
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon: LucideIcon;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }
>(
  (
    { className, title, href, icon: Icon, children, onClick, ...props },
    ref,
  ) => {
    return (
      <li data-oid="-gg_0bx">
        <NavigationMenuLink asChild data-oid="shn1y2r">
          <Link
            href={href!}
            ref={ref}
            onClick={onClick}
            className={cn(
              "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
            data-oid="598te7x"
          >
            <div className="flex items-center space-x-2" data-oid="rz0005l">
              <Icon className="h-4 w-4" data-oid="l29.i6a" />
              <span
                className="text-sm font-medium !leading-none"
                data-oid="9kg:.vj"
              >
                {title}
              </span>
            </div>
            {children && (
              <p
                className="line-clamp-2 text-xs leading-snug text-muted-foreground"
                data-oid="nwn7pe7"
              >
                {children}
              </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default Navbar;
