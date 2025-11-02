import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MoreHorizontal, Plus, Calendar, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLocation } from "wouter";

// Sample appointment data with all required fields
const appointmentData = [
  {
    id: 1,
    agent: "Admin Admin",
    type: "Appointment",
    appointmentDate: "10/28/2023",
    appointmentTime: "11:00 AM",
    customerName: "Diana Decker",
    customerPhone: "8039142847",
    dealer: "Downtown Toyota",
    createdAt: "10/28/2023 01:35 PM",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2023 Toyota RAV4 Prime",
    stockNumber: "",
    paymentSource: "Finance",
    comment: "N/A",
    leadSource: "Phone Line Up",
    language: "English"
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
    createdAt: "10/28/2023 01:43 PM",
    department: "Sales",
    scenario: "Used Vehicle",
    vehicleOfInterest: "2022 Honda Civic",
    stockNumber: "HC2022-01",
    paymentSource: "Cash",
    comment: "Looking for specific color",
    leadSource: "Website",
    language: "English"
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
    createdAt: "10/28/2023 01:48 PM",
    department: "Sales",
    scenario: "Trade-In",
    vehicleOfInterest: "2024 Toyota Camry",
    stockNumber: "TC2024-05",
    paymentSource: "Finance",
    comment: "Has 2018 Honda Accord for trade",
    leadSource: "Referral",
    language: "English"
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
    createdAt: "10/28/2023 01:55 PM",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2023 Chevrolet Silverado",
    stockNumber: "CS2023-12",
    paymentSource: "Lease",
    comment: "Interested in work truck package",
    leadSource: "Walk-In",
    language: "English"
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
    createdAt: "10/28/2023 01:56 PM",
    department: "Service",
    scenario: "Maintenance",
    vehicleOfInterest: "N/A",
    stockNumber: "",
    paymentSource: "Cash",
    comment: "Oil change and tire rotation",
    leadSource: "Phone Call",
    language: "English"
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
    createdAt: "10/28/2023 02:06 PM",
    department: "Sales",
    scenario: "Follow Up",
    vehicleOfInterest: "2023 Toyota Highlander",
    stockNumber: "",
    paymentSource: "Finance",
    comment: "Following up on previous inquiry",
    leadSource: "Previous Customer",
    language: "Spanish"
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
    createdAt: "10/28/2023 02:24 PM",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2024 Toyota RAV4 Hybrid",
    stockNumber: "TR2024-08",
    paymentSource: "Finance",
    comment: "Prefers white or silver",
    leadSource: "Social Media",
    language: "English"
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
    createdAt: "10/28/2023 02:50 PM",
    department: "Sales",
    scenario: "Certified Pre-Owned",
    vehicleOfInterest: "2021 Toyota Corolla",
    stockNumber: "CPO2021-03",
    paymentSource: "Cash",
    comment: "N/A",
    leadSource: "Advertisement",
    language: "English"
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
    createdAt: "10/28/2023 03:03 PM",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2024 Nissan Altima",
    stockNumber: "NA2024-15",
    paymentSource: "Finance",
    comment: "First time buyer",
    leadSource: "Phone Call",
    language: "English"
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
    createdAt: "10/28/2023 06:03 PM",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2023 Toyota Prius",
    stockNumber: "TP2023-22",
    paymentSource: "Lease",
    comment: "Looking for best fuel economy",
    leadSource: "Website",
    language: "Spanish"
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
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointmentData[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

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

  const handleViewAppointment = (appointment: typeof appointmentData[0]) => {
    setSelectedAppointment(appointment);
    setIsViewDialogOpen(true);
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    console.log("Delete appointment:", appointmentId);
    // Add delete logic here
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
            <Button onClick={handleAddAppointment} className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-add-appointment">
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
                  data-testid="input-search"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone-search">Search by phone number</Label>
                <Input
                  id="phone-search"
                  placeholder="Search by phone number"
                  value={phoneSearch}
                  onChange={(e) => setPhoneSearch(e.target.value)}
                  data-testid="input-phone-search"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dealership">Dealership</Label>
                <Select value={selectedDealership} onValueChange={setSelectedDealership}>
                  <SelectTrigger data-testid="select-dealership-filter">
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
                  data-testid="input-date-range"
                />
              </div>
            </div>

            {/* Entries per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-20" data-testid="select-entries-per-page">
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
                            <Button variant="ghost" size="sm" data-testid={`button-action-${appointment.id}`}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewAppointment(appointment)} data-testid={`menu-view-${appointment.id}`}>
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600" 
                              onClick={() => handleDeleteAppointment(appointment.id)}
                              data-testid={`menu-delete-${appointment.id}`}
                            >
                              Delete
                            </DropdownMenuItem>
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
                  data-testid="button-previous-page"
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
                      data-testid={`button-page-${pageNum}`}
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
                  data-testid="button-next-page"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl" data-testid="dialog-appointment-details">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Appointment Details</DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Dealer :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.dealer}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Type :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.type}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Customer :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.customerName}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Phone # :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.customerPhone}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Date :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.appointmentDate}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Time :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.appointmentTime}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Department :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.department}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Scenario :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.scenario}</span>
                </div>
                
                <div className="col-span-2">
                  <span className="font-semibold text-gray-700">Vehicle Of Interest :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.vehicleOfInterest}</span>
                </div>
                
                <div className="col-span-2">
                  <span className="font-semibold text-gray-700">Stock # :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.stockNumber || "N/A"}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Payment Source :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.paymentSource}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Comment :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.comment}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Lead Source :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.leadSource}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Language :</span>
                  <span className="ml-2 text-gray-900">{selectedAppointment.language}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
