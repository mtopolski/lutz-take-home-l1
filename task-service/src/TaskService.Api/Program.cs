using TaskService.Application;
using TaskService.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()));

builder.Services.AddInfrastructure();
builder.Services.AddApplication();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors();
app.Use(async (context, next) =>
{
    await Task.Delay(Random.Shared.Next(500, 1501)).ConfigureAwait(false);
    await next(context).ConfigureAwait(false);
});
app.MapControllers();

await app.RunAsync().ConfigureAwait(false);
