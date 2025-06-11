using BeefShopAPI.Model.Entities;

namespace BeefShopAPI.Service.Interfaces;

public interface IBuyersService
{
  Task<List<Buyers>> getAllAsync();
  Task<Buyers> getByIdAsync(int id);
  Task<Buyers> CreateAsync(Buyers buyers);
  Task<Buyers> UpdateAsync(int id, Buyers buyers);
  Task<bool> DeleteAsync(int id);
}