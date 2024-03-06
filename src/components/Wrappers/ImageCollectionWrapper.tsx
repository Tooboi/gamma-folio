"use client";

export default function ImageCollectionWrapper() {
  // Check if running on the client side before using localStorage
  const storedPublicIds =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("uploadedPublicIds") || "[]")
      : [];
  const imageCollection = storedPublicIds;
  console.log("Stored Public IDs:", storedPublicIds);
}
