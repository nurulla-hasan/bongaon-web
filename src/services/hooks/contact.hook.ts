"use client";

import { useMutation } from "@tanstack/react-query";
import { createContactMessage } from "../api/contact.api";

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: createContactMessage,
  });
}
