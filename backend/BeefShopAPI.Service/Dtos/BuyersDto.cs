namespace BeefShopAPI.Service.Dtos;

public class BuyersDto
{
  public int Id { get; set; }
  public string Name { get; set; } = "";
  public string Document { get; set; } = "";

  public string City { get; set; } = "";
  public string State { get; set; } = "";
}