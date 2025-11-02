import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface Scenario {
  id: number;
  name: string;
  department: string;
}

const departments = ["Sales", "SZS", "Data Mining", "Campaign", "Follow Up", "Confirmations"];

const initialScenarios: Scenario[] = [
  { id: 1, name: "New", department: "Sales" },
  { id: 2, name: "Used", department: "Sales" },
  { id: 3, name: "Open To Options", department: "Sales" },
  { id: 4, name: "Buyback", department: "Sales" },
  { id: 5, name: "Unsold", department: "Sales" },
  { id: 6, name: "Information Day", department: "Sales" },
  { id: 7, name: "Walking Over", department: "SZS" },
  { id: 8, name: "In Waiting Room", department: "SZS" },
  { id: 9, name: "Upon Pick Up", department: "SZS" },
  { id: 10, name: "Upcoming Service Appointment", department: "SZS" },
];

export default function ScenarioList() {
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScenario, setEditingScenario] = useState<Scenario | null>(null);
  const [scenarioName, setScenarioName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleAdd = () => {
    setEditingScenario(null);
    setScenarioName("");
    setSelectedDepartment("");
    setIsDialogOpen(true);
  };

  const handleEdit = (scenario: Scenario) => {
    setEditingScenario(scenario);
    setScenarioName(scenario.name);
    setSelectedDepartment(scenario.department);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!scenarioName.trim() || !selectedDepartment) return;

    if (editingScenario) {
      // Edit existing scenario
      setScenarios(prev =>
        prev.map(scenario =>
          scenario.id === editingScenario.id
            ? { ...scenario, name: scenarioName, department: selectedDepartment }
            : scenario
        )
      );
    } else {
      // Add new scenario
      const newScenario: Scenario = {
        id: Math.max(...scenarios.map(s => s.id), 0) + 1,
        name: scenarioName,
        department: selectedDepartment,
      };
      setScenarios(prev => [...prev, newScenario]);
    }

    setIsDialogOpen(false);
    setScenarioName("");
    setSelectedDepartment("");
    setEditingScenario(null);
  };

  const handleDelete = (id: number) => {
    setScenarios(prev => prev.filter(scenario => scenario.id !== id));
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setScenarioName("");
    setSelectedDepartment("");
    setEditingScenario(null);
  };

  // Filter scenarios based on search
  const filteredScenarios = scenarios.filter(scenario =>
    scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scenario.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredScenarios.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentScenarios = filteredScenarios.slice(startIndex, endIndex);

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
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentScenarios.map((scenario, index) => (
                    <TableRow key={scenario.id}>
                      <TableCell className="text-sm">{startIndex + index + 1}</TableCell>
                      <TableCell className="text-sm">{scenario.name}</TableCell>
                      <TableCell className="text-sm">{scenario.department}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            onClick={() => handleEdit(scenario)}
                            data-testid={`button-edit-${scenario.id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDelete(scenario.id)}
                            data-testid={`button-delete-${scenario.id}`}
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
                Showing {startIndex + 1} to {Math.min(endIndex, filteredScenarios.length)} of {filteredScenarios.length} entries
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

      {/* Add/Edit Scenario Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md" data-testid="dialog-add-edit-scenario">
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
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger id="scenario-department" data-testid="select-department">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
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
