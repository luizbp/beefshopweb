using BeefShopAPI.Model.Entities;

namespace BeefShopAPI.Data.Repositories.Interfaces;

public interface IBuyersRepository
{
  Task<Buyers> GetByIdAsync(int id);
  Task<List<Buyers>> GetAllAsync();
  Task<Buyers> CreateAsync(Buyers meat);
  Task<Buyers> UpdateAsync(int id, Buyers meat);
  Task<bool> DeleteAsync(int id);

}