using BeefShopAPI.Model.Entities;

namespace BeefShopAPI.Service.Interfaces;

public interface IOrderItemsService
{
  Task<List<OrderItems>> GetAllAsync();
  Task<OrderItems> GetByIdAsync(int orderId, int meatId);
  Task<OrderItems> CreateAsync(OrderItems order);
  Task<OrderItems> UpdateAsync(int orderId, int meatId, OrderItems order);
  Task<bool> DeleteAsync(int orderId, int meatId);
}