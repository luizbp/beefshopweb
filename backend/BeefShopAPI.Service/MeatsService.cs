using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
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

  public async Task<List<Meats>> getAllAsync()
  {
    return await _meatRepository.GetAllAsync();
  }

  public async Task<Meats> getByIdAsync(int id)
  {
    return await _meatRepository.GetByIdAsync(id);
  }

  public async Task<Meats> UpdateAsync(int id, Meats meat)
  {
    return await _meatRepository.UpdateAsync(id, meat);
  }
}
