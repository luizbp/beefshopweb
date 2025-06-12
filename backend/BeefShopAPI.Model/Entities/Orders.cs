namespace BeefShopAPI.Model.Entities;

public class Orders
{
  public int Id { get; set; }
  public required DateTime OrderDate { get; set; }
  public required double TotalValue { get; set; }

  public required int BuyerId { get; set; }
  public Buyers Buyers { get; set; } = null!;
  public ICollection<OrderItems> OrderItems { get; set; } = [];
}

