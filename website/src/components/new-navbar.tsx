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
import { LucideIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AnimationContainer from "./global/animation-container";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const APP_NAME = "Artintel";

const Navbar = () => {
  const { user } = useClerk();
  const [scroll, setScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <header
      className="fixed top-4 inset-x-0 h-16 w-full z-[99999] select-none px-4 md:px-8 lg:px-12"
      data-oid="bly02rd"
    >
      <AnimationContainer
        reverse
        delay={0.1}
        className="size-full"
        data-oid="bn8fpr."
      >
        <div
          className={cn(
            "max-w-5xl mx-auto rounded-full transition-all duration-300 border border-transparent bg-background/60 backdrop-blur-md shadow-lg",
            !scroll && "bg-opacity-0 shadow-none",
          )}
          data-oid="3wr928d"
        >
          <div
            className="flex items-center justify-between h-16 px-6"
            data-oid="_i2d9xb"
          >
            <div className="flex items-center space-x-8" data-oid="xc4q1by">
              <Link href="/" data-oid="x7w9y9y">
                <div className="flex items-center space-x-2" data-oid="ual.av_">
                  <Image
                    src="/icons/artintel-logo.png"
                    alt="Artintel Logo"
                    width={36}
                    height={36}
                    className="text-primary"
                    data-oid="7ju3c8f"
                  />

                  <span
                    className="text-xl font-bold font-heading !leading-none bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
                    data-oid="y2j8z7q"
                  >
                    {APP_NAME}
                  </span>
                </div>
              </Link>

              <NavigationMenu className="hidden lg:flex" data-oid="k7vqtzk">
                <NavigationMenuList data-oid="a5wsi_3">
                  {NAV_LINKS.map((link) => (
                    <NavigationMenuItem key={link.title} data-oid="6lgh8c2">
                      {link.menu ? (
                        <>
                          <NavigationMenuTrigger data-oid="vl6bzb4">
                            {link.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent data-oid="m4y2s88">
                            <ul
                              className={cn(
                                "grid gap-1 p-4 md:w-[400px] lg:w-[500px] rounded-xl",
                                link.title === "Features"
                                  ? "lg:grid-cols-[.75fr_1fr]"
                                  : "lg:grid-cols-2",
                              )}
                              data-oid="jghlsnb"
                            >
                              {link.menu.map((item) => (
                                <ListItem
                                  key={item.title}
                                  title={item.title}
                                  href={item.href}
                                  icon={item.icon}
                                  onClick={(e) =>
                                    handleAnchorClick(e, item.href)
                                  }
                                  data-oid="5cj-s8n"
                                >
                                  {item.tagline}
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
                          data-oid="nl:s8ph"
                        >
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            data-oid="kwb0-d2"
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

            <div className="hidden lg:flex items-center" data-oid="4gz95bf">
              {user ? (
                <div className="flex items-center" data-oid="f1jq_82">
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ size: "sm" })}
                    data-oid="s5y7vfp"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-x-4" data-oid="skpb4lm">
                  <Link
                    href="/auth/sign-in"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                    data-oid="q20q43m"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/waiting-list"
                    className={buttonVariants({ size: "sm", variant: "outline" })}
                  >
                    Join Waiting List
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className={buttonVariants({ size: "sm" })}
                    data-oid="xat5nap"
                  >
                    Try For Free
                    <Image
                      src="/icons/artintel-logo.png"
                      alt="Artintel Logo"
                      width={18}
                      height={18}
                      className="ml-1.5"
                      data-oid="e2v6dh2"
                    />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <div
              className="flex lg:hidden items-center justify-end"
              data-oid="obqf7r5"
            >
              <Sheet open={isOpen} onOpenChange={setIsOpen} data-oid="qa_3qii">
                <SheetTrigger asChild data-oid="gud95b:">
                  <button
                    className="flex items-center justify-center p-2 rounded-full bg-transparent text-foreground"
                    data-oid="g6pl3jy"
                  >
                    <Menu className="w-5 h-5" data-oid="nbbhmm:" />
                  </button>
                </SheetTrigger>
                <SheetContent className="w-screen" data-oid="hre3c47">
                  <SheetClose
                    asChild
                    className="absolute top-3 right-5 bg-background z-20 flex items-center justify-center"
                    data-oid="jzw1fky"
                  >
                    <button
                      className="p-2 rounded-full bg-transparent text-neutral-600"
                      data-oid="ba261mb"
                    >
                      <X className="w-5 h-5" data-oid="jsmcx7i" />
                    </button>
                  </SheetClose>
                  <div
                    className="flex flex-col items-start w-full py-2 mt-10"
                    data-oid="gmizjvk"
                  >
                    <div
                      className="flex items-center justify-evenly w-full space-x-2"
                      data-oid="d5rz_1x"
                    >
                      {user ? (
                        <Link
                          href="/dashboard"
                          className={buttonVariants({
                            variant: "outline",
                            className: "w-full",
                          })}
                          data-oid="u479x1n"
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <>
                          <Link
                            href="/auth/sign-in"
                            className={buttonVariants({
                              variant: "outline",
                              className: "w-full",
                            })}
                            data-oid="_mid_18"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/waiting-list"
                            className={buttonVariants({
                              variant: "secondary",
                              className: "w-full",
                            })}
                          >
                            Join Waiting List
                          </Link>
                          <Link
                            href="/auth/sign-up"
                            className={buttonVariants({ className: "w-full" })}
                            data-oid="h87hl4u"
                          >
                            Try For Free
                            <Image
                              src="/icons/artintel-logo.png"
                              alt="Artintel Logo"
                              width={18}
                              height={18}
                              className="ml-1.5"
                              data-oid="_xm8r6f"
                            />
                          </Link>
                        </>
                      )}
                    </div>
                    <ul
                      className="flex flex-col items-start w-full mt-6"
                      data-oid="p4_:fv7"
                    >
                      <Accordion
                        type="single"
                        collapsible
                        className="!w-full"
                        data-oid="g1v5ubn"
                      >
                        {NAV_LINKS.map((link) => (
                          <AccordionItem
                            key={link.title}
                            value={link.title}
                            className="last:border-none"
                            data-oid="p4ojc2-"
                          >
                            {link.menu ? (
                              <>
                                <AccordionTrigger data-oid="0u11o86">
                                  {link.title}
                                </AccordionTrigger>
                                <AccordionContent data-oid="487st4u">
                                  <ul
                                    className={cn("w-full")}
                                    data-oid="nscmwzr"
                                  >
                                    {link.menu.map((menuItem) => (
                                      <ListItem
                                        key={menuItem.title}
                                        title={menuItem.title}
                                        href={menuItem.href}
                                        icon={menuItem.icon}
                                        onClick={(e) =>
                                          handleAnchorClick(e, menuItem.href)
                                        }
                                        data-oid="ml_ewdo"
                                      >
                                        {menuItem.tagline}
                                      </ListItem>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </>
                            ) : (
                              <div className="py-4" data-oid="o6hw43_">
                                <Link
                                  href={link.href}
                                  className="hover:text-foreground transition-colors"
                                  onClick={() => handleClose()}
                                  data-oid="kl4j.wc"
                                >
                                  {link.title}
                                </Link>
                              </div>
                            )}
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </ul>
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

// ListItem component for the dropdown menu
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href: string;
    icon: LucideIcon;
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }
>(
  (
    { className, title, href, icon: Icon, children, onClick, ...props },
    ref,
  ) => {
    return (
      <li data-oid="xl6isaf">
        <Link
          href={href}
          ref={ref}
          onClick={onClick}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
          data-oid="u7enlza"
        >
          <div
            className="flex items-center space-x-2 text-foreground"
            data-oid="ierskh3"
          >
            <Icon className="h-4 w-4" data-oid=":56rup1" />
            <h6 className="text-sm !leading-none" data-oid="l1t3917">
              {title}
            </h6>
          </div>
          {children && (
            <p
              className="line-clamp-1 text-sm leading-snug text-muted-foreground"
              data-oid="dfslwye"
            >
              {children}
            </p>
          )}
        </Link>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default Navbar;
