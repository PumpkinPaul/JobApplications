using System.ComponentModel.DataAnnotations;

namespace JobApplications.WebApi.Models;

public class JobApplication
{
    public int Id { get; set; }

    [Required]
    [MaxLength(128)]
    public string Title { get; set; } = "";

    [MaxLength(255)]
    public string Url { get; set; } = "";

    [MaxLength(50)]
    public string JobId { get; set; } = "";

    [MaxLength(50)]
    public string JobRef { get; set; } = "";

    [Required]
    public JobType JobType { get; set; } = JobType.Contract;

    [Required]
    [MaxLength(50)]
    public string ContactName { get; set; } = "";

    [MaxLength(50)]
    public string Telephone { get; set; } = "";

    [MaxLength(100)]
    public string Email { get; set; } = "";

    [MaxLength(50)]
    public string Company { get; set; } = "";

    [Required]
    public DateTime AppliedDate { get; set; } = DateTime.UtcNow;

    public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;

    public string Notes { get; set; } = "";
}
