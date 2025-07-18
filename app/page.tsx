"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import {
  Search,
  X,
  User,
  Moon,
  Sun,
  LogOut,
  Plus,
  Car,
  Tag,
  Type,
  Shirt,
  FileText,
  Edit3,
  Info,
} from "lucide-react";
import {
  IconMessageDots,
  IconCommand,
  IconChartDots3,
  IconScript,
  IconHandMove,
  IconCoin,
  IconCoins,
  IconCashBanknote,
  IconMenu2,
  IconLayoutGrid,
  IconList,
} from "@tabler/icons-react";
import FlameGradientCSS from "@/components/flame-gradient-css";
import LoadingSkeleton from "@/components/loading-skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const tasks = [
  {
    id: 1,
    title: "Vehicle Positioning",
    description:
      "Analyze vehicle positions in images and provide accurate location data for autonomous driving systems.",
    type: "DATA ANNOTATION",
    difficulty: "INTERMEDIATE",
    languages: ["ENGLISH"],
    price: "0.50 USD",
    icon: Car,
  },
  {
    id: 2,
    title: "Tag-a-Dog",
    description:
      "Identify and tag different dog breeds in images to train pet recognition models.",
    type: "DATA COLLECTION",
    difficulty: "EASY",
    languages: ["ENGLISH"],
    price: "0.50 USD",
    icon: Tag,
  },
  {
    id: 3,
    title: "Textography",
    description:
      "Extract and transcribe text from images with various fonts and backgrounds.",
    type: "DATA ANNOTATION",
    difficulty: "INTERMEDIATE",
    languages: ["ENGLISH"],
    price: "0.50 USD",
    icon: Type,
  },
  {
    id: 4,
    title: "Clothing Match",
    description:
      "Match and categorize clothing items by style, color, and type for fashion AI systems.",
    type: "DATA ANNOTATION",
    difficulty: "EASY",
    languages: ["ENGLISH"],
    price: "0.50 USD",
    icon: Shirt,
  },
  {
    id: 5,
    title: "Image Text Extraction",
    description:
      "Extract text from complex images including handwritten notes and stylized fonts.",
    type: "DATA ANNOTATION",
    difficulty: "EXPERT",
    languages: ["ENGLISH"],
    price: "0.50 USD",
    icon: FileText,
  },
  {
    id: 6,
    title: "English Copyediting",
    description:
      "Edit and improve English text for grammar, clarity, and style.",
    type: "QUALITY ASSESSMENT",
    difficulty: "INTERMEDIATE",
    languages: ["ENGLISH"],
    price: "10",
    icon: Edit3,
    disabled: true,
    disabledMessage: "No more data for this task right now. Check back later.",
  },
  {
    id: 7,
    title: "ChatCaps",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    type: "DATA ANNOTATION",
    difficulty: "EASY",
    languages: ["ENGLISH"],
    multiplier: 25,
    icon: IconMessageDots,
  },
  {
    id: 8,
    title: "Command Prompts",
    description:
      "Create and refine Spanish-language commands, improving their accuracy and clarity.",
    type: "DATA COLLECTION",
    difficulty: "EASY",
    languages: ["SPANISH"],
    multiplier: 50,
    icon: IconCommand,
  },
  {
    id: 9,
    title: "Plot Points",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    type: "QUALITY ASSESSMENT",
    difficulty: "INTERMEDIATE",
    languages: ["ENGLISH"],
    multiplier: 50,
    icon: IconChartDots3,
  },
  {
    id: 10,
    title: "Quick Scripts",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    type: "DATA COLLECTION",
    difficulty: "EASY",
    languages: ["普通话"],
    multiplier: 50,
    icon: IconScript,
  },
  {
    id: 11,
    title: "Gesture Set",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    type: "DATA ANNOTATION",
    difficulty: "EXPERT",
    languages: ["ENGLISH"],
    multiplier: 5,
    icon: IconHandMove,
  },
  {
    id: 12,
    title: "ChatCaps",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    type: "DATA ANNOTATION",
    difficulty: "EASY",
    languages: ["MANDARIN"],
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const { theme, setTheme } = useTheme();

  // Filter states - empty arrays mean "ALL" is selected
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 2000); // Force 2 seconds loading state

    return () => clearTimeout(timer);
  }, []);

  // Filter logic - clicking "ALL" clears selections, otherwise toggle multi-selection
  const handleFilterClick = (
    category: "type" | "difficulty" | "language",
    value: string
  ) => {
    if (category === "type") {
      if (value === "ALL TYPES") {
        setSelectedTypes([]);
      } else {
        setSelectedTypes((prev) =>
          prev.includes(value)
            ? prev.filter((t) => t !== value)
            : [...prev, value]
        );
      }
    } else if (category === "difficulty") {
      if (value === "ALL DIFFICULTIES") {
        setSelectedDifficulties([]);
      } else {
        setSelectedDifficulties((prev) =>
          prev.includes(value)
            ? prev.filter((d) => d !== value)
            : [...prev, value]
        );
      }
    } else if (category === "language") {
      if (value === "ALL LANGUAGES") {
        setSelectedLanguages([]);
      } else {
        setSelectedLanguages((prev) =>
          prev.includes(value)
            ? prev.filter((l) => l !== value)
            : [...prev, value]
        );
      }
    }
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter((task) => {
    // Check type filter (empty array means show all)
    if (selectedTypes.length > 0 && !selectedTypes.includes(task.type)) {
      return false;
    }

    // Check difficulty filter (empty array means show all)
    if (
      selectedDifficulties.length > 0 &&
      !selectedDifficulties.includes(task.difficulty)
    ) {
      return false;
    }

    // Check language filter (empty array means show all)
    if (
      selectedLanguages.length > 0 &&
      !task.languages.some((lang) => selectedLanguages.includes(lang))
    ) {
      return false;
    }

    // Check search query
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  if (!mounted) {
    return <LoadingSkeleton />;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex justify-center min-h-screen bg-background">
        <div className="flex w-full max-w-[1280px] min-h-screen lg:border-x border-border">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:flex w-64 border-r border-border flex-col">
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
                  Filter{" "}
                  {(selectedTypes.length > 0 ||
                    selectedDifficulties.length > 0 ||
                    selectedLanguages.length > 0) && (
                    <span className="font-mono text-[14px] leading-[18px] font-normal text-primary ml-2">
                      (
                      {selectedTypes.length +
                        selectedDifficulties.length +
                        selectedLanguages.length}
                      )
                    </span>
                  )}
                </h2>
              </div>
            </div>
            <div className="px-7 py-6">
              <div className="flex flex-col gap-8">
                {filterCategories.map((category, idx) => {
                  const categoryType =
                    idx === 0 ? "type" : idx === 1 ? "difficulty" : "language";
                  const selectedItems =
                    categoryType === "type"
                      ? selectedTypes
                      : categoryType === "difficulty"
                      ? selectedDifficulties
                      : selectedLanguages;

                  return (
                    <div key={idx} className="flex flex-col gap-2">
                      {/* Add the "ALL" option first */}
                      <button
                        className={`flex items-center font-mono text-[14px] leading-[18px] font-normal transition-colors tracking-wide cursor-pointer ${
                          selectedItems.length === 0
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() =>
                          handleFilterClick(categoryType, category.title)
                        }
                      >
                        {category.title}
                      </button>
                      {category.items.map((item) => {
                        const isSelected = selectedItems.includes(item);
                        return (
                          <button
                            key={item}
                            className={`flex items-center font-mono text-[14px] leading-[18px] font-normal transition-colors tracking-wide cursor-pointer ${
                              isSelected
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() =>
                              handleFilterClick(categoryType, item)
                            }
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
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
                        onClick={() => router.push("/dashboard")}
                      >
                        TOKENS
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-mono text-[14px] leading-[18px] font-normal text-muted-foreground px-3 h-8 rounded-[2px] cursor-pointer"
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
                            // Placeholder for profile navigation
                            console.log("Navigate to profile");
                          }}
                        >
                          <div className="flex flex-col">
                            <span style={{ letterSpacing: "0.01em" }}>
                              Profile
                            </span>
                            <span className="font-mono text-[14px] leading-[18px] text-muted-foreground">
                              LVL 01, 70% TS
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
                        {/* Wallet Section */}
                        <DropdownMenuItem className="cursor-default rounded-none text-[14px] leading-[18px] font-normal flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Image
                              src="/icon-metamask.svg"
                              alt="MetaMask"
                              width={16}
                              height={16}
                            />
                            <span className="font-mono">0x09...d1cA</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal flex items-center justify-between"
                          onClick={() => setShowWalletDialog(true)}
                        >
                          <span style={{ letterSpacing: "0.01em" }}>
                            Add wallet
                          </span>
                          <Plus
                            className="ml-2"
                            style={{
                              color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                              width: "16px",
                              height: "16px",
                            }}
                            strokeWidth={1}
                          />
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
                      onClick={() => router.push("/dashboard")}
                    >
                      TOKENS
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-mono text-[14px] leading-[18px] font-normal text-muted-foreground px-3 h-8 rounded-[2px] cursor-pointer"
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
                            LVL 01, 70% TS
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
                      {/* Wallet Section */}
                      <DropdownMenuItem className="cursor-default rounded-none text-[14px] leading-[18px] font-normal flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/icon-metamask.svg"
                            alt="MetaMask"
                            width={16}
                            height={16}
                          />
                          <span className="font-mono">0x09...d1cA</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-none text-[14px] leading-[18px] font-normal flex items-center justify-between"
                        onClick={() => setShowWalletDialog(true)}
                      >
                        <span style={{ letterSpacing: "0.01em" }}>
                          Add wallet
                        </span>
                        <Plus
                          className="ml-2"
                          style={{
                            color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                            width: "16px",
                            height: "16px",
                          }}
                          strokeWidth={1}
                        />
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

              {/* Search Bar */}
              <div className="flex-1 relative px-7 py-6">
                <div className="flex items-center gap-6 absolute right-6 top-1/2 -translate-y-1/2 z-10">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="w-8 h-8 cursor-pointer transition-colors"
                      style={{
                        color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                      }}
                    >
                      <X className="w-8 h-8" strokeWidth={2} />
                    </button>
                  )}
                  {!searchQuery && (
                    <Search
                      className="w-8 h-8 pointer-events-none"
                      style={{
                        color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                      }}
                      strokeWidth={2}
                    />
                  )}
                  <button
                    onClick={() =>
                      setViewMode(viewMode === "list" ? "grid" : "list")
                    }
                    className="w-8 h-8 cursor-pointer transition-colors"
                    style={{
                      color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                    }}
                  >
                    {viewMode === "list" ? (
                      <IconLayoutGrid className="w-8 h-8" strokeWidth={2} />
                    ) : (
                      <IconList className="w-8 h-8" strokeWidth={2} />
                    )}
                  </button>
                </div>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className={`w-full bg-transparent text-[30px] leading-[36px] font-bold placeholder:text-muted-foreground focus:outline-none pr-24 cursor-text ${
                    searchQuery ? "text-[#fafafa]" : "text-muted-foreground"
                  }`}
                />
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden border-b border-border px-7 py-6">
              <div className="flex flex-col gap-8">
                {filterCategories.map((category, idx) => {
                  const categoryType =
                    idx === 0 ? "type" : idx === 1 ? "difficulty" : "language";
                  const selectedItems =
                    categoryType === "type"
                      ? selectedTypes
                      : categoryType === "difficulty"
                      ? selectedDifficulties
                      : selectedLanguages;

                  return (
                    <div key={idx} className="flex flex-col gap-2">
                      {/* Add the "ALL" option first */}
                      <button
                        className={`flex items-center font-mono text-[14px] leading-[18px] font-normal transition-colors tracking-wide cursor-pointer ${
                          selectedItems.length === 0
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() =>
                          handleFilterClick(categoryType, category.title)
                        }
                      >
                        {category.title}
                      </button>
                      {category.items.map((item) => {
                        const isSelected = selectedItems.includes(item);
                        return (
                          <button
                            key={item}
                            className={`flex items-center font-mono text-[14px] leading-[18px] font-normal transition-colors tracking-wide cursor-pointer ${
                              isSelected
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() =>
                              handleFilterClick(categoryType, item)
                            }
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tasks List */}
            <ScrollArea className="flex-1">
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : ""
                } [&:has(.task-enabled:hover)>.task-item:not(.task-disabled)]:opacity-[0.32] [&:has(.task-enabled:hover)>.task-item:has(.task-enabled:hover)]:!opacity-100`}
              >
                {filteredTasks.map((task, index) => {
                  const isLastRow =
                    viewMode === "grid" && index >= filteredTasks.length - 3;
                  const isRightColumn =
                    viewMode === "grid" && (index + 1) % 3 === 0;
                  return (
                    <button
                      key={task.id}
                      className={`task-item relative text-left transition-opacity duration-200 ${
                        viewMode === "list"
                          ? `w-full px-7 py-6 ${
                              index !== filteredTasks.length - 1
                                ? "border-b border-border"
                                : ""
                            }`
                          : `p-7 ${!isLastRow ? "border-b" : ""} ${
                              !isRightColumn ? "lg:border-r" : ""
                            } border-border`
                      } ${
                        task.disabled
                          ? "task-disabled cursor-not-allowed opacity-50"
                          : "task-enabled cursor-pointer"
                      }`}
                      onClick={() =>
                        !task.disabled && router.push(`/task/${task.id}`)
                      }
                      disabled={task.disabled}
                    >
                      <div
                        className={`flex ${
                          viewMode === "list"
                            ? "flex-col lg:flex-row lg:items-start lg:justify-between"
                            : "flex-col"
                        } gap-3`}
                      >
                        <div className="flex-1">
                          <h3
                            className={`font-bold mb-2 ${
                              viewMode === "list"
                                ? "text-[30px] leading-[36px]"
                                : "text-[20px] leading-[26px]"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <p
                            className={`text-[14px] leading-[18px] font-normal text-muted-foreground ${
                              viewMode === "list" ? "lg:max-w-2xl" : ""
                            }`}
                            style={{ letterSpacing: "0.01em" }}
                          >
                            {task.disabled
                              ? task.disabledMessage
                              : task.description}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            viewMode === "list" ? "lg:gap-3" : "gap-2 mt-4"
                          } flex-wrap ${
                            viewMode === "list" ? "lg:flex-nowrap" : ""
                          }`}
                        >
                          {/* Expiration date - hidden for now
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CustomBadge variant="date">
                                {task.date}
                              </CustomBadge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Expires</p>
                            </TooltipContent>
                          </Tooltip>
                          */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CustomBadge variant="difficulty">
                                {task.difficulty}
                              </CustomBadge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Difficulty</p>
                            </TooltipContent>
                          </Tooltip>
                          {task.languages.map((lang) => (
                            <Tooltip key={lang}>
                              <TooltipTrigger asChild>
                                <CustomBadge variant="language">
                                  {lang}
                                </CustomBadge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Language</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}

                          {task.price ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <CustomBadge
                                  variant={
                                    task.disabled ? "ghost" : "multiplier"
                                  }
                                >
                                  {task.disabled ? (
                                    <Info className="w-4 h-4 mr-1" />
                                  ) : (
                                    <span className="mr-1">$</span>
                                  )}
                                  {task.price}
                                </CustomBadge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {task.disabled
                                    ? "Tasks available"
                                    : "Price per task"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          ) : task.multiplier ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <CustomBadge variant="multiplier">
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
                          ) : null}
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

      {/* Wallet Dialog */}
      <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
        <DialogContent className="sm:max-w-[425px] rounded-[2px] bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-normal">
              Link your wallet
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Link a wallet to your Sapien account
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-3">
            <button
              className="w-full p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors flex items-center gap-3"
              onClick={() => {
                console.log("Connect MetaMask");
                setShowWalletDialog(false);
              }}
            >
              <Image
                src="/icon-metamask.svg"
                alt="MetaMask"
                width={24}
                height={24}
              />
              <span className="text-base">MetaMask</span>
            </button>
            <button
              className="w-full p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors flex items-center gap-3"
              onClick={() => {
                console.log("Connect Coinbase");
                setShowWalletDialog(false);
              }}
            >
              <div className="w-6 h-6 rounded-full bg-[#0052FF] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <span className="text-base">Coinbase</span>
            </button>
            <button
              className="w-full p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors flex items-center gap-3"
              onClick={() => {
                console.log("Connect WalletConnect");
                setShowWalletDialog(false);
              }}
            >
              <div className="w-6 h-6 rounded bg-[#3B99FC] flex items-center justify-center">
                <span className="text-white font-bold text-xs">W</span>
              </div>
              <span className="text-base">Wallet Connect</span>
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">
              Powered by Privy
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
