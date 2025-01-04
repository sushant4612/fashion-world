export default interface PlaceOrderDto{
    userId: string;
    items: Array<any>,
    amount: number,
    address: Record<string, any>
}