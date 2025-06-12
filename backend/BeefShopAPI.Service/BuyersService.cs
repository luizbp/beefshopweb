using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Model.Entities;
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

  public async Task<List<Buyers>> GetAllAsync()
  {
    return await _buyersRepository.GetAllAsync();
  }

  public async Task<Buyers> GetByIdAsync(int id)
  {
    return await _buyersRepository.GetByIdAsync(id);
  }

  public async Task<Buyers> UpdateAsync(int id, Buyers buyers)
  {
    return await _buyersRepository.UpdateAsync(id, buyers);
  }
}
