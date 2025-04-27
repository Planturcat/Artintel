import React from "react";
import Wrapper from "@/components/global/wrapper";
import AnimationContainer from "@/components/global/animation-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  RefreshCcw,
  Server,
  Database,
  Globe,
  Shield,
  Cpu,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "System Status | Artintel",
  description: "Check the current status of Artintel services and view recent incidents and maintenance events.",
};

// Custom StatusHero component
const StatusHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
      </div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="h-full w-full grid grid-cols-12 grid-rows-6">
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} className="border border-primary/20" />
          ))}
        </div>
      </div>

      <Wrapper className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary">
            <Server className="mr-1 h-3 w-3" />
            <span>System Status</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Artintel{" "}
            <span className="text-primary">Status</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Check the current status of Artintel services and view recent incidents and maintenance events.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-card/50 border border-border/80 rounded-lg p-6 flex items-center gap-4">
              <div className="p-2 rounded-full bg-green-500/10">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold">All Systems Operational</h2>
                <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-full flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              <span>Refresh Status</span>
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Custom StatusCard component
const StatusCard = ({
  title,
  status,
  icon: Icon,
  description,
}: {
  title: string;
  status: "operational" | "degraded" | "outage" | "maintenance";
  icon: React.ElementType;
  description?: string;
}) => {
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "operational":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          label: "Operational",
        };
      case "degraded":
        return {
          icon: AlertTriangle,
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          label: "Degraded Performance",
        };
      case "outage":
        return {
          icon: XCircle,
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          label: "Service Outage",
        };
      case "maintenance":
        return {
          icon: Clock,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          label: "Scheduled Maintenance",
        };
      default:
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          label: "Operational",
        };
    }
  };

  const statusDetails = getStatusDetails(status);
  const StatusIcon = statusDetails.icon;

  return (
    <Card className="bg-card/50 border border-border/80">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
          <div className={`flex items-center gap-2 ${statusDetails.color}`}>
            <div className={`p-1 rounded-full ${statusDetails.bgColor}`}>
              <StatusIcon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{statusDetails.label}</span>
          </div>
        </div>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      )}
    </Card>
  );
};

