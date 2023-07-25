using System.Text.Json.Serialization;

namespace JobApplications.Blazor.Client.Models;

public class EditJobApplicationState
{
    public int Id { get; set; } = -1;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;

    public string Notes { get; set; } = "";
}