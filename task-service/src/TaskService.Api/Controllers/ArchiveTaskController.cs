using Microsoft.AspNetCore.Mvc;
using TaskService.Application;
using TaskService.Application.Tasks;
using TaskService.Domain;

namespace TaskService.Api.Controllers;

[ApiController]
[Route("tasks/{id}/archive")]
public sealed class ArchiveTaskController(IMediator mediator) : ControllerBase
{
    [HttpPatch]
    public async Task<IActionResult> ArchiveAsync([FromRoute] string id, CancellationToken cancellationToken)
    {
        var task = await mediator
            .ExecuteAsync<ArchiveTaskCommand, WorkTask>(new ArchiveTaskCommand(id), cancellationToken)
            .ConfigureAwait(false);

        return Ok(new
        {
            task.Id,
            task.Title,
            task.ClientName,
            task.Status,
            DueDate = task.DueDate.ToString("yyyy-MM-dd"),
        });
    }
}
