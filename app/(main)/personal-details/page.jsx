'use client'

import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FamilyMembersList from "./family-details";
import FinancialDetails from "./financial-details";
import InsuranceDetails from "./insurance-details";
import { useRouter, useSearchParams } from 'next/navigation';

function TabHandler({ children }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}

function TabContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentTab = searchParams.get('tab') || 'FamilyDetails';

  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <PersonalDetails currentTab={currentTab} onTabChange={handleTabChange} />
  );
}

function PersonalDetails({ currentTab, onTabChange }) {
  return (
    <Card className="p-4 bg-muted border-0 shadow-none">
      <Tabs
        value={currentTab}
        onValueChange={onTabChange}
        className="w-full h-full flex flex-col"
      >
        <div className="bg-popover rounded-lg p-2">
          <TabsList className="bg-popover">
            <TabsTrigger
              className="data-[state=active]:bg-foreground data-[state=active]:text-background"
              value="FamilyDetails"
            >
              Family Details
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-foreground data-[state=active]:text-background"
              value="FinancialDetails"
            >
              Financial Details
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-foreground data-[state=active]:text-background"
              value="InsuranceDetails"
            >
              Insurance Details
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="FamilyDetails" className="flex-1">
          <div className="h-full bg-popover rounded-lg">
            <FamilyMembersList />
          </div>
        </TabsContent>
        <TabsContent value="FinancialDetails" className="flex-1">
          <div className="h-full rounded-lg">
            <FinancialDetails />
          </div>
        </TabsContent>
        <TabsContent value="InsuranceDetails" className="flex-1">
          <div className="h-full rounded-lg">
            <InsuranceDetails />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default function PersonalDetailsWrapper() {
  return (
    <TabHandler>
      <TabContent />
    </TabHandler>
  );
}
