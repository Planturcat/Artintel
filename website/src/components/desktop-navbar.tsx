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
import { cn } from "@/lib";
import { NAV_LINKS } from "@/utils/nav-links";
import { scrollToAnchor } from "@/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

const DesktopNavbar = () => {
  const router = useRouter();
  const { user, signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

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
    <div
      className="hidden lg:flex items-center justify-end space-x-4"
      data-oid="z8x4f9i"
    >
      <NavigationMenu data-oid="plphav4">
        <NavigationMenuList data-oid=":b4kbf7">
          {NAV_LINKS.map((link) =>
            link.menu ? (
              <NavigationMenuItem key={link.title} data-oid="h-e6ww1">
                <NavigationMenuTrigger data-oid="pxf3u1u">
                  {link.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent data-oid="g2.:9.5">
                  <ul
                    className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                    data-oid="cfg13-m"
                  >
                    {link.menu.map((menuItem) => (
                      <ListItem
                        key={menuItem.title}
                        title={menuItem.title}
                        href={menuItem.href}
                        icon={menuItem.icon}
                        onClick={(e) => handleAnchorClick(e, menuItem.href)}
                        data-oid="h98mdsd"
                      >
                        {menuItem.tagline}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={link.title} data-oid="8ro9jx2">
                <Link
                  href={link.href}
                  legacyBehavior
                  passHref
                  data-oid="wg7v7kp"
                >
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    data-oid="n5nv9g-"
                  >
                    {link.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-2" data-oid="of.meyo">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "outline" })}
              data-oid="hs6imdx"
            >
              Dashboard
            </Link>
            <Button
              onClick={handleSignOut}
              variant="destructive"
              data-oid="orn_o5j"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link
              href="/signin"
              className={buttonVariants({ variant: "outline" })}
              data-oid="qos5e_d"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className={buttonVariants()}
              data-oid="sihn:w-"
            >
              Try For Free
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  (
    { className, title, href, icon: Icon, children, onClick, ...props },
    ref,
  ) => {
    return (
      <li data-oid="dh0o0fo">
        <NavigationMenuLink asChild data-oid="7ubkare">
          <Link
            href={href!}
            ref={ref}
            onClick={onClick}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
            data-oid="yvxuhz0"
          >
            <div
              className="flex items-center space-x-2 text-foreground"
              data-oid="4zor8__"
            >
              <Icon className="h-4 w-4" data-oid="s9-mmf4" />
              <h6 className="text-sm !leading-none" data-oid="60_xu6s">
                {title}
              </h6>
            </div>
            <p
              title={children! as string}
              className="line-clamp-2 text-sm leading-snug text-muted-foreground"
              data-oid="peo:07k"
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

export default DesktopNavbar;
