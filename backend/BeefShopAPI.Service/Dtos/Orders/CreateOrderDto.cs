namespace BeefShopAPI.Service.Dtos;

public class CreateOrderDto
{
    public int Id { get; set; }
    public required DateTime OrderDate { get; set; }
    public required int BuyerId { get; set; }
    public required ICollection<OrderItemDto> OrderItems { get; set; }
}