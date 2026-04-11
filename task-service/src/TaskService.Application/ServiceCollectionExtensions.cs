using Microsoft.Extensions.DependencyInjection;
using TaskService.Application.Tasks;
using TaskService.Domain;

namespace TaskService.Application;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services
            .AddSingleton<IMediator, Mediator>()
            .AddSingleton<IQueryHandler<GetTasksQuery, IReadOnlyList<WorkTask>>, GetTasksQueryHandler>()
            .AddSingleton<ICommandHandler<CompleteTaskCommand, WorkTask>, CompleteTaskCommandHandler>()
            .AddSingleton<ICommandHandler<ArchiveTaskCommand, WorkTask>, ArchiveTaskCommandHandler>()
            .AddSingleton<ICommandHandler<StartTaskCommand, WorkTask>, StartTaskCommandHandler>();
    }
}
