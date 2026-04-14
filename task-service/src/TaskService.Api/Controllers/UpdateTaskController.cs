using Microsoft.AspNetCore.Mvc;
using TaskService.Application;
using TaskService.Application.Tasks;
using TaskService.Domain;

namespace TaskService.Api.Controllers;

public sealed record UpdateTaskRequest(string Status);

[ApiController]
[Route("tasks/{id}")]
public sealed class UpdateTaskController(IMediator mediator) : ControllerBase
{
  [HttpPatch]
  public async Task<IActionResult> UpdateAsync([FromRoute] string id, [FromBody] UpdateTaskRequest request, CancellationToken cancellationToken)
  {
    if (request.Status is not (TaskStatuses.Completed or TaskStatuses.Archived or TaskStatuses.InProgress))
        return BadRequest($"Invalid status: {request.Status}");
    
    WorkTask task = request.Status switch
    {
      TaskStatuses.Completed => await mediator
          .ExecuteAsync<CompleteTaskCommand, WorkTask>(new CompleteTaskCommand(id), cancellationToken)
          .ConfigureAwait(false),
      TaskStatuses.InProgress => await mediator
          .ExecuteAsync<StartTaskCommand, WorkTask>(new StartTaskCommand(id), cancellationToken)
          .ConfigureAwait(false),
      _ => await mediator
          .ExecuteAsync<ArchiveTaskCommand, WorkTask>(new ArchiveTaskCommand(id), cancellationToken)
          .ConfigureAwait(false),
    };
    
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
