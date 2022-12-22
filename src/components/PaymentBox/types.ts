import { FormTypes } from '@src/libs/Form/useForm'

export type Methods = "Bkash" | "Paypal" | "Others"

export interface FormType {
   method: Methods;
   promocode: string;
}

export interface PaymentBoxProps {
   amount: string | number;
   product: {
      id: number;
      title: string;
      image: string;
   };
   disablePromocode?: boolean;
}


export interface PaymentMethodCardProps {
   icon: string;
   title: string;
   form: FormTypes<FormType>
}

export interface PromocodeProps {
   form: FormTypes<FormType>
}
