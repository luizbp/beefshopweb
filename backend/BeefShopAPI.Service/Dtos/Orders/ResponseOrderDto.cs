namespace BeefShopAPI.Service.Dtos;

public class ResponseOrderDto
{
    public int Id { get; set; }
    public double TotalValue { get; set; }
    public required DateTime OrderDate { get; set; }
    public required int BuyerId { get; set; }
    public ResponseBuyersDto Buyer { get; set; } = null!;
    public required ICollection<OrderItemDto> OrderItems { get; set; }
}