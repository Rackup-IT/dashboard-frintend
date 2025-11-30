import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Calendar as CalendarIcon, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useLocation } from "wouter";

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
  useEffect(() => {
    loadData();
  }, []);
  // Filter appointments
  const filteredAppointments = appointmentData.filter((appointment) => {
    const matchesSearch =
      searchTerm === "" ||
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.agent.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPhone =
      phoneSearch === "" || appointment.phone.includes(phoneSearch);

    const matchesUser =
      selectedUser === "All Users" || appointment.agent === selectedUser;

    const matchesDealership =
      selectedDealership === "" ||
      selectedDealership === "All Dealerships" ||
      appointment.dealer === selectedDealership;

    return matchesSearch && matchesPhone && matchesUser && matchesDealership;
  });

  // Pagination

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
                  <SelectTrigger
                    id="user-filter"
                    data-testid="select-user-filter"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user, index) => (
                      <SelectItem key={user + index} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dealership">Dealership</Label>
                <Select
                  value={selectedDealership}
                  onValueChange={setSelectedDealership}
                >
                  <SelectTrigger
                    id="dealership"
                    data-testid="select-dealership-filter"
                  >
                    <SelectValue placeholder="Dealership" />
                  </SelectTrigger>
                  <SelectContent>
                    {dealerships.map((dealer) => (
                      <SelectItem key={dealer} value={dealer}>
                        {dealer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Date Range to Filter Appointments</Label>
                <Popover
                  open={isDatePickerOpen}
                  onOpenChange={setIsDatePickerOpen}
                >
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
                            {format(dateRange.from, "MM/dd/yyyy")} -{" "}
                            {format(dateRange.to, "MM/dd/yyyy")}
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
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Agent</TableHead>
                    <TableHead className="font-semibold">
                      Appointment Date
                    </TableHead>
                    <TableHead className="font-semibold">
                      Appointment Time
                    </TableHead>
                    <TableHead className="font-semibold">
                      Customer Name
                    </TableHead>
                    <TableHead className="font-semibold">
                      Customer Phone
                    </TableHead>
                    <TableHead className="font-semibold">Dealer</TableHead>
                    <TableHead className="font-semibold">Created At</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment._id}>
                      <TableCell className="text-sm">
                        {appointment.agent.name}
                      </TableCell>
                      <TableCell className="text-sm">
                        {appointment.appointmentDate
                          ? formatDate(appointment.appointmentDate)
                          : "-"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {appointment.appointmentTime}
                      </TableCell>
                      <TableCell className="text-sm">
                        {appointment.firstName} {appointment.lastName}
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
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * parseInt(entriesPerPage) + 1,
                  appointmentData.length
                )}{" "}
                to{" "}
                {Math.min(
                  currentPage * parseInt(entriesPerPage),
                  appointmentData.length
                )}{" "}
                of {appointmentData.length} entries
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={toalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent
          className="max-w-md"
          data-testid="dialog-appointment-details"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Appointment Details
            </DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold">Dealer :</span>
                <span className="ml-2">
                  {selectedAppointment.dealer.dealerName}
                </span>
              </div>

              <div>
                <span className="font-semibold">Type :</span>
                <span className="ml-2">{selectedAppointment.type}</span>
              </div>

              <div>
                <span className="font-semibold">Customer :</span>
                <span className="ml-2">{selectedAppointment.name}</span>
              </div>

              <div>
                <span className="font-semibold">Phone # :</span>
                <span className="ml-2">{selectedAppointment.phone}</span>
              </div>

              <div>
                <span className="font-semibold">Date :</span>
                <span className="ml-2">
                  {selectedAppointment.appointmentDate}
                </span>
              </div>

              <div>
                <span className="font-semibold">Time :</span>
                <span className="ml-2">
                  {selectedAppointment.appointmentTime}
                </span>
              </div>

              <div>
                <span className="font-semibold">Department :</span>
                <span className="ml-2">
                  {selectedAppointment.department.name}
                </span>
              </div>

              <div>
                <span className="font-semibold">Scenario :</span>
                <span className="ml-2">
                  {selectedAppointment.scenario.name}
                </span>
              </div>

              <div>
                <span className="font-semibold">Vehicle Of Interest :</span>
                <span className="ml-2">
                  {selectedAppointment.vehicleOfInterest || "N/A"}
                </span>
              </div>

              <div>
                <span className="font-semibold">Stock # :</span>
                <span className="ml-2">
                  {selectedAppointment.stockNumber || "N/A"}
                </span>
              </div>

              <div>
                <span className="font-semibold">Trade In :</span>
                <span className="ml-2">
                  {selectedAppointment.stockNumber || "N/A"}
                </span>
              </div>

              <div>
                <span className="font-semibold">Trade In Mileage :</span>
                <span className="ml-2">
                  {selectedAppointment.tradeInMileage || "N/A"}
                </span>
              </div>

              <div>
                <span className="font-semibold">Payment Source :</span>
                <span className="ml-2">
                  {selectedAppointment.paymentSource}
                </span>
              </div>

              <div>
                <span className="font-semibold">Comment :</span>
                <div className="ml-2 mt-1 text-gray-700">
                  {selectedAppointment.comment || "N/A"}
                </div>
              </div>

              <div>
                <span className="font-semibold">Lead Source :</span>
                <span className="ml-2">
                  {selectedAppointment.leadSource.name}
                </span>
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
