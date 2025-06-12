using BeefShopAPI.Data.Context;
using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace BeefShopAPI.Data.Repositories;

public class OrdersRepository : IOrdersRepository
{
  public readonly BeefShopAPIDbContext _context;

  public OrdersRepository(BeefShopAPIDbContext context)
  {
    _context = context;
  }

  public async Task<Orders> CreateAsync(Orders order)
  {
    _context.Orders.Add(order);

    await _context.SaveChangesAsync();

    return order;
  }

  public async Task<bool> DeleteAsync(int id)
  {

    var orderToDelete = await _context.Orders
    .Include(o => o.OrderItems)
    .FirstOrDefaultAsync(o => o.Id == id);

    if (orderToDelete == null)
    {
      return false;
    }

    _context.OrderItems.RemoveRange(orderToDelete.OrderItems);
    _context.Orders.Remove(orderToDelete);  

    await _context.SaveChangesAsync();

    return true;
  }

  public async Task<List<Orders>> GetAllAsync()
  {
    return await _context.Orders
    .Include(order => order.Buyers)
    .Include(order => order.OrderItems)
    .ToListAsync();
  }

  public async Task<Orders> GetByIdAsync(int id)
  {
    return await _context.Orders
    .Include(order => order.Buyers)
    .Include(order => order.OrderItems)
      .ThenInclude(orderItem => orderItem.Meats)
    .FirstOrDefaultAsync(c => c.Id == id);
  }

  public async Task<Orders> UpdateAsync(int id, Orders order)
  {
    order.Id = id;
    _context.Orders.Update(order);

    await _context.SaveChangesAsync();

    return order;
  }
}