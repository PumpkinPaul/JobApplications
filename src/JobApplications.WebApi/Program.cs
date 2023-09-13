//https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/overview?view=aspnetcore-7.0
//https://github.com/isaacOjeda/MinimalApiArchitecture

using Carter;
using FluentValidation;
using JobApplications.WebApi.Data;
using JobApplications.WebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

const string ALLOW_ANY_CORS_POLICY= "AllowAnyCorsPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = "Server=localhost\\SQLEXPRESS;Database=JobApplications;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true;";

builder.Services.AddControllers();
builder.Services.AddDbContext<JobApplicationContext>(options =>
//builder.Configuration.GetConnectionString(nameof(JobApplicationContext))
    options.UseSqlServer(connectionString
        ?? throw new InvalidOperationException($"Connection string '{nameof(JobApplicationContext)}' not found."))); ;

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt => opt.CustomSchemaIds(s => s?.FullName?.Replace("+", ".")));
builder.Services.AddApplicationInsightsTelemetry();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
builder.Services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationPipelineBehavior<,>));
builder.Services.AddProblemDetails(cfg =>
{
    cfg.CustomizeProblemDetails = ctx =>
        ctx.ProblemDetails.Instance = ctx.HttpContext.TraceIdentifier ?? Guid.NewGuid().ToString();
});
builder.Services.AddValidatorsFromAssemblyContaining(typeof(Program));
builder.Services.AddCarter();
builder.Services.AddCors(options =>
{
    options.AddPolicy(ALLOW_ANY_CORS_POLICY, builder =>
    {
        builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors(ALLOW_ANY_CORS_POLICY);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
else
{
    //Hide unhandled errors from caller in release environments
    app.UseExceptionHandler(
        exceptionHandlerApp => exceptionHandlerApp.Run(
            async context => await Results.Problem().ExecuteAsync(context)));
}

app.UseStatusCodePages();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapCarter();
app.Run();
