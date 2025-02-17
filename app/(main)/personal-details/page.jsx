'use client'
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
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
  const currentTab = searchParams.get('tab');
  
  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <PersonalDetails currentTab={currentTab} onTabChange={handleTabChange} />
  );
}

function MobileNavigation({ currentTab, onTabChange }) {
  const router = useRouter();

  const getTabName = (tab) => {
    switch (tab) {
      case 'FamilyDetails':
        return 'Family Details';
      case 'FinancialDetails':
        return 'Financial Details';
      case 'InsuranceDetails':
        return 'Insurance Details';
      default:
        return '';
    }
  };

  const handleBack = () => {
    // Clear the tab parameter and return to base URL
    router.push('/personal-details');
  };

  // If no tab is selected, show the three buttons
  if (!currentTab) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <Button 
          className="w-full py-6 text-lg"
          onClick={() => onTabChange('FamilyDetails')}
        >
          Family Details
        </Button>
        <Button 
          className="w-full py-6 text-lg"
          onClick={() => onTabChange('FinancialDetails')}
        >
          Financial Details
        </Button>
        <Button 
          className="w-full py-6 text-lg"
          onClick={() => onTabChange('InsuranceDetails')}
        >
          Insurance Details
        </Button>
      </div>
    );
  }

  // If a tab is selected, show the content with back button
  return (
    <div>
      <div className="flex items-center mb-4 bg-popover p-4">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center hover:bg-accent rounded-lg p-2"
        >
          <ChevronLeft className="" size={20} />
        </button>
        <span className="ml-2 text-md font-medium">{getTabName(currentTab)}</span>
      </div>
      <div className="h-full px-3">
        {currentTab === 'FamilyDetails' && <FamilyMembersList />}
        {currentTab === 'FinancialDetails' && <FinancialDetails />}
        {currentTab === 'InsuranceDetails' && <InsuranceDetails />}
      </div>
    </div>
  );
}

function PersonalDetails({ currentTab, onTabChange }) {
  return (
    <Card className="p-0 lg:p-4 bg-muted border-0 shadow-none rounded-2xl min-h-full">
      {/* Mobile/Tablet View */}
      <div className="lg:hidden">
        <MobileNavigation currentTab={currentTab} onTabChange={onTabChange} />
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <Tabs
          value={currentTab || 'FamilyDetails'}
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
            <div className="h-full bg-popover rounded-lg mt-4">
              <FamilyMembersList />
            </div>
          </TabsContent>
          <TabsContent value="FinancialDetails" className="flex-1">
            <div className="h-full rounded-lg mt-4">
              <FinancialDetails />
            </div>
          </TabsContent>
          <TabsContent value="InsuranceDetails" className="flex-1">
            <div className="h-full rounded-lg mt-4">
              <InsuranceDetails />
            </div>
          </TabsContent>
        </Tabs>
      </div>
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