using BeefShopAPI.Model.Entities;

namespace BeefShopAPI.Data.Repositories.Interfaces;

public interface IOrderItemsRepository
{
  Task<OrderItems> GetByIdAsync(int orderId, int meatId);
  Task<List<OrderItems>> GetAllAsync();
  Task<OrderItems> CreateAsync(OrderItems orderItem);
  Task<OrderItems> UpdateAsync(int orderId, int meatId, OrderItems orderItem);
  Task<bool> DeleteAsync(int orderId, int meatId);

}