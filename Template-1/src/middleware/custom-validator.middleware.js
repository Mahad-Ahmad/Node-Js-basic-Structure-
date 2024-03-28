import chalk from 'chalk';

class CustomerValidator {
  constructor(body, schema, objName) {
    this.body = body;
    this.schema = schema;
    this.objName = objName;
  }

  notEmpty(attribute, validatorType) {
    if (this.body[this.objName][attribute] === '') {
      return this.schema[attribute][validatorType].errorMessage;
    }
    return '';
  }

  isLength(attribute, validatorType) {
    if (
      this.body[this.objName][attribute].length <
        this.schema[attribute][validatorType].options.min ||
      this.body[this.objName][attribute].length > this.schema[attribute][validatorType].options.max
    ) {
      return this.schema[attribute][validatorType].errorMessage;
    }
    return '';
  }

  isEmail(attribute, validatorType) {
    if (!this.body[this.objName][attribute].includes('@')) {
      return this.schema[attribute][validatorType].errorMessage;
    }
    return '';
  }

  isAlphanumeric(attribute, validatorType) {
    if (!this.body[this.objName][attribute].match(/^[a-z0-9]+$/i)) {
      return this.schema[attribute][validatorType].errorMessage;
    }
    return '';
  }

  async custom(attribute, validatorType) {
    let error = '';
    await this.schema[attribute][validatorType]
      .options(this.body[this.objName][attribute])
      ?.then((res) => {
        error = '';
      })
      ?.catch((err) => {
        error = err;
      });
    console.log('=>', chalk.redBright(error));
    return error;
  }
}

export default CustomerValidator;
