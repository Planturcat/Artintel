"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { NAV_LINKS } from "@/constants";
import { useClickOutside } from "@/hooks";
import { cn } from "@/lib";
import { useClerk } from "@clerk/nextjs";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { BrainCircuit, ChevronDown, Cpu, LineChart, MenuIcon, Rocket, Settings, XIcon } from "lucide-react";
import Link from "next/link";
import React, { RefObject, useRef, useState } from "react";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";

// ListItem component for dropdown menus
const ListItem = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<typeof Link> & {
        title: string;
        href: string;
        icon?: React.ComponentType<{ className?: string }>;
        children?: React.ReactNode;
    }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center space-x-2">
                        {Icon && <Icon className="h-4 w-4 text-primary" />}
                        <span className="text-sm font-medium">{title}</span>
                    </div>
                    {children && (
                        <p className="line-clamp-2 text-xs text-muted-foreground mt-1">
                            {children}
                        </p>
                    )}
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

const Navbar = () => {
    const { user } = useClerk();

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

    return (
        <header className="fixed w-full top-0 inset-x-0 z-50">
            {/* Desktop */}
            <motion.div
                animate={{
                    width: visible ? "40%" : "100%",
                    y: visible ? 20 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 40,
                }}
                style={{
                    minWidth: visible ? "min(800px, 95%)" : "100%",
                }}
                className={cn(
                    "hidden lg:flex bg-transparent self-start items-center justify-between py-4 rounded-full relative z-[50] mx-auto w-full backdrop-blur",
                    visible && "bg-background/60 py-2 border border-t-foreground/20 border-b-foreground/10 border-x-foreground/15 w-full"
                )}
            >
                <Wrapper className="flex items-center justify-between lg:px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/logo/Logo - PNG (2).png" alt="Artintel Logo" className="h-14" />
                        </Link>
                    </motion.div>

                    <div className="hidden lg:flex flex-row flex-1 absolute inset-0 items-center justify-center w-max mx-auto gap-x-2 text-sm text-muted-foreground font-medium">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {NAV_LINKS.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        {link.submenu ? (
                                            <>
                                                <NavigationMenuTrigger className="hover:text-foreground transition-all duration-500 hover:bg-accent rounded-md px-4 py-2 bg-transparent">
                                                    {link.name}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                                                        {link.submenu.map((item, idx) => (
                                                            <ListItem
                                                                key={idx}
                                                                title={item.name}
                                                                href={item.link}
                                                                icon={link.name === "Features" ?
                                                                    (idx === 0 ? BrainCircuit :
                                                                     idx === 1 ? Settings :
                                                                     idx === 2 ? Rocket :
                                                                     LineChart) :
                                                                    (idx === 0 ? Cpu :
                                                                     idx === 1 ? Cpu :
                                                                     idx === 2 ? Cpu :
                                                                     LineChart)}
                                                            >
                                                                {item.description}
                                                            </ListItem>
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            <Link href={link.link} className="hover:text-foreground transition-all duration-500 hover:bg-accent rounded-md px-4 py-2">
                                                {link.name}
                                            </Link>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <AnimationContainer animation="fadeLeft" delay={0.1}>
                        <div className="flex items-center gap-x-4">
                            {user ? (
                                <Link href="/dashboard">
                                    <Button>
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/waiting-list">
                                    <Button size="sm" className="bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 hover:from-[#00cbdd]/90 hover:to-[#00cbdd]/60 text-white border-none">
                                        Join Waiting List
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </AnimationContainer>
                </Wrapper>
            </motion.div>

            {/* Mobile */}
            <motion.div
                animate={{
                    y: visible ? 20 : 0,
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
                    "flex relative flex-col lg:hidden w-full justify-between items-center mx-auto py-3 z-50",
                    visible && "bg-neutral-950/90 backdrop-blur-md w-[95%] border rounded-2xl shadow-lg",
                    open && "border-transparent"
                )}
            >
                <Wrapper className="flex items-center justify-between lg:px-4">
                    <div className="flex items-center justify-between gap-x-4 w-full">
                        <AnimationContainer animation="fadeRight" delay={0.1}>
                            <Link href="/">
                                <img src="/logo/Logo - PNG (2).png" alt="Artintel Logo" className="h-12" />
                            </Link>
                        </AnimationContainer>

                        <AnimationContainer animation="fadeLeft" delay={0.1}>
                            <div className="flex items-center justify-center gap-x-3">
                                <Link href="/waiting-list">
                                    <Button size="sm" className="bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 hover:from-[#00cbdd]/90 hover:to-[#00cbdd]/60 text-white border-none">
                                        Join List
                                    </Button>
                                </Link>
                                <button
                                    className="p-2 rounded-md hover:bg-neutral-800 transition-colors"
                                    onClick={() => setOpen(!open)}
                                    aria-label={open ? "Close menu" : "Open menu"}
                                >
                                    {open ? (
                                        <XIcon
                                            className="text-white h-5 w-5"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="text-white h-5 w-5"
                                        />
                                    )}
                                </button>
                            </div>
                        </AnimationContainer>
                    </div>
                </Wrapper>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            ref={mobileMenuRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex rounded-b-xl absolute top-[calc(100%-1px)] bg-neutral-950/95 backdrop-blur-md inset-x-0 z-50 flex-col items-start justify-start gap-2 w-full px-4 py-6 shadow-xl"
                        >
                            {NAV_LINKS.map((navItem: any, idx: number) => (
                                <AnimationContainer
                                    key={`link=${idx}`}
                                    animation="fadeRight"
                                    delay={0.1 * (idx + 1)}
                                    className="w-full"
                                >
                                    <div className="w-full">
                                        <Link
                                            href={navItem.link}
                                            onClick={() => setOpen(false)}
                                            className="relative text-neutral-300 hover:bg-neutral-800 hover:text-white w-full px-4 py-3 rounded-lg block font-medium transition-all duration-200"
                                        >
                                            <motion.span>{navItem.name}</motion.span>
                                        </Link>

                                        {navItem.submenu && (
                                            <div className="pl-4 mt-1 space-y-1 border-l border-neutral-800 ml-4">
                                                {navItem.submenu.map((subItem: any, subIdx: number) => (
                                                    <Link
                                                        key={`sublink-${subIdx}`}
                                                        href={subItem.link}
                                                        onClick={() => setOpen(false)}
                                                        className="text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 w-full px-4 py-2 rounded-lg block transition-all duration-200 flex items-center gap-2"
                                                    >
                                                        {navItem.name === "Features" ?
                                                            (subIdx === 0 ? <BrainCircuit className="h-3.5 w-3.5 text-[#00cbdd]" /> :
                                                             subIdx === 1 ? <Settings className="h-3.5 w-3.5 text-[#00cbdd]" /> :
                                                             subIdx === 2 ? <Rocket className="h-3.5 w-3.5 text-[#00cbdd]" /> :
                                                             <LineChart className="h-3.5 w-3.5 text-[#00cbdd]" />) :
                                                            (subIdx === 0 ? <Cpu className="h-3.5 w-3.5 text-[#00cbdd]" /> :
                                                             subIdx === 1 ? <Cpu className="h-3.5 w-3.5 text-[#00cbdd]" /> :
                                                             subIdx === 2 ? <Cpu className="h-3.5 w-3.5 text-[#00cbdd]" /> :
                                                             <LineChart className="h-3.5 w-3.5 text-[#00cbdd]" />)
                                                        }
                                                        <span>{subItem.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </AnimationContainer>
                            ))}
                            <AnimationContainer animation="fadeUp" delay={0.5} className="w-full pt-2 mt-2 border-t border-neutral-800/40">
                                {user ? (
                                    <Link href="/dashboard" className="w-full">
                                        <Button
                                            onClick={() => setOpen(false)}
                                            variant="default"
                                            className="w-full bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 hover:from-[#00cbdd]/90 hover:to-[#00cbdd]/60 text-white border-none"
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        <Link href="/waiting-list" className="w-full">
                                            <Button
                                                onClick={() => setOpen(false)}
                                                className="w-full bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 hover:from-[#00cbdd]/90 hover:to-[#00cbdd]/60 text-white border-none"
                                            >
                                                Join Waiting List
                                            </Button>
                                        </Link>
                                        <Link href="/signin" className="w-full">
                                            <Button
                                                onClick={() => setOpen(false)}
                                                variant="outline"
                                                className="w-full"
                                            >
                                                Login
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </AnimationContainer>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </header>
    );
};

export default Navbar;