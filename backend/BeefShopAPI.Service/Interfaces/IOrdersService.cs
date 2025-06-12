using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Dtos;


namespace BeefShopAPI.Service.Interfaces;

public interface IOrdersService
{
  Task<List<ResponseOrderDto>> GetAllAsync();
  Task<ResponseOrderDto> GetByIdAsync(int id);
  Task<Orders> CreateAsync(CreateOrderDto orderDto);
  Task<Orders> UpdateAsync(int id, CreateOrderDto orderDto);
  Task<bool> DeleteAsync(int id);
}