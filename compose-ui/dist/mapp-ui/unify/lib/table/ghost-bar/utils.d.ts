/**
 * Helper function to generate a "Ghost data set" containing empty objects of the given type, which can be used
 * to display the ghost-bar component rows while the real table data is loading.
 * @param length Number of elements to create. Defaults to 10.
 */
export declare function createGhostDataSet<T>(length?: number): T[];
