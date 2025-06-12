using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Dtos;

namespace BeefShopAPI.Service.Interfaces;

public interface IMeatService
{
  Task<List<ResponseMeatsDto>> GetAllAsync();
  Task<ResponseMeatsDto> GetByIdAsync(int id);
  Task<Meats> CreateAsync(Meats meat);
  Task<Meats> UpdateAsync(int id, Meats meat);
  Task<bool> DeleteAsync(int id);
}