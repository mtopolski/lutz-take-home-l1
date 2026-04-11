using System.Collections.Concurrent;
using TaskService.Application;
using TaskService.Domain;

namespace TaskService.Infrastructure;

public sealed class InMemoryTaskRepository : ITaskRepository
{
    private static readonly List<WorkTask> Seed =
    [
        new("task-001", "2024 Corporate Tax Return",         "Acme Corp",         TaskStatuses.NotStarted, new DateOnly(2025, 4, 15)),
        new("task-002", "Q4 Financial Audit",                "Globex Inc",        TaskStatuses.InProgress, new DateOnly(2025, 3, 31)),
        new("task-003", "Estate Planning Review",            "Wayne Enterprises", TaskStatuses.NotStarted, new DateOnly(2025, 5,  1)),
        new("task-004", "Sales Tax Filing",                  "Initech LLC",       TaskStatuses.InProgress, new DateOnly(2025, 4, 20)),
        new("task-005", "Payroll Reconciliation",            "Umbrella Corp",     TaskStatuses.NotStarted, new DateOnly(2025, 4, 10)),
        new("task-006", "Annual Report Preparation",         "Acme Corp",         TaskStatuses.InProgress, new DateOnly(2025, 6, 15)),
        new("task-007", "Nonprofit Tax Exemption Filing",    "Stark Foundation",  TaskStatuses.NotStarted, new DateOnly(2025, 5, 15)),
        new("task-008", "International Transfer Pricing",    "Globex Inc",        TaskStatuses.NotStarted, new DateOnly(2025, 7,  1)),
    ];

    private readonly ConcurrentDictionary<string, WorkTask> _tasks = new(
        Seed.Select(t => new KeyValuePair<string, WorkTask>(t.Id, t)),
        StringComparer.Ordinal);

    public Task<IReadOnlyList<WorkTask>> GetTasksAsync(CancellationToken cancellationToken = default)
    {
        var all = _tasks.Values
            .OrderBy(t => t.DueDate)
            .ToList();

        return Task.FromResult<IReadOnlyList<WorkTask>>(all);
    }

    public Task<WorkTask?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        _tasks.TryGetValue(id, out var task);
        return Task.FromResult(task);
    }

    public Task<WorkTask> UpdateAsync(WorkTask task, CancellationToken cancellationToken = default)
    {
        _tasks[task.Id] = task;
        return Task.FromResult(task);
    }
}
