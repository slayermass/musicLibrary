import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import { validateEmail } from '../helpers/common';

export const MAX_NAME_LENGTH = 40;
export const MAX_DESCRIPTION_LENGTH = 240;
export const MAX_NUMBER = 1000000;
export const MAX_COUNT = 1000;

export const required = (value, show = false) => {
  return show && !value.toString().trim().length ? (
    <FormHelperText className="error-field">Поле не заполнено</FormHelperText>
  ) : null;
};

/**
 * Проверка на обязательность для элемента select
 * @param value
 * @param show
 * @returns {null}
 */
export const requiredSelect = (value, show = false) => {
  return show && !value ? (
    <FormHelperText className="error-field">Необходимо выбрать значение</FormHelperText>
  ) : null;
};

export const maxLength = (value, max, show = false) => {
  return show && value.toString().trim().length > max ? (
    <FormHelperText className="error-field">
      Значение не должно превышать {max} символов
    </FormHelperText>
  ) : null;
};

/**
 * Проверка, что введенное значение меньше значения-ограничения
 * @param value
 * @param num
 * @param show
 * @returns {null}
 */
export const lessThan = (value, num, show = false) => {
  return show && value >= num ? (
    <FormHelperText className="error-field">
      Значение должно быть меньше {num}
    </FormHelperText>
  ) : null;
};

/**
 * Проверка, что введенное значение больше значения-ограничения
 * @param value
 * @param num
 * @param show
 * @returns {null}
 */
export const moreThan = (value, num, show = false) => {
  return show && value <= num ? (
    <FormHelperText className="error-field">
      Значение должно быть больше {num}
    </FormHelperText>
  ) : null;
};

export const between = (value, min, max, show = false) => {
  return show && (value <= min || value >= max) ? (
    <FormHelperText className="error-field">
      Значение должно быть не меньше {min} и не больше {max}
    </FormHelperText>
  ) : null;
};

export const emailValidator = (value, show = false) => {
  return show && !validateEmail(value) ? (
    <FormHelperText className="error-field">
      Некорректный email
    </FormHelperText>
  ) : null;
};

/**
 * Проверка, что значение соответствует паттерну
 * @param value
 * @param pattern
 * @param show
 * @returns {null}
 */
export const patternValidator = (value, pattern, show = false) => {
  return show && !pattern.test(value) ? (
    <FormHelperText className="error-field">
      Неверное значение
    </FormHelperText>
  ) : null;
};
