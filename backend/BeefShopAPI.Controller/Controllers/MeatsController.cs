using BeefShopAPI.Model.Entities;
using BeefShopAPI.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BeefShopAPI.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class MeatsController : ControllerBase
{
  private readonly IMeatService _meatService;

  public MeatsController(IMeatService meatService)
  {
    _meatService = meatService;
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var meat = await _meatService.GetByIdAsync(id);
    if (meat == null)
    {
      return NotFound();
    }

    return Ok(meat);
  }

  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var meats = await _meatService.GetAllAsync();
    if (meats == null)
    {
      return NotFound();
    }

    return Ok(meats);
  }

  [HttpPost]
  public async Task<IActionResult> Create(Meats meat)
  {

    if (meat.MeatType == null || meat.Description == null)
    {
      return BadRequest();
    }

    await _meatService.CreateAsync(meat);

    return Ok(meat);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, Meats meat)
  {
    if (meat.MeatType == null && meat.Description == null)
    {
      return BadRequest();
    }

    await _meatService.UpdateAsync(id, meat);

    return Ok(meat);
  }
  
   [HttpDelete("{id}")]
  public async Task<IActionResult> Update(int id)
  {
    await _meatService.DeleteAsync(id);

    return Ok();
  }
}