import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// Sample call log data
const callLogData = [
  {
    id: 1,
    result: "Call connected",
    from: "+15105204306",
    to: "+15598247348",
    dateTime: "10/27/2025 10:55 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:28"
  },
  {
    id: 2,
    result: "Call connected",
    from: "+15105204306",
    to: "+15598247348",
    dateTime: "10/27/2025 10:53 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:14"
  },
  {
    id: 3,
    result: "Call connected",
    from: "+15103943218",
    to: "+19166086584",
    dateTime: "10/27/2025 10:52 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:05"
  },
  {
    id: 4,
    result: "Call connected",
    from: "+15103943218",
    to: "+19166086584",
    dateTime: "10/27/2025 10:52 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:07"
  },
  {
    id: 5,
    result: "Call connected",
    from: "+15103943218",
    to: "+17074700917",
    dateTime: "10/27/2025 10:51 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:12"
  },
  {
    id: 6,
    result: "Call connected",
    from: "+15103943218",
    to: "+17074700917",
    dateTime: "10/27/2025 10:50 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:36"
  },
  {
    id: 7,
    result: "Call connected",
    from: "+15103943218",
    to: "+14153072909",
    dateTime: "10/27/2025 10:49 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:29"
  },
  {
    id: 8,
    result: "Call connected",
    from: "+15103943218",
    to: "+14153072909",
    dateTime: "10/27/2025 10:48 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:36"
  },
  {
    id: 9,
    result: "Call connected",
    from: "+15103943218",
    to: "+14157131908",
    dateTime: "10/27/2025 10:48 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:07"
  },
  {
    id: 10,
    result: "Call connected",
    from: "+15103943218",
    to: "+14157131908",
    dateTime: "10/27/2025 10:48 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:07"
  },
  {
    id: 11,
    result: "Call connected",
    from: "+15103943218",
    to: "+15694259463",
    dateTime: "10/27/2025 10:47 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:05"
  },
  {
    id: 12,
    result: "Call connected",
    from: "+15103943218",
    to: "+15694259463",
    dateTime: "10/27/2025 10:47 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:04"
  },
  {
    id: 13,
    result: "Call connected",
    from: "+15103943218",
    to: "+14153838933",
    dateTime: "10/27/2025 10:46 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:12"
  },
  {
    id: 14,
    result: "Call connected",
    from: "+15103943218",
    to: "+14153838933",
    dateTime: "10/27/2025 10:45 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:37"
  },
  {
    id: 15,
    result: "Call connected",
    from: "+15103943218",
    to: "+14153838933",
    dateTime: "10/27/2025 10:45 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:18"
  },
  {
    id: 16,
    result: "Hang Up",
    from: "+15103943218",
    to: "+14152859713",
    dateTime: "10/27/2025 10:44 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:09"
  },
  {
    id: 17,
    result: "Hang Up",
    from: "+15103943218",
    to: "+14152859713",
    dateTime: "10/27/2025 10:44 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:09"
  },
  {
    id: 18,
    result: "Wrong Number",
    from: "+17577740170",
    to: "+17577455886",
    dateTime: "10/27/2025 10:41 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:00"
  },
  {
    id: 19,
    result: "Hang Up",
    from: "+15103943218",
    to: "+15107250869",
    dateTime: "10/27/2025 10:41 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:20"
  },
  {
    id: 20,
    result: "Hang Up",
    from: "+15103943218",
    to: "+15107250869",
    dateTime: "10/27/2025 10:40 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:22"
  },
  {
    id: 21,
    result: "Wrong Number",
    from: "+15103943218",
    to: "+19243859274",
    dateTime: "10/27/2025 10:40 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:00"
  },
  {
    id: 22,
    result: "Wrong Number",
    from: "+15103943218",
    to: "+19243859274",
    dateTime: "10/27/2025 10:40 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:00"
  },
  {
    id: 23,
    result: "Hang Up",
    from: "+15103943218",
    to: "+19255830265",
    dateTime: "10/27/2025 10:38 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:09"
  },
  {
    id: 24,
    result: "Hang Up",
    from: "+15103943218",
    to: "+19255830265",
    dateTime: "10/27/2025 10:38 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:19"
  },
  {
    id: 25,
    result: "Hang Up",
    from: "+15103943218",
    to: "+15408063246",
    dateTime: "10/27/2025 10:34 PM",
    action: "VoIP Call",
    direction: "Outbound",
    length: "00:02"
  }
];

