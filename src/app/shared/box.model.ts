export class Box {
  id?: number;
  boxId: number;
  dateCreated: Date;
  boxNotes: string;
  supplier: string;
  totalItems: number;
  totalPrice: number;
  status: number;
  isSelected?: boolean;
}
