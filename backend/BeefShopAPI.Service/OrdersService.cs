using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Interfaces;
using BeefShopAPI.Service.Dtos;


namespace BeefShopAPI.Service;

public class OrdersService : IOrdersService
{
  private readonly IOrdersRepository _ordersRepository;

  public OrdersService(IOrdersRepository ordersRepository)
  {
    _ordersRepository = ordersRepository;
  }

  public async Task<Orders> CreateAsync(CreateOrderDto orderDto)
  {

    var vOrderItems = orderDto.OrderItems.Select(itemDto => new OrderItems
    {
      MeatId = itemDto.MeatId,
      Price = itemDto.Price,
      Coin = itemDto.Coin
    }).ToList();

    double totalValue = vOrderItems.Sum(oi => oi.Price);

    var order = new Orders
    {
        OrderDate = orderDto.OrderDate,
        TotalValue = totalValue,
        BuyerId = orderDto.BuyerId,
        OrderItems = vOrderItems
    };

    return await _ordersRepository.CreateAsync(order);
  }

  public async Task<bool> DeleteAsync(int id)
  {
    return await _ordersRepository.DeleteAsync(id);
  }

  public async Task<List<ResponseOrderDto>> GetAllAsync()
  {
    var listOrders = await _ordersRepository.GetAllAsync();

    var responseDto = listOrders.Select(orderItem => new ResponseOrderDto
    {
      Id = orderItem.Id,
      OrderDate = orderItem.OrderDate,
      TotalValue = orderItem.TotalValue,
      BuyerId = orderItem.Buyers.Id,
      Buyer = new ResponseBuyersDto
      {
        Id = orderItem.Buyers.Id,
        Name = orderItem.Buyers.Name,
        Document = orderItem.Buyers.Document,
        City = orderItem.Buyers.City,
        State = orderItem.Buyers.State
      },
      OrderItems = orderItem.OrderItems.Select(item => new OrderItemDto
      {
        MeatId = item.MeatId,
        Price = item.Price,
        Coin = item.Coin
      }).ToList()
    }).ToList();

    return responseDto;
  }

  public async Task<ResponseOrderDto> GetByIdAsync(int id)
  {
    var order = await _ordersRepository.GetByIdAsync(id);

    if (order == null)
    {
      return null;
    }

    // Mapeamento para o DTO de resposta
    var responseDto = new ResponseOrderDto
    {
      Id = order.Id,
      OrderDate = order.OrderDate,
      TotalValue = order.TotalValue,
      BuyerId = order.Buyers.Id,
      Buyer = new ResponseBuyersDto
      {
        Id = order.Buyers.Id,
        Name = order.Buyers.Name,
        Document = order.Buyers.Document,
        City = order.Buyers.City,
        State = order.Buyers.State
      },
      OrderItems = order.OrderItems.Select(item => new OrderItemDto
      {
        MeatId = item.MeatId,
        Price = item.Price,
        Coin = item.Coin
      }).ToList()
    };

    return responseDto;
  }

  public async Task<Orders> UpdateAsync(int id, CreateOrderDto orderDto)
  {

    var vOrderItems = orderDto.OrderItems.Select(itemDto => new OrderItems
    {
      MeatId = itemDto.MeatId,
      Price = itemDto.Price,
      Coin = itemDto.Coin
    }).ToList();

    double totalValue = vOrderItems.Sum(oi => oi.Price);

    var order = new Orders
      {
          OrderDate = orderDto.OrderDate,
          TotalValue = totalValue,
          BuyerId = orderDto.BuyerId,
          OrderItems = vOrderItems,
      };

    return await _ordersRepository.UpdateAsync(id, order);
  }
}
