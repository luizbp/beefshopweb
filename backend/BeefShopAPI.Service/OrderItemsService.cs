using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Interfaces;

namespace BeefShopAPI.Service;

public class OrderItemsService : IOrderItemsService
{
  private readonly IOrderItemsRepository _orderItemsRepository;

  public OrderItemsService(IOrderItemsRepository orderItemsRepository)
  {
    _orderItemsRepository = orderItemsRepository;
  }

  public async Task<OrderItems> CreateAsync(OrderItems orderItem)
  {
    return await _orderItemsRepository.CreateAsync(orderItem);
  }

  public async Task<bool> DeleteAsync(int orderId, int meatId)
  {
    return await _orderItemsRepository.DeleteAsync(orderId, meatId);
  }

  public async Task<List<OrderItems>> GetAllAsync()
  {
    return await _orderItemsRepository.GetAllAsync();
  }

  public async Task<OrderItems> GetByIdAsync(int orderId, int meatId)
  {
    return await _orderItemsRepository.GetByIdAsync(orderId, meatId);
  }

  public async Task<OrderItems> UpdateAsync(int orderId, int meatId, OrderItems orderItem)
  {
    return await _orderItemsRepository.UpdateAsync(orderId, meatId, orderItem);
  }
}
