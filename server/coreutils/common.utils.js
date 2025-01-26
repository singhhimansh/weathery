// contains all utility functions that are used across the application


// Function to get nested value from an object using a path string, handles array index as well
const getNestedValue = (obj, path) => {
  const parts = path.split(".");
  let acc = obj;

  for (let part of parts) {
    if (acc && acc[part] !== undefined) {
      acc = acc[part];
    } else if (acc && !isNaN(part)) {
      acc = acc[Number(part)];
    } else {
      return undefined;
    }
  }

  return acc;
};

// Function to pick specific keys from an object based on an array of keys or an object with key mapping
const pick = (obj, keys) => {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("Invalid arguments");
  }
  if (!Array.isArray(keys) && typeof keys !== "object") {
    throw new TypeError("Keys to be picked should be an array or an object");
  }

  if (Array.isArray(keys)) {
    return keys.reduce((result, key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
      return result;
    }, {});
  } else {
    return Object.keys(keys).reduce((result, key) => {
      const path = keys[key];
      const value = getNestedValue(obj, path);
      if (value !== undefined) {
        result[key] = value;
      }
      return result;
    }, {});
  }
};


// append suffixes to values of an object based on suffixes mapping object
const addUnitSuffixes = (obj, suffixes) => {
    const result = { ...obj };

    for (const key in suffixes) {
        if (result.hasOwnProperty(key)) {
            result[key] = `${result[key]} ${suffixes[key]}`;
        }
    }

    return result;
};



export { pick, getNestedValue,addUnitSuffixes };
