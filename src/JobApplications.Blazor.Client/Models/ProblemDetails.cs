using System.Net;

namespace JobApplications.Blazor.Client.Models;

public class ProblemDetails
{
    public string Type { get; set; } = "";
    public string Title { get; set; } = "There was an error processing your request.";
    public HttpStatusCode Status { get; set; } = HttpStatusCode.InternalServerError;
    public Dictionary<string, IEnumerable<string>> Errors { get; set; } = new();
}