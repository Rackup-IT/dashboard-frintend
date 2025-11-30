import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface Department {
  _id: string;
  name: string;
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [departmentName, setDepartmentName] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadDepartments();
  }, [currentPage, entriesPerPage]);

  const loadDepartments = () => {
    apiRequest(
      "GET",
      `department/get-all?page=${currentPage}&limit=${entriesPerPage}
      `
    ).then((data) => {
      setDepartments(data.departments);
      setTotalPages(data.totalPages);
    });
  };

  const handleAdd = () => {
    setEditingDepartment(null);
    setDepartmentName("");
    setIsDialogOpen(true);
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setDepartmentName(department.name);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!departmentName.trim()) return;

    if (editingDepartment) {
      // Edit existing department
      apiRequest("PUT", `department/update/${editingDepartment._id}`, {
        name: departmentName,
      }).then((data) => {
        setDepartments((prev) =>
          prev.map((dept) =>
            dept._id === editingDepartment._id ? data.department : dept
          )
        );
      });
    } else {
      // Add new department

      apiRequest("POST", "department/create", { name: departmentName }).then(
        (data) => {
          setDepartments((prev) => [...prev, data.department]);
        }
      );
    }

    setIsDialogOpen(false);
    setDepartmentName("");
    setEditingDepartment(null);
  };

  const handleDelete = (id: number) => {
    apiRequest("DELETE", `department/delete/${id}`).then(() => {
      setDepartments((prev) => prev.filter((dept) => dept._id !== id));
    });
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setDepartmentName("");
    setEditingDepartment(null);
  };

  // Filter departments based on search
  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Department List</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Department List
              </div>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-add-department"
            >
              <Plus className="h-4 w-4 mr-2" />
              Department
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">Show</span>
                <Select
                  value={entriesPerPage}
                  onValueChange={setEntriesPerPage}
                >
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

              <div className="flex items-center gap-2">
                <span className="text-sm">Search:</span>
                <Input
                  placeholder=""
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48"
                  data-testid="input-search"
                />
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">#</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department, index) => (
                    <TableRow key={department._id}>
                      <TableCell className="text-sm">{index + 1}</TableCell>
                      <TableCell className="text-sm">
                        {department.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            onClick={() => handleEdit(department)}
                            data-testid={`button-edit-${department._id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDelete(department._id)}
                            data-testid={`button-delete-${department._id}`}
                          >
                            Delete
                          </Button>
                        </div>
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
                  departments.length
                )}{" "}
                to{" "}
                {Math.min(
                  currentPage * parseInt(entriesPerPage),
                  departments.length
                )}{" "}
                of {departments.length} entries
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Department Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-md"
          data-testid="dialog-add-edit-department"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {editingDepartment ? "Edit Department" : "Add Department"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="department-name">Name</Label>
              <Input
                id="department-name"
                placeholder="Admin"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                data-testid="input-department-name"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="bg-gray-500 hover:bg-gray-600 text-white"
              data-testid="button-close"
            >
              Close
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-save"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