// Custom IncidentCard component
const IncidentCard = ({
  title,
  date,
  status,
  description,
  updates,
}: {
  title: string;
  date: string;
  status: "resolved" | "investigating" | "monitoring" | "identified";
  description: string;
  updates: { time: string; message: string }[];
}) => {
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "resolved":
        return {
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          label: "Resolved",
        };
      case "investigating":
        return {
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          label: "Investigating",
        };
      case "monitoring":
        return {
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          label: "Monitoring",
        };
      case "identified":
        return {
          color: "text-orange-500",
          bgColor: "bg-orange-500/10",
          label: "Identified",
        };
      default:
        return {
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          label: "Resolved",
        };
    }
  };

  const statusDetails = getStatusDetails(status);

  return (
    <Card className="bg-card/50 border border-border/80">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">{date}</div>
          <Badge className={`${statusDetails.bgColor} ${statusDetails.color} border-none`}>
            {statusDetails.label}
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Updates:</h4>
          <div className="space-y-4">
            {updates.map((update, index) => (
              <div key={index} className="border-l-2 border-primary/30 pl-4">
                <div className="text-xs text-muted-foreground mb-1">{update.time}</div>
                <p className="text-sm">{update.message}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Page Component
const StatusPage = () => {
  return (
    <>
      {/* Hero Section */}
      <StatusHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Service Status */}
        <AnimationContainer className="w-full">
          <h2 className="text-3xl font-bold mb-8">Service Status</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <StatusCard
              title="API Services"
              status="operational"
              icon={Server}
            />
            <StatusCard
              title="Web Dashboard"
              status="operational"
              icon={Globe}
            />
            <StatusCard
              title="Model Inference"
              status="operational"
              icon={Cpu}
            />
            <StatusCard
              title="Fine-Tuning Platform"
              status="operational"
              icon={Database}
            />
            <StatusCard
              title="Authentication Services"
              status="operational"
              icon={Shield}
            />
            <StatusCard
              title="Analytics & Monitoring"
              status="operational"
              icon={LineChart}
            />
          </div>
        </AnimationContainer>

        {/* Uptime */}
        <AnimationContainer className="w-full mt-20">
          <h2 className="text-3xl font-bold mb-8">Uptime</h2>
          <Card className="bg-card/50 border border-border/80">
            <CardHeader>
              <CardTitle>30-Day Uptime</CardTitle>
              <CardDescription>
                Historical uptime for Artintel services over the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Outages</TableHead>
                    <TableHead>Average Response Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">API Services</TableCell>
                    <TableCell>99.99%</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>87ms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Web Dashboard</TableCell>
                    <TableCell>99.98%</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>125ms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Model Inference</TableCell>
                    <TableCell>99.95%</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>210ms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fine-Tuning Platform</TableCell>
                    <TableCell>99.90%</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>350ms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Authentication Services</TableCell>
                    <TableCell>100.00%</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>95ms</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Recent Incidents */}
        <AnimationContainer className="w-full mt-20">
          <h2 className="text-3xl font-bold mb-8">Recent Incidents</h2>
          <div className="space-y-6">
            <IncidentCard
              title="Fine-Tuning Platform Degraded Performance"
              date="June 15, 2023"
              status="resolved"
              description="Some users experienced delays when submitting fine-tuning jobs due to increased load on our training infrastructure."
              updates={[
                {
                  time: "June 15, 2023 - 14:30 UTC",
                  message: "We are investigating reports of delays in the fine-tuning platform.",
                },
                {
                  time: "June 15, 2023 - 15:15 UTC",
                  message: "We have identified the issue as increased load on our training infrastructure. We are scaling up resources to address the problem.",
                },
                {
                  time: "June 15, 2023 - 16:45 UTC",
                  message: "Additional resources have been provisioned and the fine-tuning platform is now operating normally. We will continue to monitor the situation.",
                },
                {
                  time: "June 15, 2023 - 18:00 UTC",
                  message: "The issue has been fully resolved. We have implemented additional auto-scaling measures to prevent similar issues in the future.",
                },
              ]}
            />
            <IncidentCard
              title="Web Dashboard Temporary Outage"
              date="May 28, 2023"
              status="resolved"
              description="The web dashboard was unavailable for approximately 25 minutes due to a deployment issue."
              updates={[
                {
                  time: "May 28, 2023 - 09:15 UTC",
                  message: "We are investigating reports that the web dashboard is unavailable for some users.",
                },
                {
                  time: "May 28, 2023 - 09:25 UTC",
                  message: "We have identified the issue as a problem with our latest deployment. We are rolling back to the previous stable version.",
                },
                {
                  time: "May 28, 2023 - 09:40 UTC",
                  message: "The rollback has been completed and the web dashboard is now accessible again. We are monitoring the situation.",
                },
                {
                  time: "May 28, 2023 - 10:30 UTC",
                  message: "The issue has been fully resolved. We have implemented additional pre-deployment checks to prevent similar issues in the future.",
                },
              ]}
            />
          </div>
        </AnimationContainer>

        {/* Scheduled Maintenance */}
        <AnimationContainer className="w-full mt-20">
          <h2 className="text-3xl font-bold mb-8">Scheduled Maintenance</h2>
          <Card className="bg-card/50 border border-border/80">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">July 10, 2023 - 02:00 UTC to 04:00 UTC</div>
                <Badge className="bg-blue-500/10 text-blue-500 border-none">
                  Upcoming
                </Badge>
              </div>
              <CardTitle className="text-xl">Database Infrastructure Upgrade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We will be performing a scheduled upgrade to our database infrastructure to improve performance and reliability. During this time, the following services may experience brief interruptions:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                <li>Fine-Tuning Platform (potential delays in job submission)</li>
                <li>Analytics & Monitoring (data may be temporarily unavailable)</li>
              </ul>
              <p className="text-muted-foreground">
                API Services and Model Inference will remain fully operational throughout the maintenance window.
              </p>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Subscribe to Updates */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Subscribe to receive notifications about service incidents and scheduled maintenance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-full border border-border bg-background sm:min-w-[300px]"
                />
                <Button className="rounded-full">
                  Subscribe to Updates
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default StatusPage;
