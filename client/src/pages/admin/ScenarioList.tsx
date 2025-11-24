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

interface Scenario {
  _id: string;
  name: string;
  department: string;
}

export default function ScenarioList() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScenario, setEditingScenario] = useState<Scenario | null>(null);
  const [scenarioName, setScenarioName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [departments, setDepartments] = useState<
    { _id: string; name: string }[]
  >([]);

  useEffect(() => {
    loadScenarios();
  }, [currentPage, entriesPerPage]);

  const handleAdd = () => {
    setEditingScenario(null);
    setScenarioName("");
    setSelectedDepartment("");
    setIsDialogOpen(true);
  };
  const loadScenarios = () => {
    apiRequest(
      "GET",
      `department/scenario/get-all?page=${currentPage}&limit=${entriesPerPage}
    `
    ).then((data) => {
      setScenarios(data.scenarios);
      setTotalPages(data.totalPages);
      setDepartments(data.departments);
    });
  };

  const handleEdit = (scenario: Scenario) => {
    setEditingScenario(scenario);
    setScenarioName(scenario.name);
    setSelectedDepartment(scenario.department._id);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!scenarioName.trim() || !selectedDepartment) return;

    if (editingScenario) {
      // Edit existing scenario
      apiRequest("PUT", `department/scenario/update/${editingScenario._id}`, {
        name: scenarioName,
        department: selectedDepartment,
      }).then((data) => {
        setScenarios((prev) =>
          prev.map((scen) =>
            scen._id === editingScenario._id ? data.scenario : scen
          )
        );
      });
    } else {
      // Add new scenario
      apiRequest("POST", "department/scenario/create", {
        name: scenarioName,
        department: selectedDepartment,
      }).then((data) => {
        setScenarios((prev) => [...prev, data.scenario]);
      });
    }

    setIsDialogOpen(false);
    setScenarioName("");
    setSelectedDepartment("");
    setEditingScenario(null);
  };

  const handleDelete = (id: number) => {
    apiRequest("DELETE", `department/scenario/delete/${id}`).then(() => {
      setScenarios((prev) => prev.filter((scen) => scen._id !== id));
    });
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setScenarioName("");
    setSelectedDepartment("");
    setEditingScenario(null);
  };

  // Filter scenarios based on search
  const filteredScenarios = scenarios.filter(
    (scenario) =>
      scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scenario List</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Scenario List
              </div>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-add-scenario"
            >
              <Plus className="h-4 w-4 mr-2" />
              Scenario
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
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScenarios.map((scenario, index) => (
                    <TableRow key={scenario._id}>
                      <TableCell className="text-sm">
                        {(currentPage - 1) * parseInt(entriesPerPage) +
                          index +
                          1}
                      </TableCell>
                      <TableCell className="text-sm">{scenario.name}</TableCell>
                      <TableCell className="text-sm">
                        {scenario.department.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            onClick={() => handleEdit(scenario)}
                            data-testid={`button-edit-${scenario._id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDelete(scenario._id)}
                            data-testid={`button-delete-${scenario._id}`}
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
                  scenarios.length
                )}{" "}
                to{" "}
                {Math.min(
                  currentPage * parseInt(entriesPerPage),
                  scenarios.length
                )}{" "}
                of {scenarios.length} entries
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

      {/* Add/Edit Scenario Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-md"
          data-testid="dialog-add-edit-scenario"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {editingScenario ? "Edit Scenario" : "Add Scenario"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="scenario-name">Name</Label>
              <Input
                id="scenario-name"
                placeholder="Admin"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                data-testid="input-scenario-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scenario-department">Department</Label>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger
                  id="scenario-department"
                  data-testid="select-department"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept._id} value={dept._id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              disabled={!scenarioName.trim() || !selectedDepartment}
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
