using BeefShopAPI.Model.Entities;

namespace BeefShopAPI.Service.Interfaces;

public interface IMeatService
{
  Task<List<Meats>> getAllAsync();
  Task<Meats> getByIdAsync(int id);
  Task<Meats> CreateAsync(Meats meat);
  Task<Meats> UpdateAsync(int id, Meats meat);
  Task<bool> DeleteAsync(int id);
}