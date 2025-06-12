namespace BeefShopAPI.Service.Dtos;

public class ResponseMeatsDto
{
  public int Id { get; set; }
  public string Description { get; set; } = "";
  public string MeatType { get; set; } = "";
  public int NumberAssociatedOrders { get; set; }
}