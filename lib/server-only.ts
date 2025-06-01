// This ensures the module can only be imported on the server
if (typeof window !== "undefined") {
  throw new Error("This module should only be imported on the server side")
}

export {}
