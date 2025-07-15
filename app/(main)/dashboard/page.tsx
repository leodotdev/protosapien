"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Wallet, Check } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

export default function DashboardPage() {
  const chartData = [{ trust: 78 }];
  
  const chartConfig = {
    trust: {
      label: "Trust",
      color: "#A3E635",
    },
  } satisfies ChartConfig;
  return (
    <div className="flex-1">
      {/* Main 2-column grid layout */}
      <div className="lg:grid lg:grid-cols-2">
        {/* 1. Total approved and pending tokens section */}
        <div className="border-b lg:border-r border-border">
          <div className="px-7 pt-12 pb-12">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-[14px] leading-[18px] text-muted-foreground mb-4">Total approved tokens</h2>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[30px] leading-[36px] font-bold">3.45</span>
                  <span className="text-[14px] leading-[18px] text-muted-foreground font-mono font-normal">$SAPIEN</span>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-[2px] text-[14px] leading-[18px] font-mono font-normal bg-[#A3E635] text-black">
                  +3.21 this week
                </span>
              </div>
              <div>
                <h2 className="text-[14px] leading-[18px] text-muted-foreground mb-4">Pending tokens</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-[30px] leading-[36px] font-bold">.205560</span>
                  <span className="text-[14px] leading-[18px] text-muted-foreground font-mono font-normal">milisapiens</span>
                </div>
              </div>
            </div>
            
            {/* Tokens expiring soon alert */}
            <Alert className="bg-[rgb(250_250_250_/_8%)] dark:bg-[rgb(17_17_17_/_8%)] border-border">
              <AlertTitle className="text-[14px] leading-[18px] font-bold mb-2">Tokens expiring soon!</AlertTitle>
              <AlertDescription className="space-y-2">
                <p className="text-[14px] leading-[18px] text-muted-foreground">
                  Congrats early sapien, points campaign has now concluded. Read more
                </p>
                <p className="text-[14px] leading-[18px] text-muted-foreground">
                  Airdrop ends in 12 days
                </p>
                <p className="text-[14px] leading-[18px] text-muted-foreground mb-4">
                  Tokenomics whitepaper
                </p>
                <Button className="rounded-[2px] w-full" size="sm">
                  Claim now
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* 4. Social media integration section */}
        <div className="border-b border-border">
          <div className="px-7 pt-12 pb-12">
            <h3 className="text-[14px] leading-[18px] font-bold mb-2">Social media integration</h3>
            <p className="text-[14px] leading-[18px] text-muted-foreground mb-6">
              Connect your social media to earn more points
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo-twitter.svg"
                    alt="Twitter"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-[14px] leading-[18px]">Twitter</span>
                </div>
                <span className="text-[14px] leading-[18px] text-muted-foreground">✓ Connected</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo-telegram.svg"
                    alt="Telegram"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-[14px] leading-[18px]">Telegram</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-[2px] text-[14px] leading-[18px] font-mono font-normal bg-[#A3E635] text-black">
                    +.01 milisapien
                  </span>
                  <Button variant="outline" size="sm" className="rounded-[2px]">
                    Connect
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo-linkedin.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-[14px] leading-[18px]">LinkedIn</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-[2px] text-[14px] leading-[18px] font-mono font-normal bg-[#A3E635] text-black">
                    +.01 milisapien
                  </span>
                  <Button variant="outline" size="sm" className="rounded-[2px]">
                    Connect
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo-facebook.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-[14px] leading-[18px]">Facebook</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-[2px] text-[14px] leading-[18px] font-mono font-normal bg-[#A3E635] text-black">
                    +.01 milisapien
                  </span>
                  <Button variant="outline" size="sm" className="rounded-[2px]">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Breakdown + Bonus multiplier section (combined) */}
        <div className="border-b lg:border-r border-border">
          <div className="px-7 pt-12 pb-12">
            {/* Breakdown section */}
            <h3 className="text-[14px] leading-[18px] font-bold mb-2">Breakdown</h3>
            <p className="text-[14px] leading-[18px] text-muted-foreground mb-8">
              Your distribution across different activities
            </p>
            
            <div className="space-y-4 mb-12">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] leading-[18px] text-muted-foreground">Tasks</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[30px] leading-[36px] font-bold">2.87</span>
                  <span className="text-[14px] leading-[18px] text-muted-foreground font-mono font-normal">$SAPIEN</span>
                </div>
              </div>
              
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] leading-[18px] text-muted-foreground">Referrals</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[30px] leading-[36px] font-bold">12.50</span>
                  <span className="text-[14px] leading-[18px] text-muted-foreground font-mono font-normal">$SAPIEN</span>
                </div>
              </div>
              
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] leading-[18px] text-muted-foreground">Bonus</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[30px] leading-[36px] font-bold">1.45</span>
                  <span className="text-[14px] leading-[18px] text-muted-foreground font-mono font-normal">$SAPIEN</span>
                </div>
              </div>
              
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] leading-[18px] text-muted-foreground">Misc</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[30px] leading-[36px] font-bold">.09002</span>
                  <span className="text-[14px] leading-[18px] text-muted-foreground font-mono font-normal">milisapiens</span>
                </div>
              </div>
            </div>

            {/* Bonus multiplier section */}
            <h3 className="text-[14px] leading-[18px] font-bold mb-2">Bonus multiplier</h3>
            <p className="text-[14px] leading-[18px] text-muted-foreground mb-8">
              Your bonus multiplier distribution across different activities
            </p>
            
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] leading-[18px] text-muted-foreground">Performance</span>
                <span className="text-[30px] leading-[36px] font-bold">0.25x</span>
              </div>
              
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] leading-[18px] text-muted-foreground">Collateral</span>
                <span className="text-[30px] leading-[36px] font-bold">0.25x</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Wallet management + Worldcoin section (combined) */}
        <div className="border-b border-border">
          <div className="px-7 pt-12 pb-12">
            {/* Wallet management section */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-[14px] leading-[18px] font-bold mb-2">Wallet management</h3>
                <p className="text-[14px] leading-[18px] text-muted-foreground">
                  Select your connected wallet and manage your account by linking or unlinking external wallets.
                </p>
              </div>
              <Button className="rounded-[2px] bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
                Link wallet
              </Button>
            </div>

            <div className="bg-muted/20 border border-border rounded-[2px] p-6 mb-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#A3E635] rounded-[2px] flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-[14px] leading-[18px] font-normal font-mono mb-1">0x09…d1cA</p>
                    <p className="text-[14px] leading-[18px] text-muted-foreground">Privy Valet</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[14px] leading-[18px] mb-1"><span className="font-bold">12.00</span> <span className="font-mono font-normal">$SAPIEN</span></p>
                  <p className="text-[14px] leading-[18px] text-muted-foreground">Balance</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4" />
                  <span className="text-[14px] leading-[18px]">Embedded</span>
                </div>
              </div>
            </div>

            {/* Worldcoin section */}
            <h3 className="text-[14px] leading-[18px] font-bold mb-2">Worldcoin</h3>
            <p className="text-[14px] leading-[18px] text-muted-foreground mb-6">
              Connect your worldcoin account to earn extra points
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/logo-worldcoin.svg"
                alt="Worldcoin"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <Button variant="outline" size="sm" className="rounded-[2px]">
                Connect Worldcoin
              </Button>
            </div>
          </div>
        </div>

        {/* 3. Referrals section */}
        <div className="border-b lg:border-r lg:border-b-0 border-border">
          <div className="px-7 pt-12 pb-12">
            <h3 className="text-[14px] leading-[18px] font-bold mb-2">Referrals</h3>
            <p className="text-[14px] leading-[18px] text-muted-foreground mb-1">
              Share your unique link and when referrals meet quality standards, you both earn rewards!
            </p>
            <p className="text-[14px] leading-[18px] text-muted-foreground mb-6">
              Earn <span className="font-mono font-normal">.05 milisapiens</span> for their first validated tag.
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <input
                type="text"
                value="https://www.game.sapien..156990ai"
                readOnly
                className="flex-1 px-4 py-2 bg-muted border border-border rounded-[2px] font-mono font-normal text-[14px] leading-[18px]"
              />
              <Button variant="secondary" size="sm" className="rounded-[2px] bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
                <Copy className="w-4 h-4 mr-2" />
                Copy link
              </Button>
            </div>

            <h4 className="text-[14px] leading-[18px] font-bold mb-2">Your referrals</h4>
            <p className="text-[12px] leading-[16px] text-muted-foreground mb-4">
              Referral points may take up to two weeks to appear due to Quality Assurance (QA) review.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-[12px] leading-[16px] text-muted-foreground mb-1">Tokens earned</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[14px] leading-[18px] font-bold">2.00</span>
                  <span className="text-[12px] leading-[16px] text-muted-foreground font-mono font-normal">$SAPIEN</span>
                </div>
              </div>
              <div>
                <p className="text-[12px] leading-[16px] text-muted-foreground mb-1">Active referrals</p>
                <p className="text-[14px] leading-[18px] font-bold">3</p>
              </div>
              <div>
                <p className="text-[12px] leading-[16px] text-muted-foreground mb-1">Invites sent</p>
                <p className="text-[14px] leading-[18px] font-bold">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Trust score section */}
        <div className="border-b lg:border-b-0 border-border">
          <div className="px-7 pt-12 pb-12">
            <div className="flex gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-[2px] text-[12px] leading-[16px] font-mono font-normal bg-[#A3E635] text-black">
                    MID-TRUST
                  </span>
                  <h3 className="text-[14px] leading-[18px] font-bold">Trust score</h3>
                </div>
                <p className="text-[14px] leading-[18px] text-muted-foreground mb-8">
                  To ensure all tasks remain available, you must maintain a score above 50%. Falling below this threshold may result in restricted access to certain tasks or features. Keep your score up by completing assignments accurately.
                </p>
                
                <div className="mb-8">
                  <button className="text-[14px] leading-[18px] text-foreground hover:text-primary transition-colors cursor-pointer">
                    Learn how to improve your score
                  </button>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="rounded-[2px]">
                    Tag accuracy
                  </Button>
                  <Button variant="outline" className="rounded-[2px]">
                    Skills test
                  </Button>
                </div>
              </div>

              <div className="w-[250px] hidden lg:block">
                <ChartContainer config={chartConfig} className="w-full h-[250px]">
                  <RadialBarChart
                    data={chartData}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={80}
                    outerRadius={110}
                  >
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) - 16}
                                  className="fill-foreground text-[30px] leading-[36px] font-bold"
                                >
                                  78%
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 8}
                                  className="fill-muted-foreground text-[14px] leading-[18px]"
                                >
                                  Avg score
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                    <RadialBar
                      dataKey="trust"
                      cornerRadius={10}
                      fill="#A3E635"
                      className="stroke-transparent stroke-2"
                    />
                  </RadialBarChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}