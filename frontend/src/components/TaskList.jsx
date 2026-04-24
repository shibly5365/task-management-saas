import { TaskItem } from './TaskItem';

export const TaskList = ({ tasks, onUpdate, onDelete, isDeletingId }) => {
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No tasks yet. Create your first task above!</p>
        </div>
      ) : (
        <>
          {pendingTasks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm mr-2">
                  {pendingTasks.length}
                </span>
                Pending Tasks
              </h3>
              {pendingTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  isDeleting={isDeletingId === task.id}
                />
              ))}
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm mr-2">
                  {completedTasks.length}
                </span>
                Completed Tasks
              </h3>
              {completedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  isDeleting={isDeletingId === task.id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
