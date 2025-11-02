import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function EmployeeList() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");

  // Sample data matching the screenshot with state management
  const [employees, setEmployees] = useState([
    { id: 1, name: "Admin Admin", email: "manager@truebdc.com", phone: "+8583282889", status: true },
    { id: 5, name: "Rafael Hossain", email: "rafael@truebdc.com", phone: "+57379428950", status: false },
    { id: 6, name: "Maria Morozova", email: "maria@truebdc.com", phone: "+57304387171", status: true },
    { id: 7, name: "Jeff Cardona", email: "jeff@truebdc.com", phone: "+57306503081", status: true },
    { id: 8, name: "Genesis Jimenez", email: "genesis@truebdc.com", phone: "+57387996918", status: false },
    { id: 9, name: "Amanda Jones", email: "amanda@truebdc.com", phone: "+1252070404", status: true },
    { id: 10, name: "David Santana", email: "david.santana@truebdc.com", phone: "+573315278533", status: false },
    { id: 11, name: "Santiago Rodom", email: "santiago@truebdc.com", phone: "+573224850181", status: true },
    { id: 12, name: "Santiago Zenizo", email: "santiagozentizo@truebdc.com", phone: "+573344946266", status: false },
    { id: 13, name: "Sam Urisao", email: "samuel@truebdc.com", phone: "+573244278206", status: false },
  ]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusToggle = (id: number) => {
    setEmployees(prevEmployees => 
      prevEmployees.map(employee => 
        employee.id === id 
          ? { ...employee, status: !employee.status }
          : employee
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee List</h1>
          <div className="text-sm text-gray-500">
            <span>Dashboard</span> / <span>Employee List</span>
          </div>
        </div>
        <Link href="/admin/employee-list/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Search:</span>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48"
            placeholder=""
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee, index) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>
                    <Switch
                      checked={employee.status}
                      onCheckedChange={() => handleStatusToggle(employee.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Schedule</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing 1 to 10 of 77 entries
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button size="sm" className="bg-blue-600 text-white">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">4</Button>
          <Button variant="outline" size="sm">5</Button>
          <span className="text-gray-500">...</span>
          <Button variant="outline" size="sm">8</Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}