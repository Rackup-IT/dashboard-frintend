import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Search } from "lucide-react";

export default function CallHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);

  // Empty data array to match the screenshot's "No data available in table"
  const callData: any[] = [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <div>
              <CardTitle>My Call Log History</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / My Call Log History
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Controls Section */}
            <div className="flex items-center justify-between">
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
              
              <div className="flex items-center gap-2">
                <Label htmlFor="search" className="text-sm">Search:</Label>
                <Input
                  id="search"
                  placeholder=""
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Date Time</TableHead>
                    <TableHead className="text-center">Direction</TableHead>
                    <TableHead className="text-center">From</TableHead>
                    <TableHead className="text-center">To</TableHead>
                    <TableHead className="text-center">Result</TableHead>
                    <TableHead className="text-center">Duration</TableHead>
                    <TableHead className="text-center">Dealer Id</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {callData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No data available in table
                      </TableCell>
                    </TableRow>
                  ) : (
                    callData.map((call, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">{call.dateTime}</TableCell>
                        <TableCell className="text-center">{call.direction}</TableCell>
                        <TableCell className="text-center">{call.from}</TableCell>
                        <TableCell className="text-center">{call.to}</TableCell>
                        <TableCell className="text-center">{call.result}</TableCell>
                        <TableCell className="text-center">{call.duration}</TableCell>
                        <TableCell className="text-center">{call.dealerId}</TableCell>
                        <TableCell className="text-center">{call.action}</TableCell>
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