export default interface CartData {
    [itemId: string]: {
      [size: string]: number;
    };
}