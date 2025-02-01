import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { PenBox, Trash } from "lucide-react";

const SidebarContactCard = () => {
  return (
    <Card className="p-0 text-sm shadow-none">
      <CardHeader className="flex flex-row items-center justify-between p-2">
        <span className="font-bold">Contact 1</span>
        <span className="flex gap-2">
          <Button variant="outline" className="size-6 p-0 bg-transparent">
            <PenBox />
          </Button>
          <Button variant="outline" className="size-6 p-0 bg-transparent">
            <Trash />
          </Button>
        </span>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4 p-2">
        <div className="flex flex-col flex-1">
          <span className="opacity-50">Phone Number</span>
          <span className="text-primary font-semibold">8978564523</span>
        </div>
        <div className="flex flex-col flex-1">
          <span className="opacity-50">Email</span>
          <span className="text-primary font-semibold">8978564523</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SidebarContactCard;
