using TaskService.Domain;

namespace TaskService.Application.Tasks;

internal sealed class StartTaskCommandHandler(ITaskRepository repository)
    : ICommandHandler<StartTaskCommand, WorkTask>
{
    public async Task<WorkTask> ExecuteAsync(
        StartTaskCommand command,
        CancellationToken cancellationToken = default)
    {
        var task = await repository.GetByIdAsync(command.TaskId, cancellationToken).ConfigureAwait(false)
            ?? throw new KeyNotFoundException($"Task '{command.TaskId}' not found.");

        var updated = task.ChangeStatus(TaskStatuses.InProgress);
        return await repository.UpdateAsync(updated, cancellationToken).ConfigureAwait(false);
    }
}
