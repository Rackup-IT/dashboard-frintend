import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export default function RCAgentActivity() {
  const [selectedAgent, setSelectedAgent] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [entriesPerPage, setEntriesPerPage] = useState("100");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Sample agents list
  const agents = [
    "John Smith",
    "Sarah Johnson", 
    "Mike Wilson",
    "Lisa Brown",
    "David Miller"
  ];

  // Empty data array to match the screenshot's empty state
  const activityData: any[] = [];

  const formatDateRange = () => {
    if (!dateRange?.from) {
      return "Select Date Range to Filter Appointments";
    }
    if (dateRange.from && !dateRange.to) {
      return format(dateRange.from, "PPP");
    }
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`;
    }
    return "Select Date Range to Filter Appointments";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            <div>
              <CardTitle>RC - Agent Activity</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / RC - Agent Activity
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Filter Controls */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label className="text-sm">Agents</Label>
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger className="mt-1">
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
              
              <div className="flex-1">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-10 mt-6"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span className="text-gray-500">{formatDateRange()}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
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
                <SelectTrigger className="w-20">
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
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">First Dial</TableHead>
                    <TableHead className="text-center">Last Dial</TableHead>
                    <TableHead className="text-center">Time Active</TableHead>
                    <TableHead className="text-center">10 Minutes Gap</TableHead>
                    <TableHead className="text-center">10 Min* Gap</TableHead>
                    <TableHead className="text-center">5-10 Min* Gap</TableHead>
                    <TableHead className="text-center">Total Gap</TableHead>
                    <TableHead className="text-center">On Phone</TableHead>
                    <TableHead className="text-center">Off Phone</TableHead>
                    <TableHead className="text-center">Total Calls</TableHead>
                    <TableHead className="text-center">Call Gaps</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-8 text-gray-500">
                        Please select Agent and Date Range to see Lead Log
                      </TableCell>
                    </TableRow>
                  ) : (
                    activityData.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">{activity.date}</TableCell>
                        <TableCell className="text-center">{activity.firstDial}</TableCell>
                        <TableCell className="text-center">{activity.lastDial}</TableCell>
                        <TableCell className="text-center">{activity.timeActive}</TableCell>
                        <TableCell className="text-center">{activity.tenMinutesGap}</TableCell>
                        <TableCell className="text-center">{activity.tenMinGap}</TableCell>
                        <TableCell className="text-center">{activity.fiveToTenMinGap}</TableCell>
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
                  className="text-gray-400"
                >
                  Previous
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={true}
                  className="text-gray-400"
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