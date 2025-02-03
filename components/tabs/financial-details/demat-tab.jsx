import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileDown, PenLine, PlusCircle, Trash } from "lucide-react"
import AddDematAccountDialog from "@/components/dialogs/add-demat-account"

const dematAccounts = [
  {
    name: "CDSL",
    details: [
      { label: "Depository Participant Name", value: "Zerodha Broking Ltd" },
      { label: "Account Number / BOID", value: "123456789123456" },
      { label: "Linked Bank Account", value: "123467891245" },
      { label: "Unique Client Code", value: "123456794512" },
      { label: "DP ID", value: "124560321" },
      { label: "PAN Card Number", value: "234567890" },
      { label: "Account Type", value: "Individual" },
      { label: "Interest Rate", value: "5.6%" },
    ],
    nominees: [
      { name: "Mike Deo", relationship: "Father", percentage: "25%", contact: "1234567890" },
      { name: "Sarah Deo", relationship: "Mother", percentage: "25%", contact: "0987654321" },
    ],
  },
]

const DematAccountCard = ({ account }) => (
  <Card className="p-0">
    <CardHeader>
      <h1 className="text-lg font-semibold">{account.name}</h1>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {account.details.map((item, index) => (
          <div key={index} className="bg-popover p-2 rounded-lg">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-semibold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-popover rounded-lg p-4 mt-6">
        <div className="rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-background rounded-lg">
              <TableRow>
                <TableHead>Nominee</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Contact No</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {account.nominees.map((nominee, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{nominee.name}</TableCell>
                  <TableCell>{nominee.relationship}</TableCell>
                  <TableCell>{nominee.percentage}</TableCell>
                  <TableCell>{nominee.contact}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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

const DematAccountTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="p-2 sm:p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">Total Demat Accounts ({dematAccounts.length})</h1>
        <Button className="w-full sm:w-auto" onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Demat Account
        </Button>
      </div>
      <AddDematAccountDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="space-y-6">
        {dematAccounts.map((account, index) => (
          <DematAccountCard key={index} account={account} />
        ))}
      </div>
    </div>
  )
}

export default DematAccountTab

