using BeefShopAPI.Data.Context;
using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace BeefShopAPI.Data.Repositories;

public class BuyersRepository : IBuyersRepository
{
  public readonly BeefShopAPIDbContext _context;

  public BuyersRepository(BeefShopAPIDbContext context)
  {
    _context = context;
  }

  public async Task<Buyers> CreateAsync(Buyers buyers)
  {
    _context.Buyers.Add(buyers);

    await _context.SaveChangesAsync();

    return buyers;
  }

  public async Task<bool> DeleteAsync(int id)
  {

    var buyers = await _context.Buyers.FindAsync(id);
    if (buyers == null)
    {
      return false;
    }

    _context.Buyers.Remove(buyers);

    await _context.SaveChangesAsync();

    return true;
  }

  public async Task<List<Buyers>> GetAllAsync()
  {
    return await _context.Buyers
    .Include(meat => meat.Orders)
    .ToListAsync();
  }

  public async Task<Buyers> GetByIdAsync(int id)
  {
    return await _context.Buyers
    .Include(meat => meat.Orders)
    .FirstOrDefaultAsync(c => c.Id == id);
  }

  public async Task<Buyers> UpdateAsync(int id, Buyers buyers)
  {
    buyers.Id = id;
    _context.Buyers.Update(buyers);

    await _context.SaveChangesAsync();

    return buyers;
  }
}