import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Eye, FileDown, PenLine, PlusCircle, Trash } from "lucide-react"
import AddStockDialog from "@/components/dialogs/add-stock"

const stocks = [
  {
    name: "TCS",
    details: [
      { label: "Stock Exchange", value: "BSE" },
      { label: "Quantity", value: "1000" },
      { label: "Purchase Price (INR)", value: "700" },
      { label: "Purchase Date", value: "12/12/2023" },
      { label: "Current Price (INR)", value: "1200" },
      { label: "Total Investment (INR)", value: "2,00,000" },
      { label: "Broker Name", value: "Zerodha" },
      { label: "Demat Account Linked", value: "Zerodha - 12345678" },
    ],
  },
  {
    name: "TATA Motor",
    details: [
      { label: "Stock Exchange", value: "BSE" },
      { label: "Quantity", value: "1000" },
      { label: "Purchase Price (INR)", value: "700" },
      { label: "Purchase Date", value: "12/12/2023" },
      { label: "Current Price (INR)", value: "1200" },
      { label: "Total Investment (INR)", value: "2,00,000" },
      { label: "Broker Name", value: "Zerodha" },
      { label: "Demat Account Linked", value: "Zerodha - 12345678" },
    ],
  },
]

const StockCard = ({ stock }) => (
  <Card className="p-0">
    <CardHeader>
      <h1 className="text-lg font-semibold">{stock.name}</h1>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stock.details.map((item, index) => (
          <div key={index} className="bg-popover p-2 rounded-lg">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-semibold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="border-t p-2 justify-between">
      <div className="bg-background/85 text-xs p-2 rounded-lg flex gap-3 items-center w-60 justify-between">
        Doc.pdf
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <FileDown className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <PenLine className="h-4 w-4 text-foreground" />
        </Button>
        <Button variant="outline" size="icon">
          <Trash className="h-4 w-4 text-foreground" />
        </Button>
      </div>
    </CardFooter>
  </Card>
)

const StockTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="p-2 sm:p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">Total Stocks ({stocks.length})</h1>
        <Button className="w-full sm:w-auto" onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Stock
        </Button>
      </div>
      <AddStockDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="space-y-6">
        {stocks.map((stock, index) => (
          <StockCard key={index} stock={stock} />
        ))}
      </div>
    </div>
  )
}

export default StockTab

