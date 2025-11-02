import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar as CalendarIcon, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export default function RCAgentActivity() {
  const [selectedAgent, setSelectedAgent] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [entriesPerPage, setEntriesPerPage] = useState("100");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Sample agents list
  const agents = [
    "Adel Razzaq",
    "Admin Admin",
    "Sarah Johnson", 
    "Mike Davis",
    "Jennifer Smith"
  ];

  // Empty data array to match the screenshot's empty state
  const activityData: any[] = [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>RC - Agent Activity</CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              Dashboard / RC - Agent Activity
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agent-select">Agents</Label>
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger id="agent-select" data-testid="select-agent">
                    <SelectValue placeholder="Select Agent" />
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
                <Label>Select Date Range to Filter Appointments</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
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
                        <span className="text-gray-500">Select Date Range to Filter Appointments</span>
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

            {/* Entries Control */}
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-20" data-testid="select-entries">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm">entries</span>
            </div>

            {/* Data Table */}
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-center font-semibold">
                      <div className="flex items-center justify-center gap-1">
                        Date
                        <ArrowDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      <div className="flex items-center justify-center gap-1">
                        First Dat
                        <ArrowDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      <div className="flex items-center justify-center gap-1">
                        Last Dial
                        <ArrowDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold">Time Active</TableHead>
                    <TableHead className="text-center font-semibold">10 Minutes Gap</TableHead>
                    <TableHead className="text-center font-semibold">10 Min+ Gap</TableHead>
                    <TableHead className="text-center font-semibold">5-10 Mins Gap</TableHead>
                    <TableHead className="text-center font-semibold">Total Gap</TableHead>
                    <TableHead className="text-center font-semibold">
                      <div className="flex items-center justify-center gap-1">
                        On Phone
                        <ArrowDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold">Off Phone</TableHead>
                    <TableHead className="text-center font-semibold">
                      <div className="flex items-center justify-center gap-1">
                        Total Calls
                        <ArrowDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold">Call Gaps</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-8 text-gray-500">
                        Please select Agent and Date Range to see User's Log
                      </TableCell>
                    </TableRow>
                  ) : (
                    activityData.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">{activity.date}</TableCell>
                        <TableCell className="text-center">{activity.firstDat}</TableCell>
                        <TableCell className="text-center">{activity.lastDial}</TableCell>
                        <TableCell className="text-center">{activity.timeActive}</TableCell>
                        <TableCell className="text-center">{activity.tenMinutesGap}</TableCell>
                        <TableCell className="text-center">{activity.tenMinPlusGap}</TableCell>
                        <TableCell className="text-center">{activity.fiveToTenMinsGap}</TableCell>
                        <TableCell className="text-center">{activity.totalGap}</TableCell>
                        <TableCell className="text-center">{activity.onPhone}</TableCell>
                        <TableCell className="text-center">{activity.offPhone}</TableCell>
                        <TableCell className="text-center">{activity.totalCalls}</TableCell>
                        <TableCell className="text-center">{activity.callGaps}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing 0 to 0 of 0 entries
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={true}
                  data-testid="button-previous"
                >
                  Previous
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={true}
                  data-testid="button-next"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
