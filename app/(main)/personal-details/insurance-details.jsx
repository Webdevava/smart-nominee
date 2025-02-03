import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LifeInsuranceTab from '@/components/tabs/insurance-details/life';
import HealthInsuranceTab from '@/components/tabs/insurance-details/health';
import VehicleInsuranceTab from '@/components/tabs/insurance-details/vehicle';
import PropertyInsuranceTab from '@/components/tabs/insurance-details/property';
import TravelInsuranceTab from '@/components/tabs/insurance-details/travel';

const InsuranceDetails = () => {
  return (
    <div>
      <Tabs
        defaultValue="LifeInsurance"
        className="w-full h-full flex flex-col p-0 gap-0 mt-4"
      >
        <div className="rounded-lg p-0">
          <TabsList className="bg-muted w-full p-0 m-0 shadow-none rounded-none flex items-center justify-start">
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="LifeInsurance"
            >
              Life Insurance
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="HealthInsurance"
            >
              Health Insurance
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="VehicleInsurance"
            >
              Vehicle Insurance
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="PropertyInsurance"
            >
              Property Insurance
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="TravelInsurance"
            >
              Travel Insurance
            </TabsTrigger>
          </TabsList>
        </div>
        <div className='bg-popover rounded-lg'>
          <TabsContent value="LifeInsurance" className="flex-1">
            <div className="h-full bg-popover rounded-lg p-2">
              <LifeInsuranceTab/>
            </div>
          </TabsContent>
          <TabsContent value="HealthInsurance" className="flex-1">
            <div className="h-full bg-popover rounded-lg p-2">
             <HealthInsuranceTab/>
            </div>
          </TabsContent>
          <TabsContent value="VehicleInsurance" className="flex-1">
            <div className="h-full bg-popover rounded-lg p-2">
             <VehicleInsuranceTab/>
            </div>
          </TabsContent>
          <TabsContent value="PropertyInsurance" className="flex-1">
            <div className="h-full bg-popover rounded-lg p-2">
              <PropertyInsuranceTab/>
            </div>
          </TabsContent>
          <TabsContent value="TravelInsurance" className="flex-1">
            <div className="h-full bg-popover rounded-lg p-2">
             <TravelInsuranceTab/>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default InsuranceDetails