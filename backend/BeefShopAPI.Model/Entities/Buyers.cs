namespace BeefShopAPI.Model.Entities;

public class Buyers
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public required string Document { get; set; }

  public required string City { get; set; }
  public required string State { get; set; }
  public ICollection<Orders> Orders { get; set; } = [];
}

