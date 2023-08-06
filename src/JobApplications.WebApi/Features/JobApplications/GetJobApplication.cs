using AutoMapper;
using Carter;
using JobApplications.WebApi.Data;
using JobApplications.WebApi.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace JobApplications.WebApi.Features.JobApplications;

public class GetJobApplication : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobapplication/{id}", async (long id, IMediator mediator) =>
            await mediator.Send(new Query(id))
            is Result result
                ? Results.Ok(result)
                : Results.NotFound())
        .Produces<Result>()
        .ProducesProblem(StatusCodes.Status404NotFound);
    }

    public record Query(long Id) : IRequest<IResult>;

    public interface IResult { }

    public record NotFoundResult() : IResult;

    public record Result : IResult
    {
        public int Id { get; init; }

        public string Url { get; init; } = "";

        public string JobId { get; init; } = "";

        public string JobRef { get; init; } = "";

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public JobType JobType { get; init; }

        public string ContactName { get; init; } = "";

        public string Company { get; init; } = "";

        public string Telephone { get; init; } = "";

        public DateTime AppliedDate { get; init; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ApplicationStatus Status { get; init; }

        public string Notes { get; init; } = "";

        public string Title { get; init; } = "";
    }

    public sealed class MappingProfile : Profile
    {
        public MappingProfile() => CreateMap<JobApplication, Result>();
    }

    public class Handler : IRequestHandler<Query, IResult>
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

        public async Task<IResult> Handle(Query request, CancellationToken cancellationToken)
        {
            var model = await _db.JobApplication.SingleOrDefaultAsync(model => model.Id == request.Id, cancellationToken: cancellationToken);

            return model == null
                ? new NotFoundResult()
                : _mapper.Map<Result>(model);
        }
    }
}
