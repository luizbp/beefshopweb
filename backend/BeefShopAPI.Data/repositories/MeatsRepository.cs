using BeefShopAPI.Data.Context;
using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace BeefShopAPI.Data.Repositories;

public class MeatRepository : IMeatRepository
{
  public readonly BeefShopAPIDbContext _context;

  public MeatRepository(BeefShopAPIDbContext context)
  {
    _context = context;
  }

  public async Task<Meats> CreateAsync(Meats meat)
  {
    _context.Meats.Add(meat);

    await _context.SaveChangesAsync();

    return meat;
  }

  public async Task<bool> DeleteAsync(int id)
  {

    var meat = await _context.Meats.FindAsync(id);
    if (meat == null)
    {
      return false;
    }

    _context.Meats.Remove(meat);

    await _context.SaveChangesAsync();

    return true;
  }

  public async Task<List<Meats>> GetAllAsync()
  {
    return await _context.Meats.ToListAsync();
  }

  public async Task<Meats> GetByIdAsync(int id)
  {
    return await _context.Meats.FirstOrDefaultAsync(c => c.Id == id);
  }

  public async Task<Meats> UpdateAsync(int id, Meats meat)
  {
    meat.Id = id;
    _context.Meats.Update(meat);

    await _context.SaveChangesAsync();

    return meat;
  }
}