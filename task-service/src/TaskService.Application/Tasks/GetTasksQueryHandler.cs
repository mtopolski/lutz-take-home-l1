using TaskService.Domain;

namespace TaskService.Application.Tasks;

internal sealed class GetTasksQueryHandler(ITaskRepository repository)
    : IQueryHandler<GetTasksQuery, IReadOnlyList<WorkTask>>
{
    public async Task<IReadOnlyList<WorkTask>> QueryAsync(
        GetTasksQuery query,
        CancellationToken cancellationToken = default)
    {
        return await repository.GetTasksAsync(cancellationToken).ConfigureAwait(false);
    }
}
