namespace BeefShopAPI.Model.Entities;

public class OrderItems
{
  public int OrderId { get; set; }
  public int MeatId { get; set; }
  public required float Price { get; set; }
  public required string Coin { get; set; }
  public required Orders Orders { get; set; }
  public required Meats Meats { get; set; }
}

