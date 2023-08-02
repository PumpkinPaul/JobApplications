using AutoMapper;
using Carter;
using JobApplications.WebApi.Data;
using JobApplications.WebApi.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace JobApplications.WebApi.Features.JobApplications;

public class GetJobApplications : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobapplication", async (IMediator mediator) =>
            await mediator.Send(new Query()))
        .Produces<Result>();
    }

    public record Query() : IRequest<IEnumerable<Result>>;

    public sealed class Result 
    { 
        public int Id { get; init; }

        public string Url { get; init; } = "";

        public string JobId { get; init; } = "";

        public string JobRef { get; init; } = "";

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

    public class Handler : IRequestHandler<Query, IEnumerable<Result>>
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

        public async Task<IEnumerable<Result>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _mapper
                .ProjectTo<Result>(_db.JobApplication)
                .OrderByDescending(viewModel => viewModel.AppliedDate)
                .ToListAsync(cancellationToken);
        }
    }
}
