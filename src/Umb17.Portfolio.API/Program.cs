using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;

const string ReactDevCorsPolicy = "ReactDev";

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(ReactDevCorsPolicy, policy =>
    {
        policy
            .WithOrigins("https://localhost:6317")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();


await app.BootUmbracoAsync();


app.UseCors(ReactDevCorsPolicy);

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

app.MapGet("/", () => Results.Content(
    """
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Umb17 Portfolio API</title>
      <style>
        :root { color-scheme: dark; }
        body { font-family: system-ui, sans-serif; max-width: 760px; margin: 4rem auto; padding: 0 1.5rem; line-height: 1.55; color: #e7edf3; background: #111821; }
        h1 { color: #f8fafc; }
        p, li { color: #c8d2dc; }
        code { background: #1d2733; color: #f1f5f9; padding: .15rem .35rem; border-radius: .25rem; }
        a { color: #67d4f3; }
        a:hover { color: #a7ecff; }
      </style>
    </head>
    <body>
      <h1>Umb17 Portfolio API</h1>
      <h3>Sharmaine is one <strong style="color: pink">sexy ass <underline>BITCH</underline>!</strong></h3>
      <p>This is the Umbraco 17 LTS backoffice and headless API host for the portfolio site.</p>
      <ul>
        <li>Backoffice: <a href="/umbraco">/umbraco</a></li>
        <li>Delivery API Swagger, in development: <a href="/umbraco/swagger">/umbraco/swagger</a></li>
        <li>Content endpoint, after content is created: <code>/umbraco/delivery/api/v2/content</code></li>
        <li>React dev frontend: <a href="https://localhost:6317">https://localhost:6317</a></li>
      </ul>
      <p>The React frontend is intentionally separate so it can build and deploy independently.</p>
    </body>
    </html>
    """,
    "text/html"));

app.MapGet("/api/frontend/manifest", async (
    IContentTypeService contentTypeService,
    IDataTypeService dataTypeService) =>
{
    List<FrontendContentTypeManifest> contentTypes = [];

    foreach (var contentType in contentTypeService
        .GetAll()
        .OrderBy(contentType => contentType.Alias))
    {
        List<FrontendPropertyManifest> properties = [];

        foreach (var propertyType in contentType.PropertyTypes.OrderBy(propertyType => propertyType.Alias))
        {
            IDataType? dataType = await dataTypeService.GetAsync(propertyType.DataTypeKey);

            properties.Add(new FrontendPropertyManifest(
                propertyType.Alias,
                propertyType.Name,
                propertyType.PropertyEditorAlias,
                propertyType.ValueStorageType.ToString(),
                propertyType.DataTypeId,
                dataType?.Name,
                dataType?.EditorAlias,
                dataType?.EditorUiAlias,
                dataType?.ConfigurationObject,
                propertyType.Mandatory,
                propertyType.Variations.HasFlag(ContentVariation.Culture),
                propertyType.Variations.HasFlag(ContentVariation.Segment),
                propertyType.SortOrder));
        }

        contentTypes.Add(new FrontendContentTypeManifest(
            contentType.Alias,
            contentType.Name,
            contentType.IsElement,
            properties.ToArray()));
    }

    return Results.Ok(new FrontendManifest(DateTimeOffset.UtcNow, contentTypes));
});

await app.RunAsync();

public sealed record FrontendManifest(
    DateTimeOffset GeneratedAt,
    IReadOnlyCollection<FrontendContentTypeManifest> ContentTypes);

public sealed record FrontendContentTypeManifest(
    string Alias,
    string? Name,
    bool IsElement,
    FrontendPropertyManifest[] Properties);

public sealed record FrontendPropertyManifest(
    string Alias,
    string? Name,
    string PropertyEditorAlias,
    string ValueStorageType,
    int DataTypeId,
    string? DataTypeName,
    string? DataTypeEditorAlias,
    string? DataTypeEditorUiAlias,
    object? DataTypeConfiguration,
    bool Mandatory,
    bool VariesByCulture,
    bool VariesBySegment,
    int SortOrder);
