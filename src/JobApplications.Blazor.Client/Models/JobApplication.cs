using System.Text.Json.Serialization;

namespace JobApplications.Blazor.Client.Models;

public class JobApplication
{
    public int Id { get; init; }

    public string JobId { get; set; } = "";

    public string JobRef { get; set; } = "";

    public string Url { get; set; } = "";

    public string ContactName { get; set; } = "";

    public string Telephone { get; set; } = "";

    public string Email { get; set; } = "";

    public string Company { get; set; } = "";

    public DateTime AppliedDate { get; set; } = DateTime.UtcNow;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ApplicationStatus Status { get; set; }

    public string Notes { get; set; } = "";

    public string Title => Url.Split('/').Last();
}