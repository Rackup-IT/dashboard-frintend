import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import { Calendar, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Sample appointment data with all required fields

export default function AppointmentHistory() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [selectedDealership, setSelectedDealership] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState<
    (typeof appointmentData)[0] | null
  >(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [dealerships, setDealerships] = useState([]);
  const [users, setUsers] = useState(["All Users"]);
  const [toalPages, setTotalPages] = useState(1);
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "MM/dd/yyyy");
  };
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    apiRequest("GET", "appointment/get-all").then((data) => {
      setAppointmentData(data.appointments);
      setTotalPages(data.totalPages);
    });
    apiRequest("GET", "dealer/get-all").then((data) => {
      const dealerNames = data.dealers.map(
        (dealer: { name: string }) => dealer.dealerName
      );
      setDealerships(dealerNames);
    });
    apiRequest("GET", "users").then((data) => {
      const userNames = data.users.map((user: { name: string }) => user.name);
      setUsers(["All Users", ...userNames]);
    });
  };

  // Filter appointments based on search criteria
  const filteredAppointments = appointmentData.filter((appointment) => {
    const matchesSearch =
      searchTerm === "" ||
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPhone =
      phoneSearch === "" || appointment.phone.includes(phoneSearch);

    const matchesDealership =
      selectedDealership === "" ||
      selectedDealership === "all" ||
      appointment.dealer === selectedDealership;

    return matchesSearch && matchesPhone && matchesDealership;
  });

  // Pagination logic
  const totalPages = Math.ceil(
    filteredAppointments.length / parseInt(entriesPerPage)
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  const handleAddAppointment = () => {
    setLocation("/dealer-notification");
  };

  const handleViewAppointment = (appointment: (typeof appointmentData)[0]) => {
    setSelectedAppointment(appointment);
    setIsViewDialogOpen(true);
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    apiRequest("DELETE", `appointment/delete/${appointmentId}`).then(() => {
      loadData();
    });
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
                <Select
                  value={selectedDealership}
                  onValueChange={setSelectedDealership}
                >
                  <SelectTrigger data-testid="select-dealership-filter">
                    <SelectValue placeholder="Dealership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dealerships</SelectItem>
                    {dealerships.map((dealer) => (
                      <SelectItem key={dealer._id} value={dealer._id}>
                        {dealer.dealerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-range">
                  Select Date Range to Filter Appointments
                </Label>
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
                <SelectTrigger
                  className="w-20"
                  data-testid="select-entries-per-page"
                >
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
                    <TableRow key={appointment._id}>
                      <TableCell className="text-sm">
                        {appointment.agentName}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            appointment.type === "appointment"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            appointment.type === "appointment"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {appointment.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {appointment.appointmentDate}
                      </TableCell>
                      <TableCell className="text-sm">
                        {appointment.appointmentTime}
                      </TableCell>
                      <TableCell className="text-sm">
                        {appointment.name}
                      </TableCell>
                      <TableCell className="text-sm">
                        {appointment.phone}
                      </TableCell>
                      <TableCell className="text-sm">
                        {appointment.dealer.dealerName}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(appointment.createdAt)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              data-testid={`button-action-${appointment._id}`}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewAppointment(appointment)}
                              data-testid={`menu-view-${appointment._id}`}
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() =>
                                handleDeleteAppointment(appointment._id)
                              }
                              data-testid={`menu-delete-${appointment._id}`}
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
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredAppointments.length)} of{" "}
                {filteredAppointments.length} entries
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
                      className={
                        currentPage === pageNum ? "bg-blue-600 text-white" : ""
                      }
                      data-testid={`button-page-${pageNum}`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
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
        <DialogContent
          className="max-w-2xl"
          data-testid="dialog-appointment-details"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Appointment Details
            </DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Dealer :</span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.dealer.dealerName}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Type :</span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.type}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">
                    Customer :
                  </span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.name}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Phone # :</span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.phone}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Date :</span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.appointmentDate}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Time :</span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.appointmentTime}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">
                    Department :
                  </span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.department.name}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">
                    Scenario :
                  </span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.scenario.name}
                  </span>
                </div>

                <div className="col-span-2">
                  <span className="font-semibold text-gray-700">
                    Vehicle Of Interest :
                  </span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.vehicleOfInterest}
                  </span>
                </div>

                <div className="col-span-2">
                  <span className="font-semibold text-gray-700">Stock # :</span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.stockNumber || "N/A"}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">
                    Payment Source :
                  </span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.paymentSource}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Comment :</span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.comment}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">
                    Lead Source :
                  </span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.leadSource.name}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">
                    Language :
                  </span>
                  <span className="ml-2 text-gray-900">
                    {selectedAppointment.language}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
