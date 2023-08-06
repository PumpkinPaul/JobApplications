using Carter;
using FluentValidation;
using JobApplications.WebApi.Data;
using JobApplications.WebApi.Models;
using MediatR;
using System.Text.Json.Serialization;

namespace JobApplications.WebApi.Features.JobApplications;

public sealed class EditJobApplication : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPatch(
            "api/jobapplication/{id}",
            async (Command command, IMediator mediator) => await mediator.Send(command)
        )
        .WithName(nameof(EditJobApplication))
        .WithTags(nameof(JobApplication))
        .Produces(StatusCodes.Status204NoContent)
        .ProducesValidationProblem();
    }

    public sealed class Command : IRequest<IResult>
    {
        public int Id { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;

        public string Notes { get; set; } = "";
    }

    public sealed class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(r => r.Status).IsInEnum();
        }
    }

    public sealed class Handler : IRequestHandler<Command, IResult>
    {
        private readonly JobApplicationContext _db;

        public Handler(
            JobApplicationContext db)
        {
            _db = db;
        }

        public async Task<IResult> Handle(Command command, CancellationToken cancellationToken)
        {
            var jobApplication = await _db.JobApplication.FindAsync(new object?[] { command.Id }, cancellationToken: cancellationToken);

            if (jobApplication == null)
                return Results.NotFound();

            jobApplication.Notes = command.Notes;
            jobApplication.Status = command.Status;

            await _db.SaveChangesAsync(cancellationToken);

            return Results.NoContent();
        }
    }
}