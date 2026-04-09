using Microsoft.AspNetCore.Mvc;
using TaskService.Application;
using TaskService.Application.Tasks;
using TaskService.Domain;

namespace TaskService.Api.Controllers;

[ApiController]
[Route("tasks/{id}/complete")]
public sealed class CompleteTaskController(IMediator mediator) : ControllerBase
{
    [HttpPatch]
    public async Task<IActionResult> CompleteAsync([FromRoute] string id, CancellationToken cancellationToken)
    {
        var task = await mediator
            .ExecuteAsync<CompleteTaskCommand, WorkTask>(new CompleteTaskCommand(id), cancellationToken)
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
