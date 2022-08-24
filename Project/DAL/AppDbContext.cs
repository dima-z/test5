using Microsoft.EntityFrameworkCore;

namespace Project.DAL
{
  public class AppDbContext : DbContext
  {
    public DbSet<KeyValue> Values
    {
      get; set;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer(@"Server=.\;Database=WebApp;Trusted_Connection=yes;");

  }
}
