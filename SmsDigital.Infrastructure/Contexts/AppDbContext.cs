using Microsoft.EntityFrameworkCore;
using SmsDigital.Infrastructure.Entities;
using System.Collections.Generic;
using System.IO;

namespace SmsDigital.Infrastructure.Contexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        //entities
        public DbSet<City> Cities { get; set; }
    }
}
