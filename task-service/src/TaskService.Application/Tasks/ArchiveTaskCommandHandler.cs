using TaskService.Domain;

namespace TaskService.Application.Tasks;

internal sealed class ArchiveTaskCommandHandler(ITaskRepository repository)
    : ICommandHandler<ArchiveTaskCommand, WorkTask>
{
    public async Task<WorkTask> ExecuteAsync(
        ArchiveTaskCommand command,
        CancellationToken cancellationToken = default)
    {
        var task = await repository.GetByIdAsync(command.TaskId, cancellationToken).ConfigureAwait(false)
            ?? throw new KeyNotFoundException($"Task '{command.TaskId}' not found.");

        var updated = task.ChangeStatus(TaskStatuses.Completed);
        return await repository.UpdateAsync(updated, cancellationToken).ConfigureAwait(false);
    }
}
