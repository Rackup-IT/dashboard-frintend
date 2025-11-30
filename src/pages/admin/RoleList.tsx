import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type Role } from "@/lib/roleStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function RoleList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRoleTitle, setNewRoleTitle] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = () => {
    apiRequest("GET", "role/get-all").then((data) => {
      setRoles(data.roles);
      setTotalPages(data.totalPages);
    });
  };

  const handleAddRole = () => {
    apiRequest("POST", "role/create", { name: newRoleTitle }).then((data) => {
      setRoles((prev) => [...prev, data.role]);
    });
    setNewRoleTitle("");
    setShowAddDialog(false);
    loadRoles();
    toast({
      title: "Success",
      description: "Role created successfully",
    });
  };

  const handleEdit = (id: number) => {
    setLocation(`/admin/roles/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    apiRequest("DELETE", `role/delete/${id}`).then(() => {
      setRoles((prev) => prev.filter((role) => role._id !== id));
    });
    loadRoles();
    toast({
      title: "Success",
      description: "Role deleted successfully",
    });
  };

  // Filter roles based on search
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Role List</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Role List
              </div>
            </div>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-add-role"
            >
              <Plus className="h-4 w-4 mr-2" />
              Role
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
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role, index) => (
                    <TableRow key={role._id}>
                      <TableCell className="text-sm">{index + 1}</TableCell>
                      <TableCell className="text-sm">{role.name}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white mr-2"
                          onClick={() => handleEdit(role._id)}
                          data-testid={`button-edit-${role._id}`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(role._id)}
                          data-testid={`button-delete-${role._id}`}
                        >
                          Delete
                        </Button>
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
                  roles.length
                )}{" "}
                to{" "}
                {Math.min(currentPage * parseInt(entriesPerPage), roles.length)}{" "}
                of {roles.length} entries
              </div>

              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Role Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roleTitle">Role Title</Label>
              <Input
                id="roleTitle"
                value={newRoleTitle}
                onChange={(e) => setNewRoleTitle(e.target.value)}
                placeholder="Admin"
                data-testid="input-role-title"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddDialog(false);
                setNewRoleTitle("");
              }}
              data-testid="button-close"
            >
              Close
            </Button>
            <Button
              onClick={handleAddRole}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-save"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
