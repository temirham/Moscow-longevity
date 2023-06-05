/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Service {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 30
   */
  name: string;
  /**
   * Adress
   * @minLength 1
   * @maxLength 30
   */
  adress: string;
  /**
   * Img
   * @minLength 1
   * @maxLength 255
   */
  img: string;
  /** Price */
  price?: number | null;
  /**
   * Number
   * @min -2147483648
   * @max 2147483647
   */
  number?: number | null;
}
