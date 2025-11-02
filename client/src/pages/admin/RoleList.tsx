import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { roleStore, type Role } from "@/lib/roleStore";
import { useToast } from "@/hooks/use-toast";

export default function RoleList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRoleTitle, setNewRoleTitle] = useState("");

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = () => {
    setRoles(roleStore.getRoles());
  };

  const handleAddRole = () => {
    if (!newRoleTitle.trim()) {
      toast({
        title: "Error",
        description: "Role title is required",
        variant: "destructive",
      });
      return;
    }

    roleStore.addRole({ title: newRoleTitle, permissions: [] });
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
    roleStore.deleteRole(id);
    loadRoles();
    toast({
      title: "Success",
      description: "Role deleted successfully",
    });
  };

  // Filter roles based on search
  const filteredRoles = roles.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentRoles = filteredRoles.slice(startIndex, endIndex);

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
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="text-sm">{role.id}</TableCell>
                      <TableCell className="text-sm">{role.title}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white mr-2"
                          onClick={() => handleEdit(role.id)}
                          data-testid={`button-edit-${role.id}`}
                        >
                          Edit
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
                Showing {startIndex + 1} to {Math.min(endIndex, filteredRoles.length)} of {filteredRoles.length} entries
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
                
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-600 text-white"
                  data-testid={`button-page-${currentPage}`}
                >
                  {currentPage}
                </Button>
                
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
