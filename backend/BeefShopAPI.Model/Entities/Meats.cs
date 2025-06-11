namespace BeefShopAPI.Model.Entities;

public class Meats
{
  public int Id { get; set; }
  public required string Description { get; set; }
  public required string MeatType { get; set; }

  public ICollection<OrderItems> OrderItems { get; set; } = [];
}

