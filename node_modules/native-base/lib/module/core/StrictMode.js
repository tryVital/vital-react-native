const tokenNotString = 'tokenNotString';
const tokenNotFound = 'tokenNotFound';
export const strictModeLogger = ({
  token,
  scale,
  mode,
  type
}) => {
  if (!mode) {
    mode = 'off';
  }

  if (mode === 'off') return; // eslint-disable-next-line no-console

  const log = console[mode];

  switch (type) {
    case tokenNotFound:
      log("Token ".concat(token, " not found in theme scale of ").concat(scale, ". Please use extendTheme function to add this token in your theme"));
      return;

    case tokenNotString:
      log("Token ".concat(token, " should be passed as a string."));
      return;

    default:
      return;
  }
};
//# sourceMappingURL=StrictMode.js.map