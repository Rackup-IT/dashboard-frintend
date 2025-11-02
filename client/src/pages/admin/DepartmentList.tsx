import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface Department {
  id: number;
  name: string;
}

const initialDepartments: Department[] = [
  { id: 1, name: "Sales" },
  { id: 2, name: "SZS" },
  { id: 3, name: "Data Mining" },
  { id: 4, name: "Campaign" },
  { id: 5, name: "Follow Up" },
  { id: 6, name: "Confirmations" },
];

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [departmentName, setDepartmentName] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
      setDepartments(prev =>
        prev.map(dept =>
          dept.id === editingDepartment.id
            ? { ...dept, name: departmentName }
            : dept
        )
      );
    } else {
      // Add new department
      const newDepartment: Department = {
        id: Math.max(...departments.map(d => d.id), 0) + 1,
        name: departmentName,
      };
      setDepartments(prev => [...prev, newDepartment]);
    }

    setIsDialogOpen(false);
    setDepartmentName("");
    setEditingDepartment(null);
  };

  const handleDelete = (id: number) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setDepartmentName("");
    setEditingDepartment(null);
  };

  // Filter departments based on search
  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredDepartments.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentDepartments = filteredDepartments.slice(startIndex, endIndex);

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
                <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
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
                  {currentDepartments.map((department, index) => (
                    <TableRow key={department.id}>
                      <TableCell className="text-sm">{startIndex + index + 1}</TableCell>
                      <TableCell className="text-sm">{department.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            onClick={() => handleEdit(department)}
                            data-testid={`button-edit-${department.id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDelete(department.id)}
                            data-testid={`button-delete-${department.id}`}
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
                Showing {startIndex + 1} to {Math.min(endIndex, filteredDepartments.length)} of {filteredDepartments.length} entries
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  data-testid="button-previous"
                >
                  Previous
                </Button>
                
                {currentPage > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </Button>
                )}
                
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-600 text-white"
                  data-testid={`button-page-${currentPage}`}
                >
                  {currentPage}
                </Button>
                
                {currentPage < totalPages && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  data-testid="button-next"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Department Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md" data-testid="dialog-add-edit-department">
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
