using BeefShopAPI.Data.Context;
using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace BeefShopAPI.Data.Repositories;

public class OrderItemsRepository : IOrderItemsRepository
{
  public readonly BeefShopAPIDbContext _context;

  public OrderItemsRepository(BeefShopAPIDbContext context)
  {
    _context = context;
  }

  public async Task<OrderItems> CreateAsync(OrderItems orderItem)
  {
    _context.OrderItems.Add(orderItem);

    await _context.SaveChangesAsync();

    return orderItem;
  }

  public async Task<bool> DeleteAsync(int orderId, int meatId)
  {

    var orderItem = await _context.OrderItems.FindAsync(orderId, meatId);
    if (orderItem == null)
    {
      return false;
    }

    _context.OrderItems.Remove(orderItem);

    await _context.SaveChangesAsync();

    return true;
  }

  public async Task<List<OrderItems>> GetAllAsync()
  {
    return await _context.OrderItems
    .Include(orderItem => orderItem.Meats)
    .ToListAsync();
  }

  public async Task<OrderItems> GetByIdAsync(int orderId, int meatId)
  {
    return await _context.OrderItems
    .Include(orderItem => orderItem.Meats)
    .FirstOrDefaultAsync(c => c.MeatId == meatId && c.OrderId == orderId);
  }

  public async Task<OrderItems> UpdateAsync(int orderId, int meatId, OrderItems orderItem)
  {
    orderItem.OrderId = orderId;
    orderItem.MeatId = meatId;

    _context.OrderItems.Update(orderItem);

    await _context.SaveChangesAsync();

    return orderItem;
  }
}