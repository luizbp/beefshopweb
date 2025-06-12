using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Dtos;
using BeefShopAPI.Service.Interfaces;

namespace BeefShopAPI.Service;

public class BuyersService : IBuyersService
{
  private readonly IBuyersRepository _buyersRepository;

  public BuyersService(IBuyersRepository buyersRepository)
  {
    _buyersRepository = buyersRepository;
  }

  public async Task<Buyers> CreateAsync(Buyers buyers)
  {
    return await _buyersRepository.CreateAsync(buyers);
  }

  public async Task<bool> DeleteAsync(int id)
  {
    return await _buyersRepository.DeleteAsync(id);
  }

  public async Task<List<ResponseBuyersDto>> GetAllAsync()
  {
    var lestBuyers = await _buyersRepository.GetAllAsync();

    var responseDto = lestBuyers.Select(buyerItem => new ResponseBuyersDto
    {
      Id = buyerItem.Id,
      Name = buyerItem.Name,
      Document = buyerItem.Document,
      City = buyerItem.City,
      State = buyerItem.State,
      NumberAssociatedOrders = buyerItem.Orders.Count,
    }).ToList();

    return responseDto;
  }

  public async Task<ResponseBuyersDto> GetByIdAsync(int id)
  {
    var buyer = await _buyersRepository.GetByIdAsync(id);

    return new ResponseBuyersDto
    {
      Id = buyer.Id,
      Name = buyer.Name,
      Document = buyer.Document,
      City = buyer.City,
      State = buyer.State,
      NumberAssociatedOrders = buyer.Orders.Count,
    };
  }

  public async Task<Buyers> UpdateAsync(int id, Buyers buyers)
  {
    return await _buyersRepository.UpdateAsync(id, buyers);
  }
}
