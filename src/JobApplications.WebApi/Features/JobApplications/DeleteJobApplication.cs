using Carter;
using JobApplications.WebApi.Data;
using MediatR;

namespace JobApplications.WebApi.Features.JobApplications;

public class DeleteJobApplication : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/jobapplication/{id}", async (int id, IMediator mediator) =>
            await mediator.Send(new Command(id)))
        .Produces(StatusCodes.Status204NoContent)
        .ProducesProblem(StatusCodes.Status404NotFound);
    }

    public record Command(int Id) : IRequest<IResult>;

    public class Handler : IRequestHandler<Command, IResult>
    {
        private readonly JobApplicationContext _db;

        public Handler(
            JobApplicationContext db)
        {
            _db = db;
        }

        public async Task<IResult> Handle(Command command, CancellationToken cancellationToken)
        {
            var jobApplication = await _db.JobApplication.FindAsync(command.Id);
            if (jobApplication == null)
                return Results.NotFound();

            _db.JobApplication.Remove(jobApplication);            
            await _db.SaveChangesAsync();

            return Results.NoContent();
        }
    }
}
