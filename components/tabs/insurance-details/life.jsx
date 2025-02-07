import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileDown, PenLine, PlusCircle, Trash } from "lucide-react"
import AddLifeInsuranceDialog from "@/components/dialogs/add-life-insurance"

const lifeInsurances = [
  {
    name: "Term life insurance",
    owner: "Father",
    details: [
      { label: "Policy Type", value: "Whole Life" },
      { label: "Policy Number", value: "123456" },
      { label: "Insurance Provider Name", value: "LIC" },
      { label: "Premium Amount (INR)", value: "1,50,000" },
      { label: "Sum Assured Amount (INR)", value: "5,50,50,000" },
      { label: "Policy Term", value: "10 Years" },
      { label: "Policy Start Date", value: "12/12/2023" },
      { label: "Policy Maturity Date", value: "12/12/2027" },
      { label: "Linked Phone Number", value: "1234567890" },
      { label: "Coverage Details", value: "Accidents, Theft, Natural Disasters" },
    ],
    nominees: [
      { name: "Mike Deo", relationship: "Father", percentage: "25%", contact: "1234567890" },
      { name: "Sarah Deo", relationship: "Mother", percentage: "25%", contact: "0987654321" },
      { name: "Jenny Deo", relationship: "Sister", percentage: "25%", contact: "1122334455" },
    ],
  },
]

const LifeInsuranceCard = ({ insurance }) => (
  <Card className="p-0">
    <CardHeader>
      <h1 className="text-lg font-semibold">{insurance.name}</h1>
      <p className="text-sm text-muted-foreground">Owner: {insurance.owner}</p>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {insurance.details.map((item, index) => (
          <div key={index} className="bg-popover p-2 rounded-lg">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-semibold mt-2 truncate">{item.value}</p>
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
              {insurance.nominees.map((nominee, index) => (
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
        LICPolicy.Pdf
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

const LifeInsuranceTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="p-2 sm:p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">Total Life Insurance ({lifeInsurances.length})</h1>
        <Button className="w-full sm:w-auto" onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Insurance
        </Button>
      </div>
      <AddLifeInsuranceDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="space-y-6">
        {lifeInsurances.map((insurance, index) => (
          <LifeInsuranceCard key={index} insurance={insurance} />
        ))}
      </div>
    </div>
  )
}

export default LifeInsuranceTab

