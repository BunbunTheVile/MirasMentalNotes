
using Microsoft.EntityFrameworkCore;

namespace MirasMentalNotes
{
    public class MirasDbContext : DbContext
    {
        public DbSet<Note> Notes { get; set; } = null!;

        public MirasDbContext(DbContextOptions<MirasDbContext> options) : base(options) { }

        /* TODO: delete
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var config = MirasConfig.Load();
            if (config == null) throw new NullReferenceException("Could not load config from config.json!");

            optionsBuilder.UseNpgsql(config.ConnectionString);
        }
        */
    }
}
