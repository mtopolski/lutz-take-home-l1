using Microsoft.AspNetCore.Mvc;
using TaskService.Application;
using TaskService.Application.Tasks;
using TaskService.Domain;

namespace TaskService.Api.Controllers;

[ApiController]
[Route("tasks")]
public sealed class GetTasksController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAsync(CancellationToken cancellationToken)
    {
        var tasks = await mediator
            .QueryAsync<GetTasksQuery, IReadOnlyList<WorkTask>>(new GetTasksQuery(), cancellationToken)
            .ConfigureAwait(false);

        var dtos = tasks.Select(t => new
        {
            t.Id,
            t.Title,
            t.ClientName,
            t.Status,
            DueDate = t.DueDate.ToString("yyyy-MM-dd"),
        });

        return Ok(dtos);
    }
}
