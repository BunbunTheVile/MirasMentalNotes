using Microsoft.EntityFrameworkCore;
using MirasMentalNotes;

var config = MirasConfig.Load();
if (config == null) throw new NullReferenceException("Config is null!");

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<MirasDbContext>(options => 
    options.UseNpgsql(config.ConnectionString));

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
