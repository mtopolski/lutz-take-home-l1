using TaskService.Domain;

namespace TaskService.Application;

public interface ITaskRepository
{
    Task<IReadOnlyList<WorkTask>> GetTasksAsync(CancellationToken cancellationToken = default);
    Task<WorkTask?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<WorkTask> UpdateAsync(WorkTask task, CancellationToken cancellationToken = default);
}