export default function CallHistory() {
  const [recordsPerPage, setRecordsPerPage] = useState("25");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callDirection, setCallDirection] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // Applied filters state
  const [appliedRecordsPerPage, setAppliedRecordsPerPage] = useState("25");
  const [appliedPhoneNumber, setAppliedPhoneNumber] = useState("");
  const [appliedCallDirection, setAppliedCallDirection] = useState("All");
  const [appliedDate, setAppliedDate] = useState<Date | undefined>();

  const handleReset = () => {
    setRecordsPerPage("25");
    setPhoneNumber("");
    setCallDirection("All");
    setSelectedDate(undefined);
    setAppliedRecordsPerPage("25");
    setAppliedPhoneNumber("");
    setAppliedCallDirection("All");
    setAppliedDate(undefined);
  };

  const handleApply = () => {
    setAppliedRecordsPerPage(recordsPerPage);
    setAppliedPhoneNumber(phoneNumber);
    setAppliedCallDirection(callDirection);
    setAppliedDate(selectedDate);
  };

  const handleSyncTodayRecord = () => {
    console.log("Syncing today's records...");
  };

  // Filter call logs based on applied filters
  const filteredCallLogs = callLogData.filter(log => {
    const matchesPhone = appliedPhoneNumber === "" || 
      log.from.includes(appliedPhoneNumber) || 
      log.to.includes(appliedPhoneNumber);
    
    const matchesDirection = appliedCallDirection === "All" || 
      log.direction === appliedCallDirection;

    return matchesPhone && matchesDirection;
  });

  // Pagination
  const currentCallLogs = filteredCallLogs.slice(0, parseInt(appliedRecordsPerPage));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Call Logs</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Call Logs
              </div>
            </div>
            <Button 
              onClick={handleSyncTodayRecord}
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-sync-today-records"
            >
              Sync Today Records
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="records-per-page">Records Per Page</Label>
                <Select value={recordsPerPage} onValueChange={setRecordsPerPage}>
                  <SelectTrigger id="records-per-page" data-testid="select-records-per-page">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="75">75</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input
                  id="phone-number"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  data-testid="input-phone-number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="call-direction">Call Direction</Label>
                <Select value={callDirection} onValueChange={setCallDirection}>
                  <SelectTrigger id="call-direction" data-testid="select-call-direction">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Inbound">Inbound</SelectItem>
                    <SelectItem value="Outbound">Outbound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Dates</Label>
                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      data-testid="button-date-picker"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "MM/dd/yyyy")
                      ) : (
                        "Select Date"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Reset and Apply Buttons */}
            <div className="flex justify-end gap-2">
              <Button 
                onClick={handleReset}
                variant="outline"
                className="bg-red-500 hover:bg-red-600 text-white border-red-500"
                data-testid="button-reset"
              >
                Reset
              </Button>
              <Button 
                onClick={handleApply}
                className="bg-green-600 hover:bg-green-700 text-white"
                data-testid="button-apply"
              >
                Apply
              </Button>
            </div>

            {/* Data Table */}
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">S No.</TableHead>
                    <TableHead className="font-semibold">Result</TableHead>
                    <TableHead className="font-semibold">From</TableHead>
                    <TableHead className="font-semibold">To</TableHead>
                    <TableHead className="font-semibold">Date/Time</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                    <TableHead className="font-semibold">Direction</TableHead>
                    <TableHead className="font-semibold">Length</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentCallLogs.map((log, index) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">{index + 1}</TableCell>
                      <TableCell className="text-sm">{log.result}</TableCell>
                      <TableCell className="text-sm">
                        <a href="#" className="text-blue-600 hover:underline">
                          From : {log.from}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm">
                        <a href="#" className="text-blue-600 hover:underline">
                          To : {log.to}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm">{log.dateTime}</TableCell>
                      <TableCell className="text-sm">{log.action}</TableCell>
                      <TableCell className="text-sm">{log.direction}</TableCell>
                      <TableCell className="text-sm">{log.length}</TableCell>
                      <TableCell className="text-sm">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                          data-testid={`button-action-${log.id}`}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Info */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {currentCallLogs.length} of {filteredCallLogs.length} entries
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid="button-next"
                >
                  Next ›
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
