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

interface LeadSource {
  _id: number;
  name: string;
}

export default function LeadSource() {
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLeadSource, setEditingLeadSource] = useState<LeadSource | null>(
    null
  );
  const [leadSourceName, setLeadSourceName] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    loadLeadSources();
  }, [currentPage, entriesPerPage]);
  const loadLeadSources = () => {
    apiRequest(
      "GET",
      `lead/get-all?page=${currentPage}&limit=${entriesPerPage}`
    ).then((data) => {
      setLeadSources(data.leadSources);
      setTotalPages(data.totalPages);
    });
  };

  const handleAdd = () => {
    setEditingLeadSource(null);
    setLeadSourceName("");
    setIsDialogOpen(true);
  };

  const handleEdit = (leadSource: LeadSource) => {
    setEditingLeadSource(leadSource);
    setLeadSourceName(leadSource.name);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!leadSourceName.trim()) return;

    if (editingLeadSource) {
      // Edit existing lead source
      apiRequest("PATCH", `lead/update/${editingLeadSource._id}`, {
        name: leadSourceName,
      }).then((data) => {
        setLeadSources((prev) =>
          prev.map((source) =>
            source._id === editingLeadSource._id ? data.leadSource : source
          )
        );
      });
    } else {
      // Add new lead source
      apiRequest("POST", "lead/create", { name: leadSourceName }).then(
        (data) => {
          setLeadSources((prev) => [...prev, data.leadSource]);
        }
      );
    }

    setIsDialogOpen(false);
    setLeadSourceName("");
    setEditingLeadSource(null);
  };

  const handleDelete = (id: number) => {
    apiRequest("DELETE", `lead/delete/${id}`).then(() => {
      setLeadSources((prev) => prev.filter((source) => source._id !== id));
    });
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setLeadSourceName("");
    setEditingLeadSource(null);
  };

  // Filter lead sources based on search
  const filteredLeadSources = leadSources.filter((source) =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lead Source List</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Lead Source List
              </div>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-add-lead-source"
            >
              <Plus className="h-4 w-4 mr-2" />
              Lead Source
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
                  {filteredLeadSources.map((leadSource, index) => (
                    <TableRow key={leadSource._id}>
                      <TableCell className="text-sm">{index + 1}</TableCell>
                      <TableCell className="text-sm">
                        {leadSource.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            onClick={() => handleEdit(leadSource)}
                            data-testid={`button-edit-${leadSource._id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDelete(leadSource._id)}
                            data-testid={`button-delete-${leadSource._id}`}
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
                  leadSources.length
                )}{" "}
                to{" "}
                {Math.min(
                  currentPage * parseInt(entriesPerPage),
                  leadSources.length
                )}{" "}
                of {leadSources.length} entries
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

      {/* Add/Edit Lead Source Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-md"
          data-testid="dialog-add-edit-lead-source"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {editingLeadSource ? "Edit Lead Source" : "Add Lead Source"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="lead-source-name">Name</Label>
              <Input
                id="lead-source-name"
                placeholder="Admin"
                value={leadSourceName}
                onChange={(e) => setLeadSourceName(e.target.value)}
                data-testid="input-lead-source-name"
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
              disabled={!leadSourceName.trim()}
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
