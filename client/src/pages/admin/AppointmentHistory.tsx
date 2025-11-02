import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { MoreHorizontal, Plus, Calendar as CalendarIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

// Sample appointment data
const appointmentData = [
  {
    id: 1,
    agent: "Adel Razzaq",
    appointmentDate: "11/01/2023",
    appointmentTime: "09:45 PM",
    customerName: "John Russ",
    customerPhone: "337-842-5805",
    dealer: "Navarre Chevrolet & Cadillac",
    createdAt: "11/01/2023 10:15 AM",
    type: "Appointment",
    department: "SZS",
    scenario: "Upcoming Service Appointment",
    vehicleOfInterest: "2024 Chevrolet TrailBlazer",
    stockNumber: "2021 Chevrolet Tahoe",
    tradeInMileage: "",
    paymentSource: "Finance",
    comment: "Customer is looking for service and is interested in upgrade options. Will come to sales after he checks in for service. Should be there at 5pm 2021 Tahoe",
    leadSource: "Service Drive",
    language: "English"
  },
  {
    id: 2,
    agent: "Adel Razzaq",
    appointmentDate: "11/01/2023",
    appointmentTime: "04:00 PM",
    customerName: "Michael Nguyen",
    customerPhone: "337-513-6280",
    dealer: "Navarre Honda",
    createdAt: "11/01/2023 12:36 PM",
    type: "Appointment",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2024 Honda Civic",
    stockNumber: "",
    tradeInMileage: "",
    paymentSource: "Cash",
    comment: "Interested in test drive",
    leadSource: "Website",
    language: "English"
  },
  {
    id: 3,
    agent: "Adel Razzaq",
    appointmentDate: "11/01/2023",
    appointmentTime: "01:00 PM",
    customerName: "Betty Euzee",
    customerPhone: "337-428-2159",
    dealer: "Navarre Chevrolet & Cadillac",
    createdAt: "11/01/2023 11:26 AM",
    type: "Appointment",
    department: "Sales",
    scenario: "Used Vehicle",
    vehicleOfInterest: "2023 Chevrolet Silverado",
    stockNumber: "",
    tradeInMileage: "",
    paymentSource: "Finance",
    comment: "Looking for work truck",
    leadSource: "Phone Call",
    language: "English"
  },
  {
    id: 4,
    agent: "Adel Razzaq",
    appointmentDate: "11/01/2023",
    appointmentTime: "10:00 AM",
    customerName: "Michael Broussard",
    customerPhone: "409-679-9080",
    dealer: "Navarre Chevrolet & Cadillac",
    createdAt: "11/01/2023 10:33 AM",
    type: "Appointment",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2024 Chevrolet Tahoe",
    stockNumber: "",
    tradeInMileage: "",
    paymentSource: "Lease",
    comment: "",
    leadSource: "Referral",
    language: "English"
  },
  {
    id: 5,
    agent: "Adel Razzaq",
    appointmentDate: "11/01/2023",
    appointmentTime: "12:30 PM",
    customerName: "Jennifer Hebert",
    customerPhone: "337-884-0376",
    dealer: "Navarre Honda",
    createdAt: "11/01/2023 12:19 PM",
    type: "Appointment",
    department: "Sales",
    scenario: "Trade-In",
    vehicleOfInterest: "2024 Honda CR-V",
    stockNumber: "",
    tradeInMileage: "",
    paymentSource: "Finance",
    comment: "Has 2020 Accord for trade",
    leadSource: "Walk-In",
    language: "English"
  },
  {
    id: 6,
    agent: "Adel Razzaq",
    appointmentDate: "11/01/2023",
    appointmentTime: "12:00 PM",
    customerName: "Ane Khosbatchan",
    customerPhone: "571-486-1513",
    dealer: "BMW MINI of Sterling",
    createdAt: "11/01/2023 10:02 AM",
    type: "Appointment",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2024 BMW X5",
    stockNumber: "",
    tradeInMileage: "",
    paymentSource: "Cash",
    comment: "",
    leadSource: "Advertisement",
    language: "English"
  },
  {
    id: 7,
    agent: "Adel Razzaq",
    appointmentDate: "11/01/2023",
    appointmentTime: "04:00 PM",
    customerName: "Rosamond Stone",
    customerPhone: "337-540-3915",
    dealer: "Navarre Honda",
    createdAt: "11/01/2023 12:02 PM",
    type: "Appointment",
    department: "Service",
    scenario: "Maintenance",
    vehicleOfInterest: "",
    stockNumber: "",
    tradeInMileage: "",
    paymentSource: "Cash",
    comment: "Oil change and inspection",
    leadSource: "Service Drive",
    language: "English"
  },
  {
    id: 8,
    agent: "Adel Razzaq",
    appointmentDate: "11/01/2023",
    appointmentTime: "03:00 PM",
    customerName: "Leo Lewis",
    customerPhone: "337-249-5051",
    dealer: "Navarre Chevrolet & Cadillac",
    createdAt: "11/01/2023 10:56 AM",
    type: "Appointment",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2024 Chevrolet Equinox",
    stockNumber: "",
    tradeInMileage: "",
    paymentSource: "Finance",
    comment: "",
    leadSource: "Social Media",
    language: "English"
  },
  {
    id: 9,
    agent: "Adel Razzaq",
    appointmentDate: "11/02/2023",
    appointmentTime: "10:00 AM",
    customerName: "Karim Farouki",
    customerPhone: "202-439-9642",
    dealer: "BMW MINI of Sterling",
    createdAt: "11/01/2023 09:57 AM",
    type: "Appointment",
    department: "Sales",
    scenario: "CPO",
    vehicleOfInterest: "2022 BMW 3 Series",
    stockNumber: "",
    tradeInMileage: "",
    paymentSource: "Finance",
    comment: "Looking for certified pre-owned",
    leadSource: "Website",
    language: "English"
  },
  {
    id: 10,
    agent: "Adel Razzaq",
    appointmentDate: "11/01/2023",
    appointmentTime: "04:00 PM",
    customerName: "Geeta Sethi",
    customerPhone: "202-957-0111",
    dealer: "BMW MINI of Sterling",
    createdAt: "11/01/2023 09:54 AM",
    type: "Appointment",
    department: "Sales",
    scenario: "New",
    vehicleOfInterest: "2024 MINI Cooper",
    stockNumber: "",
    tradeInMileage: "",
    paymentSource: "Lease",
    comment: "",
    leadSource: "Phone Call",
    language: "English"
  }
];

const users = ["All Users", "Adel Razzaq", "Admin Admin", "Sarah Johnson", "Mike Davis"];
const dealerships = [
  "All Dealerships",
  "Navarre Chevrolet & Cadillac",
  "Navarre Honda",
  "BMW MINI of Sterling",
  "Downtown Toyota",
  "Augusta Mitsubishi",
  "Daytona Kia"
];

export default function AppointmentHistory() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("All Users");
  const [selectedDealership, setSelectedDealership] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointmentData[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Filter appointments
  const filteredAppointments = appointmentData.filter(appointment => {
    const matchesSearch = searchTerm === "" || 
      appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.agent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPhone = phoneSearch === "" || 
      appointment.customerPhone.includes(phoneSearch);
    
    const matchesUser = selectedUser === "All Users" || appointment.agent === selectedUser;
    
    const matchesDealership = selectedDealership === "" || selectedDealership === "All Dealerships" || 
      appointment.dealer === selectedDealership;

    return matchesSearch && matchesPhone && matchesUser && matchesDealership;
  });

  // Pagination
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
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Appointment History</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Appointment History
              </div>
            </div>
            <Button 
              onClick={handleAddAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-add-appointment"
            >
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
                <Label htmlFor="user-filter">All Users</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger id="user-filter" data-testid="select-user-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user} value={user}>{user}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dealership">Dealership</Label>
                <Select value={selectedDealership} onValueChange={setSelectedDealership}>
                  <SelectTrigger id="dealership" data-testid="select-dealership-filter">
                    <SelectValue placeholder="Dealership" />
                  </SelectTrigger>
                  <SelectContent>
                    {dealerships.map((dealer) => (
                      <SelectItem key={dealer} value={dealer}>{dealer}</SelectItem>
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

            <div className="space-y-2">
              <Label htmlFor="phone-search">Search by phone number</Label>
              <Input
                id="phone-search"
                placeholder="Search by phone number"
                value={phoneSearch}
                onChange={(e) => setPhoneSearch(e.target.value)}
                className="max-w-md"
                data-testid="input-phone-search"
              />
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
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Agent</TableHead>
                    <TableHead className="font-semibold">Appointment Date</TableHead>
                    <TableHead className="font-semibold">Appointment Time</TableHead>
                    <TableHead className="font-semibold">Customer Name</TableHead>
                    <TableHead className="font-semibold">Customer Phone</TableHead>
                    <TableHead className="font-semibold">Dealer</TableHead>
                    <TableHead className="font-semibold">Created At</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="text-sm">{appointment.agent}</TableCell>
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
                            <DropdownMenuItem 
                              onClick={() => handleViewAppointment(appointment)}
                              data-testid={`menu-view-${appointment.id}`}
                            >
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
                
                <span className="text-sm text-gray-500">...</span>
                <span className="text-sm text-gray-500">11441</span>
                
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
        <DialogContent className="max-w-md" data-testid="dialog-appointment-details">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Appointment Details</DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold">Dealer :</span>
                <span className="ml-2">{selectedAppointment.dealer}</span>
              </div>
              
              <div>
                <span className="font-semibold">Type :</span>
                <span className="ml-2">{selectedAppointment.type}</span>
              </div>
              
              <div>
                <span className="font-semibold">Customer :</span>
                <span className="ml-2">{selectedAppointment.customerName}</span>
              </div>
              
              <div>
                <span className="font-semibold">Phone # :</span>
                <span className="ml-2">{selectedAppointment.customerPhone}</span>
              </div>
              
              <div>
                <span className="font-semibold">Date :</span>
                <span className="ml-2">{selectedAppointment.appointmentDate}</span>
              </div>
              
              <div>
                <span className="font-semibold">Time :</span>
                <span className="ml-2">{selectedAppointment.appointmentTime}</span>
              </div>
              
              <div>
                <span className="font-semibold">Department :</span>
                <span className="ml-2">{selectedAppointment.department}</span>
              </div>
              
              <div>
                <span className="font-semibold">Scenario :</span>
                <span className="ml-2">{selectedAppointment.scenario}</span>
              </div>
              
              <div>
                <span className="font-semibold">Vehicle Of Interest :</span>
                <span className="ml-2">{selectedAppointment.vehicleOfInterest || "N/A"}</span>
              </div>
              
              <div>
                <span className="font-semibold">Stock # :</span>
                <span className="ml-2">{selectedAppointment.stockNumber || "N/A"}</span>
              </div>
              
              <div>
                <span className="font-semibold">Trade In :</span>
                <span className="ml-2">{selectedAppointment.stockNumber || "N/A"}</span>
              </div>
              
              <div>
                <span className="font-semibold">Trade In Mileage :</span>
                <span className="ml-2">{selectedAppointment.tradeInMileage || "N/A"}</span>
              </div>
              
              <div>
                <span className="font-semibold">Payment Source :</span>
                <span className="ml-2">{selectedAppointment.paymentSource}</span>
              </div>
              
              <div>
                <span className="font-semibold">Comment :</span>
                <div className="ml-2 mt-1 text-gray-700">{selectedAppointment.comment || "N/A"}</div>
              </div>
              
              <div>
                <span className="font-semibold">Lead Source :</span>
                <span className="ml-2">{selectedAppointment.leadSource}</span>
              </div>
              
              <div>
                <span className="font-semibold">Language :</span>
                <span className="ml-2">{selectedAppointment.language}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
