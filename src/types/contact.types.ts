export interface CreateContactPayload {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
}
