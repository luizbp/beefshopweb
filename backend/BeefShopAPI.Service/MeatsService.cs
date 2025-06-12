using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Dtos;
using BeefShopAPI.Service.Interfaces;

namespace BeefShopAPI.Service;

public class MeatService : IMeatService
{
  private readonly IMeatRepository _meatRepository;

  public MeatService(IMeatRepository meatRepository)
  {
    _meatRepository = meatRepository;
  }

  public async Task<Meats> CreateAsync(Meats meat)
  {
    return await _meatRepository.CreateAsync(meat);
  }

  public async Task<bool> DeleteAsync(int id)
  {
    return await _meatRepository.DeleteAsync(id);
  }

  public async Task<List<ResponseMeatsDto>> GetAllAsync()
  {
    var listMeats = await _meatRepository.GetAllAsync();
    
    var responseDto = listMeats.Select(meatItem => new ResponseMeatsDto
    {
      Id = meatItem.Id,
      MeatType = meatItem.MeatType,
      Description = meatItem.Description,
      NumberAssociatedOrders = meatItem.OrderItems.Count,
    }).ToList();

    return responseDto;
  }

  public async Task<ResponseMeatsDto> GetByIdAsync(int id)
  {
    var meat = await _meatRepository.GetByIdAsync(id);

    return new ResponseMeatsDto
    {
      Id = meat.Id,
      MeatType = meat.MeatType,
      Description = meat.Description,
      NumberAssociatedOrders = meat.OrderItems.Count,
    };
  }

  public async Task<Meats> UpdateAsync(int id, Meats meat)
  {
    return await _meatRepository.UpdateAsync(id, meat);
  }
}
