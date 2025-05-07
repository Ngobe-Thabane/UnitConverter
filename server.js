
const UNITS = {LENGTH:'length', WEIGHT:'weight', TEMPERATURE:'temperature'};
const lengthMeasurements ={mm: 0.001, cm: 0.01,m: 1, km: 1000,in: 0.0254, ft: 0.3048,yd: 0.9144, mi: 1609.344};
const weightMeasurements = {mg: 0.001,g: 1,kg: 1000,oz: 28.3495,lb: 453.592};

export default function calculateUnits(unitsData){
  const {unit, length,unit_to_convert_to, unit_to_convert_from } = unitsData;
  const oldLength = length;
  let results = {}

  if(unit !== undefined && length !== undefined && unit_to_convert_to !== undefined && unit_to_convert_from !== undefined){
    try{
      switch(unit.toLowerCase()){
        case UNITS.LENGTH:
          results = convertUnit(true,length, unit_to_convert_to, unit_to_convert_from);
          break;
        case UNITS.WEIGHT:
          results = convertUnit(false, length, unit_to_convert_to, unit_to_convert_from);
          break;
        case UNITS.TEMPERATURE:
          results = convertTemperature(length, unit_to_convert_to, unit_to_convert_from); 
          break;      
        }
      results.oldLength = oldLength; 
      return results; 
    }
    catch(err) {
      return {message: err.message}
    }
  }
  return {message : "All fields must be field"};
}

function convertUnit(isLength, length, unit_to_convert_to, unit_to_convert_from){

  const units = isLength ? lengthMeasurements : weightMeasurements;
 
  if(units[unit_to_convert_to] !== undefined && units[unit_to_convert_from] !== undefined){

    const valueInMeters = length * units[unit_to_convert_from];
    const convertedValue = valueInMeters / units[unit_to_convert_to];
    const results = {length: convertedValue, unit_to_convert_to:unit_to_convert_to, unit_to_convert_from: unit_to_convert_from};
    return results;

  }

  if(isLength)  throw new Error("Invalid units. Try using mm, cm, m, km, in, ft, yd, or mi.");
  else throw new Error("Invalid units. Use mg, g, kg, oz, or lb.");

}

function convertTemperature(length, unit_to_convert_to, unit_to_convert_from) {

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
