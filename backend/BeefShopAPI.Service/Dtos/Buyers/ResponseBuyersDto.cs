namespace BeefShopAPI.Service.Dtos;

public class ResponseBuyersDto
{
  public int Id { get; set; }
  public string Name { get; set; } = "";
  public string Document { get; set; } = "";

  public string City { get; set; } = "";
  public string State { get; set; } = "";
  public int NumberAssociatedOrders { get; set; }
}