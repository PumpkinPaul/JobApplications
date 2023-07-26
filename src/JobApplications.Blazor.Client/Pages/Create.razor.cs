using JobApplications.Blazor.Client.Models;
using Microsoft.AspNetCore.Components;
using Radzen;

namespace JobApplications.Blazor.Client.Pages;

public partial class CreateRazor : ComponentBase
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    [Inject] JobApplicationsClient JobApplicationsClient { get; set; }
    [Inject] NavigationManager NavigationManager { get; set; }
    [Inject] NotificationService NotificationService { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

    protected JobApplication JobApplication { get; set; } = new();
    protected ProblemDetails? ProblemDetails { get; set; }
    protected bool IsBusy { get; set; }
    protected bool HasError { get; set; }

    protected void Cancel()
    {
        NavigationManager.NavigateTo("/");
    }

    protected void OnInvalidSubmit(FormInvalidSubmitEventArgs args)
    {
        Console.WriteLine(args);
    }

    protected async Task OnSubmit(JobApplication mode)
    {
        try
        {
            HasError = false;
            IsBusy = true;

            await JobApplicationsClient.Create(JobApplication);

            NotificationService.Notify(new NotificationMessage
            {
                Severity = NotificationSeverity.Info,
                Summary = "Success",
                Detail = "Job Application Created"
            });

            NavigationManager.NavigateTo("/");
            return;
        }
        catch (HttpRequestException ex)
        {
            ProblemDetails = new ProblemDetails { Title = ex.Message };
        }

        IsBusy = false;
        HasError = true;
    }
}
