using BeefShopAPI.Model.Entities;

namespace BeefShopAPI.Data.Repositories.Interfaces;

public interface IMeatRepository
{
  Task<Meats> GetByIdAsync(int id);
  Task<List<Meats>> GetAllAsync();
  Task<Meats> CreateAsync(Meats meat);
  Task<Meats> UpdateAsync(int id, Meats meat);
  Task<bool> DeleteAsync(int id);

}