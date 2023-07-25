using AutoMapper;
using Carter;
using FluentValidation;
using JobApplications.WebApi.Data;
using JobApplications.WebApi.Models;
using MediatR;
using System.Text.Json.Serialization;

namespace JobApplications.WebApi.Features.JobApplications;

public sealed class CreateJobApplication : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(
            "api/jobapplication",
            async (Command command, IMediator mediator) => await mediator.Send(command)
        )
        .WithName(nameof(CreateJobApplication))
        .WithTags(nameof(JobApplication))
        .Produces(StatusCodes.Status201Created)
        .ProducesValidationProblem();
    }

    public sealed class Command : IRequest<IResult>
    {
        public string Url { get; set; } = "";

        public string JobId { get; set; } = "";

        public string JobRef { get; set; } = "";

        public string ContactName { get; set; } = "";

        public string Telephone { get; set; } = "";

        public string Email { get; set; } = "";

        public string Company { get; set; } = "";

        public DateTime AppliedDate { get; set; } = DateTime.UtcNow;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;

        public string Notes { get; set; } = "";
    }

    public sealed class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(r => r.Url).MaximumLength(255).NotEqual("error");
            RuleFor(r => r.JobId).NotEmpty().MaximumLength(50);
            RuleFor(r => r.JobRef).MaximumLength(50);
            RuleFor(r => r.ContactName).NotEmpty().MaximumLength(50);

            RuleFor(r => r.Telephone).MaximumLength(50);
            RuleFor(r => r.Email).MaximumLength(100);
            RuleFor(r => r.Company).MaximumLength(50);
        }
    }

    public sealed class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Command, JobApplication>();
        }
    }

    public sealed class Handler : IRequestHandler<Command, IResult>
    {
        private readonly JobApplicationContext _db;
        private readonly IMapper _mapper;

        public Handler(
            JobApplicationContext db,
            IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IResult> Handle(Command command, CancellationToken cancellationToken)
        {
            var jobApplication = _mapper.Map<JobApplication>(command);

            _db.JobApplication.Add(jobApplication);
            await _db.SaveChangesAsync(cancellationToken);

            return Results.Created($"api/jobapplication/{jobApplication.Id}", null);
        }
    }
}