using TaskService.Domain;

namespace TaskService.Application.Tasks;

internal sealed class RestoreTaskCommandHandler(ITaskRepository repository)
    : ICommandHandler<RestoreTaskCommand, WorkTask>
{
    public async Task<WorkTask> ExecuteAsync(
        RestoreTaskCommand command,
        CancellationToken cancellationToken = default)
    {
        var task = await repository.GetByIdAsync(command.TaskId, cancellationToken).ConfigureAwait(false)
            ?? throw new KeyNotFoundException($"Task '{command.TaskId}' not found.");

        var updated = task.ChangeStatus(TaskStatuses.NotStarted);
        return await repository.UpdateAsync(updated, cancellationToken).ConfigureAwait(false);
    }
}