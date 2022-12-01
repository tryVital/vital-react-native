import { default as FormControlBase } from './FormControl';
import { default as FormControlLabel } from './FormControlLabel';
import { default as FormControlErrorMessage } from './FormControlErrorMessage';
import { default as FormControlHelperText } from './FormControlHelperText';
let FormControlTemp = FormControlBase;
FormControlTemp.Label = FormControlLabel;
FormControlTemp.ErrorMessage = FormControlErrorMessage;
FormControlTemp.HelperText = FormControlHelperText; // To add typings

const FormControl = FormControlTemp;
export { FormControl };
export { FormControlContext, useFormControl, useFormControlProvider, useFormControlContext } from './useFormControl';
//# sourceMappingURL=index.js.map