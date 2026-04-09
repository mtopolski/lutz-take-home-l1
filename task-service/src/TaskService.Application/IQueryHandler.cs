namespace TaskService.Application;

public interface IQueryHandler<TQuery, TResult>
{
    Task<TResult> QueryAsync(TQuery query, CancellationToken cancellationToken = default);
}
