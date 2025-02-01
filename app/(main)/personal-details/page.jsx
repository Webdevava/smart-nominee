import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FamilyMembersList from "./family-details";

function PersonalDetails() {
  return (
    <Card className="p-4 bg-muted border-0 shadow-none ">
      <Tabs
        defaultValue="FamilyDetails"
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
            <FamilyMembersList/>
          </div>
        </TabsContent>
        <TabsContent value="FinancialDetails" className="flex-1">
          <div className="h-full"></div>
        </TabsContent>
        <TabsContent value="InsuranceDetails" className="flex-1">
          <div className="h-full"></div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}


export default PersonalDetails