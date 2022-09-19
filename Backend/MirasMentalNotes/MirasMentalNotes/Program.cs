using Microsoft.EntityFrameworkCore;
using MirasMentalNotes;

var config = MirasConfig.Load();
if (config == null) throw new NullReferenceException("Config is null!");

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<MirasDbContext>(options => 
    options.UseNpgsql(config.ConnectionString));

if (builder.Environment.IsDevelopment())
{
    Console.WriteLine("IT'S DEVELOPMENT");

    builder.Services.AddCors(options =>
    {
        options.AddPolicy(
            name: "AllowAllOrigins",
            policy =>
            {
                policy.AllowAnyOrigin();
                policy.AllowAnyMethod();
                policy.AllowAnyHeader();
            });
    });
}

var app = builder.Build();

app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
