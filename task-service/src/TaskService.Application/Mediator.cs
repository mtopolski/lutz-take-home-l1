using Microsoft.Extensions.DependencyInjection;

namespace TaskService.Application;

public sealed class Mediator(IServiceProvider serviceProvider) : IMediator
{
    public Task<TResult> ExecuteAsync<TCommand, TResult>(TCommand command, CancellationToken cancellationToken = default)
    {
        var handler = serviceProvider.GetRequiredService<ICommandHandler<TCommand, TResult>>();
        return handler.ExecuteAsync(command, cancellationToken);
    }

    public Task<TResult> QueryAsync<TQuery, TResult>(TQuery query, CancellationToken cancellationToken = default)
    {
        var handler = serviceProvider.GetRequiredService<IQueryHandler<TQuery, TResult>>();
        return handler.QueryAsync(query, cancellationToken);
    }
}
