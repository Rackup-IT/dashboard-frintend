import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const initialScenarios = [
  { id: 1, name: "New", department: "Sales" },
  { id: 2, name: "Used", department: "Sales" },
  { id: 3, name: "Open To Options", department: "Sales" },
  { id: 4, name: "Buyback", department: "Sales" },
  { id: 5, name: "Unsold", department: "Sales" },
];

export default function ScenarioList() {
  const [scenarios, setScenarios] = useState(initialScenarios);

  const handleEdit = (id: number) => {
    console.log("Edit scenario:", id);
  };

  const handleDelete = (id: number) => {
    setScenarios(prev => prev.filter(scenario => scenario.id !== id));
  };

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    {
      key: "actions",
      label: "Action",
      render: (_: any, row: any) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={() => handleEdit(row.id)}
          >
            <Edit className="mr-1 h-3 w-3" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 className="mr-1 h-3 w-3" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={scenarios}
      searchPlaceholder="Search scenarios..."
      addButtonLabel="Scenario"
      onAdd={() => console.log("Add scenario")}
    />
  );
}
