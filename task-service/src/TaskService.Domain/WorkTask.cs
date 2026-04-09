namespace TaskService.Domain;

public sealed class WorkTask
{
    public WorkTask(string id, string title, string clientName, string status, DateOnly dueDate)
    {
        Id = id;
        Title = title;
        ClientName = clientName;
        Status = status;
        DueDate = dueDate;
    }

    public string Id { get; }
    public string Title { get; }
    public string ClientName { get; }
    public string Status { get; }
    public DateOnly DueDate { get; }

    public WorkTask ChangeStatus(string newStatus)
        => new(Id, Title, ClientName, newStatus, DueDate);
}
