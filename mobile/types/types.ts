export interface ErrorInterface {
  clerkError?: boolean;
  code?: string;
  status?: number;
  errors?: ErrorArray[];
  e?: [e: string];
}

interface ErrorArray {
  code: string;
  message: string;
  longMessage: string;
  meta: {
    paramName: string;
  };
}
