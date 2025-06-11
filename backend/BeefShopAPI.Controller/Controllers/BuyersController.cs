using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BeefShopAPI.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class BuyersController : ControllerBase
{
  private readonly IBuyersService _buyersService;

  public BuyersController(IBuyersService buyersService)
  {
    _buyersService = buyersService;
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var buyers = await _buyersService.getByIdAsync(id);
    if (buyers == null)
    {
      return NotFound();
    }

    return Ok(buyers);
  }

  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var meats = await _buyersService.getAllAsync();
    if (meats == null)
    {
      return NotFound();
    }

    return Ok(meats);
  }

  [HttpPost]
  public async Task<IActionResult> Create(Buyers buyers)
  {

    if (buyers.name == null ||
        buyers.document == null ||
        buyers.city == null ||
        buyers.state == null
      )
    {
      return BadRequest();
    }

    await _buyersService.CreateAsync(buyers);

    return Ok(buyers);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, Buyers buyers)
  {
    if (buyers.name == null ||
        buyers.document == null ||
        buyers.city == null ||
        buyers.state == null
      )
    {
      return BadRequest();
    }

    await _buyersService.UpdateAsync(id, buyers);

    return Ok(buyers);
  }
  
   [HttpDelete("{id}")]
  public async Task<IActionResult> Update(int id)
  {
    await _buyersService.DeleteAsync(id);

    return Ok();
  }
}