export function createControl(config, validationRules) {
  return {
    ...config,
    validationRules,
    valid: !validationRules,
    touched: false,
    value: '',
  };
}

export function validateControl(value, validationRules = null) {
  if (!validationRules) {
    return true;
  }

  let isValid = true;

  if (validationRules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {
  let isFormValid = true;

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}
