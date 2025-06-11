using BeefShopAPI.Model.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BeefShopAPI.Data.Repositories.Interfaces;

public interface IMeatRepository
{
  Task<Meats> GetByIdAsync(int id);
  Task<List<Meats>> GetAllAsync();
  Task<Meats> CreateAsync(Meats meat);
  Task<Meats> UpdateAsync(int id, Meats meat);
  Task<bool> DeleteAsync(int id);

}