namespace TaskService.Application;

public interface ICommandHandler<TCommand, TResult>
{
    Task<TResult> ExecuteAsync(TCommand command, CancellationToken cancellationToken = default);
}
