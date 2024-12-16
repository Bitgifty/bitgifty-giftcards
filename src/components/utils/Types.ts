

export type BuyFormProps={
    recipient_name: string;
      sender_name: string;
      recipient_email:string;
      amount:string;
      quantity:string;
      message:string;
}

export type SellFormProps={
    sub_category: string;
  amount: string;
  image: File | null;
    
}