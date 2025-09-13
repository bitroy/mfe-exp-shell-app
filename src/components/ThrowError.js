import React from "react";

export default function ThrowError({ error }) {
  if (error) {
    throw error;
  }
  return null;
}
