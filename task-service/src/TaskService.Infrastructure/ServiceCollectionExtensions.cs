using Microsoft.Extensions.DependencyInjection;
using TaskService.Application;

namespace TaskService.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        return services.AddSingleton<ITaskRepository, InMemoryTaskRepository>();
    }
}
