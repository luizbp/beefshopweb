using BeefShopAPI.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace BeefShopAPI.Data.Context;

public class BeefShopAPIDbContext : DbContext
{
  public BeefShopAPIDbContext(DbContextOptions<BeefShopAPIDbContext> options) : base(options) { }

  public DbSet<Meats> Meats { get; set; }
  public DbSet<Buyers> Buyers { get; set; }
  public DbSet<Orders> Orders { get; set; }
  public DbSet<OrderItems> OrderItems { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<OrderItems>().HasKey(oi => new { oi.OrderId, oi.MeatId });

    modelBuilder.Entity<OrderItems>()
    .HasOne(oi => oi.Orders)
    .WithMany(o => o.OrderItems)
    .HasForeignKey(oi => oi.OrderId);

    modelBuilder.Entity<OrderItems>()
    .HasOne(oi => oi.Meats)
    .WithMany(m => m.OrderItems)
    .HasForeignKey(oi => oi.MeatId);

    modelBuilder.Entity<Orders>()
    .HasOne(o => o.Buyers)
    .WithMany(b => b.Orders)
    .HasForeignKey(o => o.BuyerId);
  }
}