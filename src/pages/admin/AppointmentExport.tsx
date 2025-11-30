import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const agents = [
  "All Agent",
  "Adel Razzaq",
  "Admin Admin",
  "Sarah Johnson",
  "Mike Davis",
  "Jennifer Smith"
];

const departments = [
  "All Department",
  "Sales",
  "Service",
  "Parts",
  "SZS",
  "BDC"
];

const dealers = [
  "All Dealer",
  "Navarre Chevrolet & Cadillac",
  "Navarre Honda",
  "BMW MINI of Sterling",
  "Downtown Toyota",
  "Augusta Mitsubishi",
  "All American Chevrolet",
  "Daytona Kia"
];

export default function AppointmentExport() {
  const [selectedAgent, setSelectedAgent] = useState("All Agent");
  const [selectedDepartment, setSelectedDepartment] = useState("All Department");
  const [selectedDealer, setSelectedDealer] = useState("All Dealer");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleExport = () => {
    // In a real application, this would generate and download an .xlsx file
    console.log("Exporting data with filters:", {
      agent: selectedAgent,
      department: selectedDepartment,
      dealer: selectedDealer,
      dateRange: dateRange
    });
    
    // Simulate export
    alert("Export functionality will generate an .xlsx file with the selected filters");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Appointment / Follow Up Export</CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              Dashboard / Appointment Export
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agent-filter">All Agent</Label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger id="agent-filter" data-testid="select-agent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent} value={agent}>
                      {agent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department-filter">All Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger id="department-filter" data-testid="select-department">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dealer-filter">All Dealer</Label>
              <Select value={selectedDealer} onValueChange={setSelectedDealer}>
                <SelectTrigger id="dealer-filter" data-testid="select-dealer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dealers.map((dealer) => (
                    <SelectItem key={dealer} value={dealer}>
                      {dealer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Select Date Range to Filter Appointments</Label>
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-gray-100 text-gray-600"
                    data-testid="button-date-range"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MM/dd/yyyy")} - {format(dateRange.to, "MM/dd/yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "MM/dd/yyyy")
                      )
                    ) : (
                      "Select Date Range to Filter Appointments"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-export"
            >
              Export
            </Button>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
