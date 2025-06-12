namespace BeefShopAPI.Service.Dtos;

public class ResponseOrderItemDto
{
  public int MeatId { get; set; }
  public required double Price { get; set; }
  public required string Coin { get; set; }
  public ResponseMeatsDto Meat { get; set; } = null!;
}