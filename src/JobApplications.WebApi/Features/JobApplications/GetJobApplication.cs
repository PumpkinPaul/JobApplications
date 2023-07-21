using AutoMapper;
using Carter;
using JobApplications.WebApi.Data;
using JobApplications.WebApi.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

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
        public int Id { get; set; }

        public string Url { get; set; } = "";

        public string UrlDisplay => Url.Split('/').Last();

        [DisplayName("Contact")]
        public string ContactName { get; set; } = "";

        public string Telephone { get; set; } = "";

        [DisplayName("Applied")]
        [DisplayFormat(DataFormatString = "{0:d}")]
        public DateTime AppliedDate { get; set; } = DateTime.UtcNow;

        [DisplayName("Status")]
        public required string StatusDescription { get; set; }
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
