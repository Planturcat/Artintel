"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib";
import { NAV_LINKS } from "@/utils/nav-links";
import { scrollToAnchor } from "@/utils";
import { BrainCircuit, LucideIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AnimationContainer from "./global/animation-container";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { APP_NAME } from "@/constants";

const FloatingNavbar = () => {
  const [user, setUser] = useState<boolean>(false);
  const [scroll, setScroll] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage for authentication state
    const authState = localStorage.getItem("isAuthenticated");
    setUser(authState === "true");
  }, []);

  // Handle anchor links on page load
  useEffect(() => {
    if (pathname.includes("#")) {
      const anchor = pathname.split("#")[1];
      if (anchor) {
        scrollToAnchor(anchor);
      }
    }
  }, [pathname]);

  const handleScroll = () => {
    if (window.scrollY > 8) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      scrollToAnchor(href.replace("/", ""));
    }
  };

  return (
    <header
      className={cn(
        "fixed top-4 inset-x-0 h-14 w-full z-[99999] select-none px-4 md:px-8 lg:px-12",
      )}
    >
      <AnimationContainer
        reverse
        delay={0.1}
        className="size-full"
      >
        <div
          className={cn(
            "max-w-5xl mx-auto rounded-full transition-all duration-300 border border-transparent bg-background/60 backdrop-blur-md shadow-lg",
            !scroll && "bg-opacity-0 shadow-none",
          )}
        >
          <div
            className="flex items-center justify-between h-14 px-6"
          >
            <div className="flex items-center space-x-12">
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/logo/Icon - PNG (1).png"
                    alt="Artintel Logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
{/*}
                  <span
                    className="text-lg font-bold font-heading !leading-none"
                  >
                    {APP_NAME}
                  </span>*/}
                  
                </div>
              </Link>

              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  {NAV_LINKS.map((link) => (
                    <NavigationMenuItem key={link.title}>
                      {link.menu ? (
                        <>
                          <NavigationMenuTrigger>
                            {link.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul
                              className={cn(
                                "grid gap-1 p-4 md:w-[400px] lg:w-[500px] rounded-xl",
                                link.title === "Features"
                                  ? "lg:grid-cols-[.75fr_1fr]"
                                  : "lg:grid-cols-2",
                              )}
                            >
                              {link.title === "Features" && (
                                <li
                                  className="row-span-4 pr-2 relative rounded-lg overflow-hidden"
                                >
                                  <div
                                    className="absolute inset-0 !z-10 h-full w-[calc(100%-10px)] bg-[linear-gradient(to_right,rgb(38,38,38,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(38,38,38,0.5)_1px,transparent_1px)] bg-[size:1rem_1rem]"
                                  ></div>
                                  <NavigationMenuLink
                                    asChild
                                    className="z-20 relative"
                                  >
                                    <Link
                                      href="/features"
                                      className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                                    >
                                      <h6
                                        className="mb-2 mt-4 text-lg font-medium"
                                      >
                                        All Features
                                      </h6>
                                      <p
                                        className="text-sm leading-tight text-muted-foreground"
                                      >
                                        Model selection, fine-tuning, deployment
                                        and more.
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              )}
                              {link.menu.map((menuItem) => (
                                <ListItem
                                  key={menuItem.title}
                                  title={menuItem.title}
                                  href={menuItem.href}
                                  icon={menuItem.icon}
                                  onClick={(e) =>
                                    handleAnchorClick(e, menuItem.href)
                                  }
                                >
                                  {menuItem.tagline}
                                </ListItem>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          legacyBehavior
                          passHref
                          onClick={(e) => handleAnchorClick(e, link.href)}
                        >
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            {link.title}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="flex items-center">
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ size: "sm" })}
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <Link
                    href="/signin"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className={buttonVariants({ size: "sm" })}
                  >
                    Try For Free
                    <Image
                      src="/logo/Icon - PNG (1).png"
                      alt="Artintel Logo"
                      width={14}
                      height={14}
                      className="size-3.5 ml-1.5"
                    />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                    aria-label="Toggle Menu"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col gap-6 mt-6">
                    <Link href="/" className="flex items-center gap-2">
                      <Image
                        src="/logo/Icon - PNG (1).png"
                        alt="Artintel Logo"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      {/*<span className="text-lg font-bold font-heading">
                        {APP_NAME}
                      </span>*/}

                    </Link>

                    <div className="flex flex-col space-y-3">
                      {NAV_LINKS.map((link, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                          {link.menu ? (
                            <>
                              <div className="font-medium">{link.title}</div>
                              <div className="flex flex-col pl-4 gap-2">
                                {link.menu.map((item, i) => (
                                  <Link
                                    key={i}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            <Link
                              href={link.href}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {link.title}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col items-start w-full py-2 mt-10">
                      <div className="flex items-center justify-evenly w-full space-x-2">
                        {user ? (
                          <Link
                            href="/dashboard"
                            className={buttonVariants({
                              variant: "outline",
                              className: "w-full",
                            })}
                          >
                            Dashboard
                          </Link>
                        ) : (
                          <>
                            <Link
                              href="/signin"
                              className={buttonVariants({
                                variant: "outline",
                                className: "w-full",
                              })}
                            >
                              Sign In
                            </Link>
                            <Link
                              href="/signup"
                              className={buttonVariants({ className: "w-full" })}
                            >
                              Try For Free
                              <Image
                                src="/logo/Icon - PNG (1).png"
                                alt="Artintel Logo"
                                width={14}
                                height={14}
                                className="ml-1.5"
                              />
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </AnimationContainer>
    </header>
  );
};

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
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href!}
            ref={ref}
            onClick={onClick}
            className={cn(
              "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div
              className="flex items-center space-x-2 text-neutral-300"
            >
              <Icon className="h-4 w-4" />
              <h6
                className="text-sm font-medium !leading-none"
              >
                {title}
              </h6>
            </div>
            <p
              title={children! as string}
              className="line-clamp-1 text-sm leading-snug text-muted-foreground"
            >
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default FloatingNavbar;
