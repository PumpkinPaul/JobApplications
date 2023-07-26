using JobApplications.Blazor.Client.Models;
using System.Net.Http.Json;

namespace JobApplications.Blazor.Client;

public class JobApplicationsClient
{
    private readonly HttpClient _httpClient;

    public JobApplicationsClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<JobApplication>> Get()
    {
        return (List<JobApplication>)(await _httpClient.GetFromJsonAsync("jobapplication", typeof(List<JobApplication>)) ?? new());
    }

    public async Task Edit(EditJobApplicationState state)
    {
        var response = await _httpClient.PatchAsJsonAsync($"jobapplication/{state.Id}", state);
        response.EnsureSuccessStatusCode();
    }

    public async Task Delete(int id)
    {
        var response = await _httpClient.DeleteAsync($"jobapplication/{id}");
        response.EnsureSuccessStatusCode();
    }

    public async Task Create(JobApplication jobApplication)
    {
        var response = await _httpClient.PostAsJsonAsync("jobapplication", jobApplication);
        response.EnsureSuccessStatusCode();
    }
}
