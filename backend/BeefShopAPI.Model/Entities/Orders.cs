namespace BeefShopAPI.Model.Entities;

public class Orders
{
  public int Id { get; set; }
  public required DateTime OrderDate { get; set; }
  public required float TotalValue { get; set; }

  public int BuyerId { get; set; }
  public required Buyers Buyers { get; set; }
  public ICollection<OrderItems> OrderItems { get; set; } = [];
}

