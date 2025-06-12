namespace BeefShopAPI.Model.Entities;

public class OrderItems
{
  public int OrderId { get; set; }
  public required int MeatId { get; set; }
  public required double Price { get; set; }
  public required string Coin { get; set; }
  public Orders Orders { get; set; } = null!;
  public Meats Meats { get; set; } = null!;
}

