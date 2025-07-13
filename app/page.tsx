"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Search, X, User, Moon, Sun, LogOut } from "lucide-react";
import {
  IconMessageDots,
  IconCommand,
  IconChartDots3,
  IconScript,
  IconHandMove,
  IconCoin,
  IconCoins,
  IconCashBanknote,
} from "@tabler/icons-react";
import FlameGradientCSS from "@/components/flame-gradient-css";
import LoadingSkeleton from "@/components/loading-skeleton";

// Custom Badge Component
const CustomBadge = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    variant?:
      | "primary"
      | "secondary"
      | "language"
      | "difficulty"
      | "multiplier";
    style?: React.CSSProperties;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ children, variant = "primary", style, ...props }, ref) => {
  const getStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "rgb(var(--primary))",
          color: "rgb(var(--primary-foreground))",
          paddingLeft: "6px",
          paddingRight: "6px",
          paddingTop: "2px",
          paddingBottom: "3px",
        };
      case "secondary":
        return {
          color: "rgb(var(--muted-foreground))",
          paddingLeft: "0",
          paddingRight: "0",
          paddingTop: "0",
          paddingBottom: "0",
        };
      case "language":
        return {
          backgroundColor: "rgba(164, 213, 255, 0.1)",
          color: "#A4D5FF",
          paddingLeft: "6px",
          paddingRight: "6px",
          paddingTop: "2px",
          paddingBottom: "3px",
        };
      case "difficulty":
        return {
          backgroundColor: "rgba(163, 230, 53, 0.1)",
          color: "#A3E635",
          paddingLeft: "6px",
          paddingRight: "6px",
          paddingTop: "2px",
          paddingBottom: "3px",
        };
      case "multiplier":
        return {
          backgroundColor: "rgb(var(--primary))",
          color: "rgb(var(--primary-foreground))",
          paddingLeft: "6px",
          paddingRight: "6px",
          paddingTop: "2px",
          paddingBottom: "3px",
        };
      default:
        return {};
    }
  };

  return (
    <div
      ref={ref}
      className="font-mono text-[14px] leading-[18px] font-normal inline-flex items-center cursor-pointer rounded-[2px]"
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

const tasks = [
  {
    id: 1,
    title: "ChatCaps",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["ENGLISH", "EASY"],
    multiplier: 25,
    icon: IconMessageDots,
  },
  {
    id: 2,
    title: "Command Prompts",
    description:
      "Create and refine Spanish-language commands, improving their accuracy and clarity.",
    languages: ["SPANISH", "EASY"],
    multiplier: 50,
    icon: IconCommand,
  },
  {
    id: 3,
    title: "Plot Points",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["ENGLISH", "EASY"],
    multiplier: 50,
    icon: IconChartDots3,
  },
  {
    id: 4,
    title: "Quick Scripts",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["普通话", "EASY"],
    multiplier: 50,
    icon: IconScript,
  },
  {
    id: 5,
    title: "Gesture Set",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["ENGLISH", "EASY"],
    multiplier: 5,
    icon: IconHandMove,
  },
  {
    id: 6,
    title: "ChatCaps",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["MANDARIN", "EASY"],
    multiplier: 50,
    icon: IconMessageDots,
  },
];

const filterCategories = [
  {
    title: "ALL TYPES",
    items: ["DATA COLLECTION", "DATA ANNOTATION", "QUALITY ASSESSMENT"],
  },
  {
    title: "ALL DIFFICULTIES",
    items: ["EASY", "INTERMEDIATE", "EXPERT"],
  },
  {
    title: "ALL LANGUAGES",
    items: ["ENGLISH", "SPANISH", "MANDARIN", "普通话"],
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 4000); // Force 4 seconds loading state

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <LoadingSkeleton />;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex justify-center min-h-screen bg-background">
        <div className="flex w-full max-w-[1280px] h-screen border-x border-border">
          {/* Sidebar */}
          <div className="w-64 border-r border-border flex flex-col">
            <div className="flex flex-col gap-24">
              <div className="px-7 py-6">
                <div className="p-1">
                  <Image
                    src={
                      theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"
                    }
                    alt="Logo"
                    width={32}
                    height={32}
                    className="h-6 w-6"
                  />
                </div>
              </div>
              <div className="px-7 py-6 border-b border-border">
                <h2 className="text-[30px] leading-[36px] font-bold text-muted-foreground">
                  Filter
                </h2>
              </div>
            </div>
            <div className="px-7 py-6">
              <div className="space-y-8">
                {filterCategories.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="font-mono text-[14px] leading-[18px] font-normal text-foreground mb-3 tracking-wider">
                      {category.title}
                    </h3>
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <button
                          key={item}
                          className="block w-full text-left font-mono text-[14px] leading-[18px] font-normal text-muted-foreground hover:text-foreground transition-colors tracking-wide cursor-pointer"
                          onClick={() => {
                            // Filter functionality to be implemented
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="border-b border-border flex flex-col gap-24">
              <div className="flex items-center justify-between px-7 py-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-7">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-mono text-[14px] leading-[18px] font-normal h-auto text-foreground hover:bg-transparent rounded-[2px] cursor-pointer"
                      style={{
                        paddingLeft: "6px",
                        paddingRight: "6px",
                        paddingTop: "2px",
                        paddingBottom: "3px",
                        backgroundColor: "rgb(250 250 250 / 10%)",
                      }}
                    >
                      TASKS
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-mono text-[14px] leading-[18px] font-normal text-muted-foreground px-3 h-8 rounded-[2px] cursor-pointer"
                    >
                      TOKENS
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-mono text-[14px] leading-[18px] font-normal text-muted-foreground px-3 h-8 rounded-[2px] cursor-pointer"
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
                <div className="flex items-center gap-7">
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
                        <CustomBadge
                          variant="primary"
                          style={{
                            backgroundColor: "rgba(0, 0, 255, 0.64)",
                            color: "#fafafa",
                          }}
                        >
                          1.5X
                        </CustomBadge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Multiplier</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CustomBadge variant="secondary">
                          <FlameGradientCSS />
                          <span className="ml-1.5">
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
                          // Placeholder for profile navigation
                          console.log("Navigate to profile");
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
                          className="ml-2 h-4 w-4"
                          style={{
                            color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
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
                            className="ml-2 h-4 w-4"
                            style={{
                              color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                            }}
                            strokeWidth={1}
                          />
                        ) : (
                          <Moon
                            className="ml-2 h-4 w-4"
                            style={{
                              color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                            }}
                            strokeWidth={1}
                          />
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                        onClick={() => {
                          // Placeholder for instructions
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
                          // Placeholder for FAQ
                          console.log("Navigate to FAQ");
                        }}
                      >
                        <span style={{ letterSpacing: "0.01em" }}>FAQ</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal"
                        onClick={() => {
                          // Placeholder for Litepaper
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
                          // Placeholder for Terms and Conditions
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
                          // Placeholder for logout
                          console.log("Logout");
                        }}
                      >
                        <span style={{ letterSpacing: "0.01em" }}>Logout</span>
                        <LogOut
                          className="ml-2 h-4 w-4 text-red-500"
                          strokeWidth={1}
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex-1 relative">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 z-10 cursor-pointer transition-colors"
                    style={{
                      color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                    }}
                  >
                    <X className="w-8 h-8" strokeWidth={2} />
                  </button>
                ) : (
                  <Search
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none z-10"
                    style={{
                      color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                    }}
                    strokeWidth={2}
                  />
                )}
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className={`w-full px-7 py-6 bg-transparent text-[30px] leading-[36px] font-bold placeholder:text-muted-foreground focus:outline-none pr-16 cursor-text ${
                    searchQuery ? "text-[#fafafa]" : "text-muted-foreground"
                  }`}
                />
              </div>
            </div>

            {/* Tasks List */}
            <ScrollArea className="flex-1">
              <div>
                {tasks.map((task, index) => {
                  return (
                    <button
                      key={task.id}
                      className={`relative w-full px-7 py-6 hover:bg-[rgb(17_17_17_/_8%)] dark:hover:bg-[#242424] transition-all duration-200 cursor-pointer text-left ${
                        index !== tasks.length - 1
                          ? "border-b border-border hover:border-transparent"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[30px] leading-[36px] font-bold mb-2">
                            {task.title}
                          </h3>
                          <p
                            className="text-[14px] leading-[18px] font-normal text-muted-foreground max-w-2xl"
                            style={{ letterSpacing: "0.01em" }}
                          >
                            {task.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-2">
                            {task.languages.map((lang) => (
                              <Tooltip key={lang}>
                                <TooltipTrigger asChild>
                                  <CustomBadge
                                    variant={
                                      lang === "EASY" ||
                                      lang === "INTERMEDIATE" ||
                                      lang === "EXPERT"
                                        ? "difficulty"
                                        : "language"
                                    }
                                  >
                                    {lang}
                                  </CustomBadge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {lang === "EASY" ||
                                    lang === "INTERMEDIATE" ||
                                    lang === "EXPERT"
                                      ? "Difficulty"
                                      : "Language"}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CustomBadge
                                variant="primary"
                                style={{
                                  backgroundColor: "rgba(0, 0, 255, 0.64)",
                                  color: "#fafafa",
                                }}
                              >
                                <Image
                                  src="/icon-spark-filled.svg"
                                  alt="Spark"
                                  width={16}
                                  height={16}
                                  className="mr-1"
                                  style={{
                                    filter:
                                      "brightness(0) saturate(100%) invert(100%)",
                                  }}
                                />
                                {task.multiplier}
                              </CustomBadge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reward</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
