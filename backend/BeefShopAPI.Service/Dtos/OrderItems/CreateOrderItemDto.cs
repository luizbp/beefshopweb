namespace BeefShopAPI.Service.Dtos;

public class CreateOrderItemDto
{
  public int MeatId { get; set; }
  public required double Price { get; set; }
  public required string Coin { get; set; }
}