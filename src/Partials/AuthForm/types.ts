import { FormTypes } from "@src/libs/Form/useForm";

export interface FormData {
   username: string;
   country: string;
   name: string;

   step: "LOGIN" | "USER_INFO" | "OTP";
   otp_response: any;
   otp_given: {
      c1: string;
      c2: string;
      c3: string;
      c4: string;
   }
}

export interface PartialProps {
   form: FormTypes<FormData>
}