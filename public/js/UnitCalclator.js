export const lengthMeasurements ={mm: 0.001, cm: 0.01,m: 1, km: 1000,in: 0.0254, ft: 0.3048,yd: 0.9144, mi: 1609.344};

export const weightMeasurements = {mg: 0.001,g: 1,kg: 1000,oz: 28.3495,lb: 453.592};

export const aliases = { 
    millimeter: "mm",millimeters: "mm", mm: "mm", centimeter: "cm",cm: "cm",
    meter: "m", m: "m", kilometer: "km", km: "km", inch: "in", in: "in",
    foot: "ft", ft: "ft",yard: "yd", yd: "yd", mile: "mi",mi: "mi"
  };

export const weightAliases = {
  milligram: "mg",milligrams: "mg", mg: "mg",
  gram: "g", grams: "g", g: "g",
  kilogram: "kg", kilograms: "kg", kg: "kg",
  ounce: "oz", ounces: "oz", oz: "oz",
  pound: "lb",  pounds: "lb", lb: "lb", lbs: "lb" 
};


export function convertUnit(isLength, length, unit_to_convert_to, unit_to_convert_from){
  console.log('here')
  const units = isLength ? lengthMeasurements : weightMeasurements;
  const valueInMeters = length * units[unit_to_convert_from];
  const convertedValue = valueInMeters / units[unit_to_convert_to];
  const results = {length: convertedValue, unit_to_convert_to:unit_to_convert_to, unit_to_convert_from: unit_to_convert_from};
  return results;

}

export function convertTemperature(length, unit_to_convert_to, unit_to_convert_from) {

  const normalize = {
    C: v => v,
    F: v => (v - 32) * 5 / 9,
    K: v => v - 273.15
  };

  const denormalize = {
    C: v => v,
    F: v => (v * 9 / 5) + 32,
    K: v => v + 273.15
  };

  if(denormalize[unit_to_convert_from] !== undefined || normalize[unit_to_convert_from] !== undefined 
    && denormalize[unit_to_convert_to] !== undefined || normalize[unit_to_convert_from] !== undefined){
    throw new Error("Invalid temperature units. Use C, F, or K.");
  }

  const valueInCelsius = normalize[unit_to_convert_from](length);
  const convertedValue = denormalize[unit_to_convert_to](valueInCelsius);
  const results = {length: convertedValue, unit_to_convert_to:unit_to_convert_to, unit_to_convert_from: unit_to_convert_from};

  return results;
}
