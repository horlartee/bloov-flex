interface AmountsByLocation {
  [x: string]: string[];
}

const amountsByLocation: AmountsByLocation = {
  USA: ["10", "25", "50"],
  GBR: ["10", "25", "50"],
  NGA: ["5000", "10000", "25000"],
};

export const formatCashAmount = (value: string): string => {
  value = value.replace(/^0+/, "");
  if (value.length > 2) {
    // Remove any existing commas
    value = value.replace(/\,/g, "");

    // Split the number into whole and decimal parts
    const parts = value.split(".");
    const wholePart = parts[0];
    const decimalPart = parts[1] || "";

    // Add commas for thousands separators in the whole part
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the whole and decimal parts
    const formattedValue =
      formattedWholePart + (decimalPart ? "." + decimalPart : "");

    return formattedValue;
  }
  return value;
};

export const stripStringCommas = (string: string): Number => {
  const stripped = string.replace(/,/g, "");
  return parseFloat(stripped);
};

export const isObjectEmpty = (obj: any): boolean => {
  if (obj == null || obj == undefined) return true;
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const getAmountsByLocation = (userLocation: keyof AmountsByLocation) => {
  const amounts = amountsByLocation[userLocation] || amountsByLocation["USA"];
  return amounts;
};

export const isValidEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const isObjectFieldsEmpty = <T>(object: T): boolean => {
  return Object.keys(object as T[]).every((key) => {
    return object[key as keyof T] !== "" && object[key as keyof T] !== null;
  });
};

export const createFormData = (payload: {
  file: File;
  fileType: string;
  meta: {
    [key: string]: string;
  };
}) => {
  const data = new FormData();
  data.append("file", payload.file);
  data.append("fileType", payload.fileType);
  data.append("meta", JSON.stringify(payload.meta));
  return data;
};
