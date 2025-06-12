using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Dtos;
using BeefShopAPI.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BeefShopAPI.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class OrdersController : ControllerBase
{
  private readonly IOrdersService _ordersService;

  public OrdersController(IOrdersService ordersService)
  {
    _ordersService = ordersService;
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var order = await _ordersService.GetByIdAsync(id);
    if (order == null)
    {
      return NotFound();
    }

    return Ok(order);
  }

  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var orders = await _ordersService.GetAllAsync();
    if (orders == null)
    {
      return NotFound();
    }

    return Ok(orders);
  }

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] CreateOrderDto orderDto)
  {
    await _ordersService.CreateAsync(orderDto);

    return Ok(orderDto);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, CreateOrderDto orderDto)
  {
    await _ordersService.UpdateAsync(id, orderDto);

    return Ok(orderDto);
  }
  
   [HttpDelete("{id}")]
  public async Task<IActionResult> Update(int id)
  {
    await _ordersService.DeleteAsync(id);

    return Ok();
  }
}