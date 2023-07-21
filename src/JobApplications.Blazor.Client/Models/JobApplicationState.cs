using System.Text.Json.Serialization;

namespace JobApplications.Blazor.Client.Models;

public class JobApplicationState
{
    public JobApplication? JobApplication { get; init; }
}