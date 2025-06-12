using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Dtos;

namespace BeefShopAPI.Service.Interfaces;

public interface IBuyersService
{
  Task<List<ResponseBuyersDto>> GetAllAsync();
  Task<ResponseBuyersDto> GetByIdAsync(int id);
  Task<Buyers> CreateAsync(Buyers buyers);
  Task<Buyers> UpdateAsync(int id, Buyers buyers);
  Task<bool> DeleteAsync(int id);
}