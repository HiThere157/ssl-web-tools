class Validator {
  static hostname_Regex =
    /^[a-z\d]([a-z\d\-]{0,61}[a-z\d])?(\.[a-z\d]([a-z\d\-]{0,61}[a-z\d])?)*$/i;
  static IPv4_Regex =
    /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/;
  static IPv6_Regex =
    /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/;
  static portRange_Regex =
    /^(6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[0-9]{1,4})$|^(6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[0-9]{1,4})-(6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[0-9]{1,4})$/;

  constructor() {
    this.errors = [];
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  getErrors() {
    return this.errors.join("; ");
  }

  hostname(target, options) {
    const { message, optional } = options;
    if (optional) return this;

    if (!Validator.hostname_Regex.test(target)) {
      this.errors.push(message);
    }
    return this;
  }

  ip(target, options) {
    const { message, optional } = options;
    if (optional) return this;

    console.log(
      target,
      options,
      Validator.IPv4_Regex.test(target),
      Validator.IPv6_Regex.test(target),
      !(Validator.IPv4_Regex.test(target) || Validator.IPv6_Regex.test(target)),
    );

    if (
      !(Validator.IPv4_Regex.test(target) || Validator.IPv6_Regex.test(target))
    ) {
      this.errors.push(message);
    }
    return this;
  }

  host(target, options) {
    const { message, optional } = options;
    if (optional) return this;

    if (
      !(
        Validator.hostname_Regex.test(target) ||
        Validator.IPv4_Regex.test(target) ||
        Validator.IPv6_Regex.test(target)
      )
    ) {
      this.errors.push(message);
    }
    return this;
  }

  int(target, options) {
    const { message, optional, min, max } = options;
    if (optional) return this;

    const targetInt = parseInt(target);

    if (isNaN(targetInt) || targetInt < min || targetInt > max) {
      this.errors.push(message + ` (allowed range: ${min} - ${max})`);
    }
    return this;
  }

  selection(target, options) {
    const { message, optional, selections } = options;
    if (optional) return this;

    if (!selections.includes(target)) {
      this.errors.push(
        message + ` (allowed selections: ${selections.join(", ")})`,
      );
    }
    return this;
  }

  portRange(target, options) {
    const { message, optional } = options;
    if (optional) return this;

    if (!Validator.portRange_Regex.test(target)) {
      this.errors.push(message + " (allowed format: {1-65535}-{1-65535})");
    }
    return this;
  }
}

module.exports = Validator;
