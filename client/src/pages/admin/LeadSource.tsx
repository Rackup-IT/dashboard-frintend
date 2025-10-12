import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const initialLeadSources = [
  { id: 1, name: "Internet" },
  { id: 2, name: "Phone Up" },
  { id: 3, name: "Service Drive" },
  { id: 4, name: "Database" },
];

export default function LeadSource() {
  const [leadSources, setLeadSources] = useState(initialLeadSources);

  const handleEdit = (id: number) => {
    console.log("Edit lead source:", id);
  };

  const handleDelete = (id: number) => {
    setLeadSources(prev => prev.filter(source => source.id !== id));
  };

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
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
      data={leadSources}
      searchPlaceholder="Search lead sources..."
      addButtonLabel="Lead Source"
      onAdd={() => console.log("Add lead source")}
    />
  );
}
