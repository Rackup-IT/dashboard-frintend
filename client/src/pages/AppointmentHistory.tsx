import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Calendar, Clock, User, Phone } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLocation } from "wouter";

// Sample appointment data matching the screenshot
const appointmentData = [
  {
    id: 1,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/28/2023",
    appointmentTime: "11:00 AM",
    customerName: "Clara Ordner",
    customerPhone: "8600745467",
    dealer: "Downtown Toyota",
    createdAt: "10/28/2023 01:05 PM"
  },
  {
    id: 2,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/28/2023",
    appointmentTime: "01:00 PM",
    customerName: "Alice Kissinger",
    customerPhone: "2404252628",
    dealer: "Downtown Toyota",
    createdAt: "10/28/2023 01:06 PM"
  },
  {
    id: 3,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/28/2023",
    appointmentTime: "11:30 AM",
    customerName: "Richard Truong",
    customerPhone: "5103891616",
    dealer: "Downtown Toyota",
    createdAt: "10/28/2023 01:06 PM"
  },
  {
    id: 4,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/29/2023",
    appointmentTime: "08:30 AM",
    customerName: "Amanda Pendergrass",
    customerPhone: "5374881703",
    dealer: "Navarre Chevrolet & Cadillac",
    createdAt: "10/28/2023 01:06 PM"
  },
  {
    id: 5,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/29/2023",
    appointmentTime: "11:00 AM",
    customerName: "Shadonna Saunders",
    customerPhone: "(408) 469-1894",
    dealer: "Downtown Toyota",
    createdAt: "10/28/2023 01:06 PM"
  },
  {
    id: 6,
    agent: "Admin Admin",
    type: "Follow Up",
    appointmentDate: "10/28/2023",
    appointmentTime: "12:00 PM",
    customerName: "Paolo Durand",
    customerPhone: "6195005524",
    dealer: "Downtown Toyota",
    createdAt: "10/28/2023 02:00 PM"
  },
  {
    id: 7,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/28/2023",
    appointmentTime: "12:30 PM",
    customerName: "Nancy Bamberger",
    customerPhone: "(973) 890-6822",
    dealer: "Downtown Toyota",
    createdAt: "10/28/2023 02:24 PM"
  },
  {
    id: 8,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/28/2023",
    appointmentTime: "02:00 PM",
    customerName: "Silvia Ng",
    customerPhone: "(425) 277-6636",
    dealer: "Downtown Toyota",
    createdAt: "10/28/2023 02:50 PM"
  },
  {
    id: 9,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/30/2023",
    appointmentTime: "09:00 PM",
    customerName: "Dericko Diaz",
    customerPhone: "700-710-1704",
    dealer: "Nissan of San Juan Capistrano",
    createdAt: "10/28/2023 03:03 PM"
  },
  {
    id: 10,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/29/2023",
    appointmentTime: "02:00 PM",
    customerName: "Ashley Ruiz",
    customerPhone: "(408) 439-4600",
    dealer: "Downtown Toyota",
    createdAt: "10/28/2023 06:03 PM"
  }
];

const dealerships = [
  "Downtown Toyota",
  "Navarre Chevrolet & Cadillac", 
  "Nissan of San Juan Capistrano",
  "All American Chevrolet of Midland",
  "Andrews Auto",
  "Augusta Mitsubishi",
  "Daytona Kia",
  "Daytona Mitsubishi"
];

export default function AppointmentHistory() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [selectedDealership, setSelectedDealership] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter appointments based on search criteria
  const filteredAppointments = appointmentData.filter(appointment => {
    const matchesSearch = searchTerm === "" || 
      appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPhone = phoneSearch === "" || 
      appointment.customerPhone.includes(phoneSearch);
    
    const matchesDealership = selectedDealership === "" || selectedDealership === "all" || 
      appointment.dealer === selectedDealership;

    return matchesSearch && matchesPhone && matchesDealership;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  const handleAddAppointment = () => {
    setLocation("/dealer-notification");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <div>
                <CardTitle>Appointment History</CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  Dashboard / Appointment History
                </div>
              </div>
            </div>
            <Button onClick={handleAddAppointment} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Appointment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone-search">Search by phone number</Label>
                <Input
                  id="phone-search"
                  placeholder="Search by phone number"
                  value={phoneSearch}
                  onChange={(e) => setPhoneSearch(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dealership">Dealership</Label>
                <Select value={selectedDealership} onValueChange={setSelectedDealership}>
                  <SelectTrigger>
                    <SelectValue placeholder="Dealership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dealerships</SelectItem>
                    {dealerships.map((dealer) => (
                      <SelectItem key={dealer} value={dealer}>{dealer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date-range">Select Date Range to Filter Appointments</Label>
                <Input
                  id="date-range"
                  placeholder="Select Date Range to Filter Appointments"
                  className="bg-gray-100"
                  disabled
                />
              </div>
            </div>

            {/* Entries per page selector */}
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
                    <TableHead className="w-24">Agent</TableHead>
                    <TableHead className="w-24">Type</TableHead>
                    <TableHead className="w-32">Appointment Date</TableHead>
                    <TableHead className="w-32">Appointment Time</TableHead>
                    <TableHead className="w-40">Customer Name</TableHead>
                    <TableHead className="w-36">Customer Phone</TableHead>
                    <TableHead className="w-48">Dealer</TableHead>
                    <TableHead className="w-36">Created At</TableHead>
                    <TableHead className="w-20">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="text-sm">{appointment.agent}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={appointment.type === "Appointment" ? "default" : "secondary"}
                          className={appointment.type === "Appointment" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                        >
                          {appointment.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{appointment.appointmentDate}</TableCell>
                      <TableCell className="text-sm">{appointment.appointmentTime}</TableCell>
                      <TableCell className="text-sm">{appointment.customerName}</TableCell>
                      <TableCell className="text-sm">{appointment.customerPhone}</TableCell>
                      <TableCell className="text-sm">{appointment.dealer}</TableCell>
                      <TableCell className="text-sm">{appointment.createdAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredAppointments.length)} of {filteredAppointments.length} entries
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? "bg-blue-600 text-white" : ""}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
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