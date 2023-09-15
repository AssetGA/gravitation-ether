"use client";

import {
  createCampaign,
  dashboard,
  report,
  payment,
  profile,
  withdraw,
  funded,
  rocket,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "funded projects",
    imgUrl: funded,
    link: "/fund",
  },
  {
    name: "add project",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "voting",
    imgUrl: rocket,
    link: "/voting",
  },
  {
    name: "token-sale",
    imgUrl: payment,
    link: "/token-sale",
  },
  {
    name: "report",
    imgUrl: report,
    link: "/reports",
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/withdraw",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
];

export const analytics = [
  {
    name: "Project analysis",
    link: "/project-analysis",
  },
  {
    name: "Bitcoin blockchain analysis",
    link: "/bitcoin-analysis",
  },
  {
    name: "Ethereum blockchain analysis",
    link: "/ethereum-analysis",
  },
  {
    name: "Tracking Large Accounts",
    link: "/account-control",
  },
  {
    name: "Stock Market Analytics",
    link: "/stock-analysis",
  },
  {
    name: "Analysis of DEFI markets",
    link: "/defi-analysis",
  },
  {
    name: "Functional diagnostics of the industry",
    link: "/industry-diagnostic",
  },
  {
    name: "Statistic info",
    link: "/statistic",
  },
  {
    name: "Technologies",
    link: "/technologies",
  },
];

export const votingLinks = [
  {
    name: "financing projects proposed by participants at the GAS-space level",
    link: "/gas-space-projects",
  },
  {
    name: "financing projects over 20% of DIGO's capital value",
    link: "/twenty-projects",
  },
  {
    name: "voting on profit sharing",
    link: "/profit-voting",
  },
  {
    name: "financing of DIGO GRAVITATION-ETHER projects",
    link: "/digo-projects",
  },
];
