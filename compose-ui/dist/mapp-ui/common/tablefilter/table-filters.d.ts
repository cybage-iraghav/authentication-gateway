import { MatTableDataSource } from '@angular/material/table';
/**
 * This file holds helpers for creating filters for material data table
 */
/**
 * Configuration parameters for a given filter instance. Use as follows:
 * name: name of the column to be filtered. needs to match the column name used in MatTableDataSource
 * matcher: the matcher to be used for filtering. Currently supported
 *   - substringMatch: match on a substring level
 *   - exactMatch: exact match, supports string and numbers
 *   - dateMatch: match dates on a day-based granularity (time is ignored)
 *   - dateRangeMatch: match against a date range
 *   - propertyMatch: matching for nested object structures
 * paths: this is used by propertyMatch. specify the lookup path of one or multiple properties to filter
 * Example: paths: ['owner.firstName', 'owner.lastName']
 * for arrays specify the index position also in dot notation: paths: ['events.0.type']
 */
export interface FilterConfig {
    [name: string]: {
        matcher: string;
        paths?: string[];
    };
}
/**
 * Registers a filterPredicate function on the MatTableDataSource, configured by the given filtersConfig
 * @param filtersConfig filter configuration to be used for this table
 * @param dataSource the data source where the filters should be applied
 */
export declare function setUpFilterPredicate(filtersConfig: FilterConfig, dataSource: MatTableDataSource<any>): void;
/**
 * Default implementation for the sortingDataAccessor to be passed to a MatTableDataSource.
 * All data values are expected to be of type string | number | boolean.
 * If your table data has different value types, use a custom implementation for sortingDataAccessor.
 */
export declare function defaultSortingDataAccessor<T>(data: T, sortHeaderId: string): string | number;
