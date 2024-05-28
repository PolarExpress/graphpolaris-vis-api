/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/**
 * A collection of results from machine learning services.
 *
 * @category ML data
 */
export type MLResults = {
  /**
   * A list of the actual results.
   */
  results: MLResult[];

  // Created a wrapper type in order to facilitate possible future metadata.
};

/**
 * A single result from a machine learning service.
 *
 * @category ML data
 */
// TODO: link to ML documentation
export type MLResult = {
  /**
   * The protocol used for the data transfer.
   *
   * This can either be an officially recognised protocol, or a specialized
   * user-defined one.
   */
  protocol: string;
  /**
   * The actual data from the machine learning service. The type depends on the
   * protocol specified in {@link MLResult.protocol}.
   */
  value: unknown;
  /**
   * An additional label attached to the data by the machine learning service.
   *
   * Can be used to differentiate between multiple results with the same
   * protocol, or to display extra information.
   */
  label: string;
};
