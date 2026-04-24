import { useState } from "react";

export const TaskItem = ({ task, onUpdate, onDelete, isDeleting }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusToggle = async () => {
    setIsUpdating(true);
    try {
      const newStatus = task.status === "pending" ? "completed" : "pending";
      await onUpdate(task.id, { status: newStatus });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3 border-l-4 border-blue-500 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-800"}`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm mt-2 ${task.status === "completed" ? "text-gray-300" : "text-gray-600"}`}
            >
              {task.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${
                task.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={handleStatusToggle}
            disabled={isUpdating || isDeleting}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition disabled:opacity-50"
          >
            {isUpdating
              ? "..."
              : task.status === "pending"
                ? "Complete"
                : "Undo"}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            disabled={isDeleting || isUpdating}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition disabled:opacity-50"
          >
            {isDeleting ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
