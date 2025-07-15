"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";
import { User, Moon, Sun, LogOut } from "lucide-react";
import {
  IconCashBanknote,
  IconCoin,
  IconCoins,
  IconMenu2,
} from "@tabler/icons-react";
import FlameGradientCSS from "@/components/flame-gradient-css";

// Custom Badge Component
const CustomBadge = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    variant?:
      | "primary"
      | "secondary"
      | "ghost"
      | "language"
      | "difficulty"
      | "multiplier"
      | "date";
    style?: React.CSSProperties;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ children, variant = "primary", style, ...props }, ref) => {
  const getStyles = () => {
    const basePadding = {
      paddingLeft: "6px",
      paddingRight: "6px",
      paddingTop: "2px",
      paddingBottom: "3px",
    };

    switch (variant) {
      case "primary":
        return {
          backgroundColor: "rgb(var(--primary))",
          color: "rgb(var(--primary-foreground))",
          ...basePadding,
        };
      case "secondary":
        return {
          color: "rgb(var(--muted-foreground))",
          paddingLeft: "0",
          paddingRight: "0",
          paddingTop: "0",
          paddingBottom: "0",
        };
      case "ghost":
        return {
          color: "rgb(var(--muted-foreground))",
          ...basePadding,
        };
      case "language":
        return {
          backgroundColor: "rgba(164, 213, 255, 0.1)",
          color: "#A4D5FF",
          ...basePadding,
        };
      case "difficulty":
        return {
          backgroundColor: "rgba(163, 230, 53, 0.1)",
          color: "#A3E635",
          ...basePadding,
        };
      case "multiplier":
        return {
          backgroundColor: "rgba(0, 0, 255, 0.64)",
          color: "#fafafa",
          ...basePadding,
        };
      case "date":
        return {
          backgroundColor: "rgba(250, 250, 250, 0.04)",
          color: "rgb(var(--foreground))",
          ...basePadding,
        };
      default:
        return {};
    }
  };

  return (
    <div
      ref={ref}
      className="font-mono text-[14px] leading-[18px] font-normal inline-flex items-center cursor-pointer rounded-[2px] gap-1"
      style={{
        ...getStyles(),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
CustomBadge.displayName = "CustomBadge";


function MainLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex justify-center min-h-screen bg-background">
        <div className="flex w-full max-w-[1280px] min-h-screen lg:border-x border-border">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:flex w-64 border-r border-border flex-col">
            <div className="px-7 py-6">
              <button
                onClick={() => router.push("/")}
                className="p-1 cursor-pointer inline-block"
              >
                <Image
                  src={
                    theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"
                  }
                  alt="Logo"
                  width={32}
                  height={32}
                  className="h-6 w-6"
                />
              </button>
            </div>
            {/* Route-specific sidebar content */}
            {pathname === "/dashboard" && (
              <>
                <div className="border-t border-border">
                  {/* Your tokens */}
                  <div className="px-7 py-6">
                    <h4 className="text-[14px] leading-[18px] text-muted-foreground mb-2">Your tokens</h4>
                    <p className="text-[30px] leading-[36px]">
                      <span className="font-bold">10,000</span> <span className="text-[14px] leading-[18px] text-muted-foreground font-mono font-normal">$SAPIEN</span>
                    </p>
                    <p className="text-[14px] leading-[18px] text-muted-foreground">
                      Use during airdrop—will expire after.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border">
                  {/* Tokens claimed */}
                  <div className="px-7 py-6">
                    <h4 className="text-[14px] leading-[18px] text-muted-foreground mb-2">Tokens claimed</h4>
                    <p className="text-[30px] leading-[36px]">
                      <span className="font-bold">210</span> <span className="text-[14px] leading-[18px] text-muted-foreground font-mono font-normal">$SAPIEN</span>
                    </p>
                    <p className="text-[14px] leading-[18px] text-muted-foreground">25% claimed</p>
                  </div>
                </div>

                <div className="border-t border-border">
                  {/* Streak */}
                  <div className="px-7 py-6">
                    <h4 className="text-[14px] leading-[18px] text-muted-foreground mb-2">Streak</h4>
                    <p className="text-[30px] leading-[36px] font-bold">10 days</p>
                    <p className="text-[14px] leading-[18px] text-muted-foreground">
                      Earn extra 0.5x multiplier for every 10d streak.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border">
                  {/* Active multiplier */}
                  <div className="px-7 py-6">
                    <h4 className="text-[14px] leading-[18px] text-muted-foreground mb-2">Active multiplier</h4>
                    <p className="text-[30px] leading-[36px] font-bold">1.5x</p>
                  </div>
                </div>

                <div className="border-t border-border">
                  {/* Global ranking */}
                  <div className="px-7 py-6">
                    <h4 className="text-[14px] leading-[18px] text-muted-foreground mb-2">Global ranking</h4>
                    <p className="text-[30px] leading-[36px] font-bold mb-2">24,681</p>
                    <button className="text-[14px] leading-[18px] text-foreground hover:text-primary transition-colors cursor-pointer">
                      Leaderboard →
                    </button>
                  </div>
                </div>

                <div className="border-t border-border">
                  {/* Stats */}
                  <div className="px-7 py-6 space-y-3">
                    <div>
                      <p className="text-[14px] leading-[18px] text-muted-foreground">Tier</p>
                      <p className="text-[14px] leading-[18px] font-bold">1</p>
                    </div>
                    <div>
                      <p className="text-[14px] leading-[18px] text-muted-foreground">Tasks completed</p>
                      <p className="text-[14px] leading-[18px] font-bold">123</p>
                    </div>
                    <div>
                      <p className="text-[14px] leading-[18px] text-muted-foreground">Battle win rate</p>
                      <p className="text-[14px] leading-[18px] font-bold">3.45%</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {pathname === "/profile" && (
              <div className="border-t border-border flex-1 overflow-y-auto">
                {/* Profile sidebar content - placeholder for now */}
                <div className="px-7 py-6">
                  <p className="text-[14px] leading-[18px] text-muted-foreground">Profile sidebar content</p>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="border-b border-border flex flex-col gap-6 lg:gap-24">
              {/* Mobile Header */}
              <div className="lg:hidden">
                <div className="flex items-center justify-between px-7 py-6">
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => router.push("/")}
                      className="p-1 cursor-pointer inline-block"
                    >
                      <Image
                        src={
                          theme === "dark"
                            ? "/logo-light.svg"
                            : "/logo-dark.svg"
                        }
                        alt="Logo"
                        width={32}
                        height={32}
                        className="h-6 w-6"
                      />
                    </button>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`font-mono text-[14px] leading-[18px] font-normal h-auto hover:bg-transparent rounded-[2px] cursor-pointer ${
                          pathname === "/" ? "text-foreground" : "text-muted-foreground"
                        }`}
                        style={pathname === "/" ? {
                          paddingLeft: "6px",
                          paddingRight: "6px",
                          paddingTop: "2px",
                          paddingBottom: "3px",
                          backgroundColor: "rgb(250 250 250 / 10%)",
                        } : undefined}
                        onClick={() => router.push("/")}
                      >
                        TASKS
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`font-mono text-[14px] leading-[18px] font-normal h-auto hover:bg-transparent rounded-[2px] cursor-pointer ${
                          pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"
                        }`}
                        style={pathname === "/dashboard" ? {
                          paddingLeft: "6px",
                          paddingRight: "6px",
                          paddingTop: "2px",
                          paddingBottom: "3px",
                          backgroundColor: "rgb(250 250 250 / 10%)",
                        } : undefined}
                        onClick={() => router.push("/dashboard")}
                      >
                        TOKENS
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`font-mono text-[14px] leading-[18px] font-normal h-auto hover:bg-transparent rounded-[2px] cursor-pointer ${
                          pathname === "/profile" ? "text-foreground" : "text-muted-foreground"
                        }`}
                        style={pathname === "/profile" ? {
                          paddingLeft: "6px",
                          paddingRight: "6px",
                          paddingTop: "2px",
                          paddingBottom: "3px",
                          backgroundColor: "rgb(250 250 250 / 10%)",
                        } : undefined}
                        onClick={() => router.push("/profile")}
                      >
                        LVL{" "}
                        <span
                          style={{
                            color: theme === "dark" ? "#fafafa" : "#111111",
                          }}
                        >
                          01
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Mobile: Stats dropdown with hamburger icon */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2">
                        <IconMenu2
                          className="w-6 h-6"
                          style={{
                            color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                          }}
                          stroke={1.25}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 rounded-[2px] shadow-none"
                      >
                        <DropdownMenuItem className="cursor-default rounded-none text-[14px] leading-[18px] font-normal">
                          <CustomBadge variant="secondary">
                            <IconCashBanknote
                              className="w-6 h-6"
                              style={{
                                color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                              }}
                              stroke={1.25}
                            />
                            <span className="ml-1.5">
                              <span
                                style={{
                                  color:
                                    theme === "dark" ? "#fafafa" : "#111111",
                                }}
                              >
                                $87
                              </span>
                              .65
                            </span>
                          </CustomBadge>
                          <span className="ml-auto text-muted-foreground">
                            Balance
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-default rounded-none text-[14px] leading-[18px] font-normal">
                          <CustomBadge variant="secondary">
                            <IconCoin
                              className="w-6 h-6"
                              style={{
                                color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                              }}
                              stroke={1.25}
                            />
                            <span className="ml-1.5">
                              <span
                                style={{
                                  color:
                                    theme === "dark" ? "#fafafa" : "#111111",
                                }}
                              >
                                +32
                              </span>
                              .10
                            </span>
                          </CustomBadge>
                          <span className="ml-auto text-muted-foreground">
                            Approved
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-default rounded-none text-[14px] leading-[18px] font-normal">
                          <CustomBadge variant="secondary">
                            <IconCoins
                              className="w-6 h-6"
                              style={{
                                color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                              }}
                              stroke={1.25}
                            />
                            <span className="ml-1.5">
                              <span
                                style={{
                                  color:
                                    theme === "dark" ? "#fafafa" : "#111111",
                                }}
                              >
                                67
                              </span>
                              .89
                            </span>
                          </CustomBadge>
                          <span className="ml-auto text-muted-foreground">
                            Pending
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-default rounded-none text-[14px] leading-[18px] font-normal">
                          <CustomBadge variant="multiplier">1.5X</CustomBadge>
                          <span className="ml-auto text-muted-foreground">
                            Multiplier
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-default rounded-none text-[14px] leading-[18px] font-normal">
                          <CustomBadge variant="secondary">
                            <FlameGradientCSS />
                            <span className="ml-1.5 whitespace-nowrap">
                              <span
                                style={{
                                  color:
                                    theme === "dark" ? "#fafafa" : "#111111",
                                }}
                              >
                                10
                              </span>{" "}
                              DAY
                            </span>
                          </CustomBadge>
                          <span className="ml-auto text-muted-foreground">
                            Streak
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Profile avatar - visible on all screens */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="h-8 w-8 p-0 rounded-full overflow-hidden relative hover:opacity-80 transition-opacity cursor-pointer"
                        style={{
                          boxShadow:
                            theme === "dark"
                              ? "inset 0 0 0 1px rgb(250 250 250 / 8%)"
                              : "inset 0 0 0 1px rgb(17 17 17 / 8%)",
                        }}
                      >
                        <Image
                          src="/avatar-1.svg"
                          alt="Profile"
                          width={32}
                          height={32}
                          className="h-full w-full"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 rounded-[2px] shadow-none"
                      >
                        <DropdownMenuItem
                          className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal flex justify-between"
                          onClick={() => {
                            router.push("/profile");
                          }}
                        >
                          <div className="flex flex-col">
                            <span style={{ letterSpacing: "0.01em" }}>
                              Profile
                            </span>
                            <span className="font-mono text-[14px] leading-[18px] text-muted-foreground">
                              70% TRUST SCORE
                            </span>
                          </div>
                          <User
                            className="ml-2"
                            style={{
                              color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                              width: "16px",
                              height: "16px",
                            }}
                            strokeWidth={1}
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal flex justify-between"
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                        >
                          <span style={{ letterSpacing: "0.01em" }}>
                            {theme === "dark" ? "Light mode" : "Dark mode"}
                          </span>
                          {theme === "dark" ? (
                            <Sun
                              className="ml-2"
                              style={{
                                color: "#5c5c5c",
                                width: "16px",
                                height: "16px",
                              }}
                              strokeWidth={1}
                            />
                          ) : (
                            <Moon
                              className="ml-2"
                              style={{
                                color: "#b2b2b2",
                                width: "16px",
                                height: "16px",
                              }}
                              strokeWidth={1}
                            />
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                          onClick={() => {
                            console.log("Navigate to instructions");
                          }}
                        >
                          <span style={{ letterSpacing: "0.01em" }}>
                            Instructions
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                          onClick={() => {
                            console.log("Navigate to FAQ");
                          }}
                        >
                          <span style={{ letterSpacing: "0.01em" }}>FAQ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                          onClick={() => {
                            console.log("Navigate to Litepaper");
                          }}
                        >
                          <span style={{ letterSpacing: "0.01em" }}>
                            Litepaper
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                          onClick={() => {
                            console.log("Navigate to Terms and Conditions");
                          }}
                        >
                          <span style={{ letterSpacing: "0.01em" }}>
                            Terms and Conditions
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer rounded-none text-red-500 focus:text-red-500 text-[14px] leading-[18px] font-normal flex justify-between"
                          onClick={() => {
                            console.log("Logout");
                          }}
                        >
                          <span style={{ letterSpacing: "0.01em" }}>
                            Logout
                          </span>
                          <LogOut
                            className="ml-2 text-red-500"
                            style={{
                              width: "16px",
                              height: "16px",
                            }}
                            strokeWidth={1}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:flex items-center justify-between px-7 py-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-7">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`font-mono text-[14px] leading-[18px] font-normal h-auto hover:bg-transparent rounded-[2px] cursor-pointer ${
                        pathname === "/" ? "text-foreground" : "text-muted-foreground"
                      }`}
                      style={pathname === "/" ? {
                        paddingLeft: "6px",
                        paddingRight: "6px",
                        paddingTop: "2px",
                        paddingBottom: "3px",
                        backgroundColor: "rgb(250 250 250 / 10%)",
                      } : undefined}
                      onClick={() => router.push("/")}
                    >
                      TASKS
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`font-mono text-[14px] leading-[18px] font-normal h-auto hover:bg-transparent rounded-[2px] cursor-pointer ${
                        pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"
                      }`}
                      style={pathname === "/dashboard" ? {
                        paddingLeft: "6px",
                        paddingRight: "6px",
                        paddingTop: "2px",
                        paddingBottom: "3px",
                        backgroundColor: "rgb(250 250 250 / 10%)",
                      } : undefined}
                      onClick={() => router.push("/dashboard")}
                    >
                      TOKENS
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`font-mono text-[14px] leading-[18px] font-normal h-auto hover:bg-transparent rounded-[2px] cursor-pointer ${
                        pathname === "/profile" ? "text-foreground" : "text-muted-foreground"
                      }`}
                      style={pathname === "/profile" ? {
                        paddingLeft: "6px",
                        paddingRight: "6px",
                        paddingTop: "2px",
                        paddingBottom: "3px",
                        backgroundColor: "rgb(250 250 250 / 10%)",
                      } : undefined}
                      onClick={() => router.push("/profile")}
                    >
                      LVL{" "}
                      <span
                        style={{
                          color: theme === "dark" ? "#fafafa" : "#111111",
                        }}
                      >
                        01
                      </span>
                    </Button>
                  </div>
                </div>
                {/* Desktop: Badges and Avatar */}
                <div className="hidden lg:flex items-center gap-4 lg:gap-7">
                  <div className="flex items-center gap-7">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CustomBadge variant="secondary">
                          <IconCashBanknote
                            className="w-6 h-6"
                            style={{
                              color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                            }}
                            stroke={1.25}
                          />
                          <span className="ml-1.5">
                            <span
                              style={{
                                color: theme === "dark" ? "#fafafa" : "#111111",
                              }}
                            >
                              $87
                            </span>
                            .65
                          </span>
                        </CustomBadge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Balance</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CustomBadge variant="secondary">
                          <IconCoin
                            className="w-6 h-6"
                            style={{
                              color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                            }}
                            stroke={1.25}
                          />
                          <span className="ml-1.5">
                            <span
                              style={{
                                color: theme === "dark" ? "#fafafa" : "#111111",
                              }}
                            >
                              +32
                            </span>
                            .10
                          </span>
                        </CustomBadge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Approved tokens</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CustomBadge variant="secondary">
                          <IconCoins
                            className="w-6 h-6"
                            style={{
                              color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                            }}
                            stroke={1.25}
                          />
                          <span className="ml-1.5">
                            <span
                              style={{
                                color: theme === "dark" ? "#fafafa" : "#111111",
                              }}
                            >
                              67
                            </span>
                            .89
                          </span>
                        </CustomBadge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Pending</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CustomBadge variant="multiplier">1.5X</CustomBadge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Multiplier</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CustomBadge variant="secondary">
                          <FlameGradientCSS />
                          <span className="ml-1.5 whitespace-nowrap">
                            <span
                              style={{
                                color: theme === "dark" ? "#fafafa" : "#111111",
                              }}
                            >
                              10
                            </span>{" "}
                            DAY
                          </span>
                        </CustomBadge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Streak</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="h-8 w-8 p-0 rounded-full overflow-hidden relative hover:opacity-80 transition-opacity cursor-pointer"
                      style={{
                        boxShadow:
                          theme === "dark"
                            ? "inset 0 0 0 1px rgb(250 250 250 / 8%)"
                            : "inset 0 0 0 1px rgb(17 17 17 / 8%)",
                      }}
                    >
                      <Image
                        src="/avatar-1.svg"
                        alt="Profile"
                        width={32}
                        height={32}
                        className="h-full w-full"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-[2px] shadow-none"
                    >
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal flex justify-between"
                        onClick={() => {
                          router.push("/profile");
                        }}
                      >
                        <div className="flex flex-col">
                          <span style={{ letterSpacing: "0.01em" }}>
                            Profile
                          </span>
                          <span className="font-mono text-[14px] leading-[18px] text-muted-foreground">
                            70% TRUST SCORE
                          </span>
                        </div>
                        <User
                          className="ml-2"
                          style={{
                            color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                            width: "16px",
                            height: "16px",
                          }}
                          strokeWidth={1}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal flex justify-between"
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      >
                        <span style={{ letterSpacing: "0.01em" }}>
                          {theme === "dark" ? "Light mode" : "Dark mode"}
                        </span>
                        {theme === "dark" ? (
                          <Sun
                            className="ml-2"
                            style={{
                              color: "#5c5c5c",
                              width: "16px",
                              height: "16px",
                            }}
                            strokeWidth={1}
                          />
                        ) : (
                          <Moon
                            className="ml-2"
                            style={{
                              color: "#b2b2b2",
                              width: "16px",
                              height: "16px",
                            }}
                            strokeWidth={1}
                          />
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                        onClick={() => {
                          console.log("Navigate to instructions");
                        }}
                      >
                        <span style={{ letterSpacing: "0.01em" }}>
                          Instructions
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                        onClick={() => {
                          console.log("Navigate to FAQ");
                        }}
                      >
                        <span style={{ letterSpacing: "0.01em" }}>FAQ</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                        onClick={() => {
                          console.log("Navigate to Litepaper");
                        }}
                      >
                        <span style={{ letterSpacing: "0.01em" }}>
                          Litepaper
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                        onClick={() => {
                          console.log("Navigate to Terms and Conditions");
                        }}
                      >
                        <span style={{ letterSpacing: "0.01em" }}>
                          Terms and Conditions
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-red-500 focus:text-red-500 text-[14px] leading-[18px] font-normal flex justify-between"
                        onClick={() => {
                          console.log("Logout");
                        }}
                      >
                        <span style={{ letterSpacing: "0.01em" }}>Logout</span>
                        <LogOut
                          className="ml-2 text-red-500"
                          style={{
                            width: "16px",
                            height: "16px",
                          }}
                          strokeWidth={1}
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayoutContent>{children}</MainLayoutContent>;
}