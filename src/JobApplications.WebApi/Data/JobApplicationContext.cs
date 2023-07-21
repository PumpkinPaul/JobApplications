using JobApplications.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace JobApplications.WebApi.Data;

public class JobApplicationContext : DbContext
{
    public JobApplicationContext(DbContextOptions<JobApplicationContext> options)
        : base(options)
    {
    }

    public DbSet<JobApplication> JobApplication { get; set; } = default!;
}
