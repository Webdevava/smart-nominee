import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BankTab from '@/components/tabs/financial-details/bank-tab';
import FDRDTab from '@/components/tabs/financial-details/fdrd-tab';
import DematAccountTab from '@/components/tabs/financial-details/demat-tab';
import StockTab from '@/components/tabs/financial-details/stocks-tab';
import MutualFundsTab from '@/components/tabs/financial-details/mutual-funds-tab';

const FinancialDetails = () => {
  return (
    <div>

<Tabs
        defaultValue="Bank"
        className="w-full h-full flex flex-col p-0 gap-0 mt-4"
      >
        <div className=" rounded-lg p-0">
          <TabsList className="bg-muted w-full p-0 m-0 shadow-none rounded-none flex items-center justify-start">
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="Bank"
            >
              Bank
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="FD/RD"
            >
              FD/RD
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="DematAccount"
            >
              Demat Account
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="Stocks"
            >
              Stocks
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-popover data-[state=active]:text-primary rounded-xl rounded-b-none data-[state=active]:shadow-none translate-y-1 min-w-36 pb-3 pt-2"
              value="MutualFunds"
            >
              Mutual Funds
            </TabsTrigger>
          </TabsList>
        </div>
    <div className='bg-popover rounded-lg'>
    <TabsContent value="Bank" className="flex-1">
          <div className="h-full bg-popover rounded-lg p-2">
            <BankTab/>
          </div>
        </TabsContent>
        <TabsContent value="FD/RD" className="flex-1">
          <div className="h-full bg-popover rounded-lg p-2">
            
            <FDRDTab/>
          </div>
        </TabsContent>
        <TabsContent value="DematAccount" className="flex-1">
          <div className="h-full bg-popover rounded-lg p-2">
          <DematAccountTab/>
          </div>
        </TabsContent>
        <TabsContent value="Stocks" className="flex-1">
          <div className="h-full bg-popover rounded-lg p-2">
            <StockTab/>
          </div>
        </TabsContent>
        <TabsContent value="MutualFunds" className="flex-1">
          <div className="h-full bg-popover rounded-lg p-2">
          <MutualFundsTab/>
          </div>
        </TabsContent>
    </div>
      </Tabs>

    </div>
  )
}

export default FinancialDetails