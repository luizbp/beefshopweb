using BeefShopAPI.Model.Entities;

namespace BeefShopAPI.Data.Repositories.Interfaces;

public interface IOrdersRepository
{
  Task<Orders> GetByIdAsync(int id);
  Task<List<Orders>> GetAllAsync();
  Task<Orders> CreateAsync(Orders order);
  Task<Orders> UpdateAsync(int id, Orders order);
  Task<bool> DeleteAsync(int id);

}