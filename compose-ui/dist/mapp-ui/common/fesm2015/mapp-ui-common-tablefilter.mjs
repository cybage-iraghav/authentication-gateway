import { DateTime, Interval } from 'luxon';

const filterCollection = {
    substringMatch: (filterTerm, dataVal) => {
        if (filterTerm && dataVal) {
            return dataVal.toLowerCase().includes(filterTerm.toLowerCase());
        }
        else {
            return !(filterTerm && !dataVal);
        }
    },
    exactMatch: (filterTerm, dataVal) => {
        if (filterTerm && dataVal) {
            if (typeof dataVal === 'string') {
                return dataVal.toLowerCase() === filterTerm.toLowerCase();
            }
            else {
                return +filterTerm === dataVal;
            }
        }
        else {
            return !(filterTerm && !dataVal);
        }
    },
    dateMatch: (filterTerm, dataVal) => {
        if (filterTerm && dataVal) {
            if (typeof dataVal === 'string') {
                return DateTime.fromISO(filterTerm).hasSame(DateTime.fromISO(dataVal), 'day');
            }
            else {
                return DateTime.fromISO(filterTerm).hasSame(DateTime.fromMillis(dataVal), 'day');
            }
        }
        else {
            return !(filterTerm && !dataVal);
        }
    },
    dateRangeMatch: (filterTerm, dataVal) => {
        if (!filterTerm || !dataVal) {
            return !(filterTerm && !dataVal);
        }
        const dr = Interval.fromISO(filterTerm);
        if (!dr.start || !dr.end) {
            return !(filterTerm && !dataVal);
        }
        // create adjusted interval with +1 day end, as end date is exclusive in the interval
        const dateRange = Interval.fromDateTimes(dr.start, dr.end.plus({ days: 1 }));
        const dt = typeof dataVal === 'string' ? DateTime.fromISO(dataVal) : DateTime.fromMillis(dataVal);
        return dateRange.contains(dt);
    },
    propertyMatch: (filterTerm, data, paths) => {
        let combinedVal = '';
        // search json value by path for example "owner.firstName"
        const resolveJsonPropValue = (path, obj) => {
            return path.split('.').reduce((prev, current) => {
                return prev ? prev[current] : null;
            }, obj || self);
        };
        paths === null || paths === void 0 ? void 0 : paths.forEach(path => {
            const resolvedVal = resolveJsonPropValue(path, data);
            if (resolvedVal) {
                combinedVal += resolvedVal + ' ';
            }
        });
        if (filterTerm && combinedVal) {
            return combinedVal.toLowerCase().includes(filterTerm.toLowerCase());
        }
        else {
            return !(filterTerm && !combinedVal);
        }
    }
};
/**
 * Registers a filterPredicate function on the MatTableDataSource, configured by the given filtersConfig
 * @param filtersConfig filter configuration to be used for this table
 * @param dataSource the data source where the filters should be applied
 */
function setUpFilterPredicate(filtersConfig, dataSource) {
    dataSource.filterPredicate = (data, filterString) => {
        const filters = JSON.parse(filterString);
        const filterResult = Object.keys(filters).map(key => {
            const filterTerm = filters[key];
            const dataValue = data[key];
            const currentFilter = filterCollection[filtersConfig[key].matcher];
            const currentPaths = filtersConfig[key].paths;
            if (currentFilter) {
                if (currentPaths) {
                    return currentFilter(filterTerm, data, currentPaths);
                }
                else {
                    return currentFilter(filterTerm, dataValue);
                }
            }
            else {
                return true;
            }
        });
        const result = filterResult.reduce((prev, curr) => prev && curr);
        return result;
    };
}
/**
 * Default implementation for the sortingDataAccessor to be passed to a MatTableDataSource.
 * All data values are expected to be of type string | number | boolean.
 * If your table data has different value types, use a custom implementation for sortingDataAccessor.
 */
function defaultSortingDataAccessor(data, sortHeaderId) {
    const sortValue = data[sortHeaderId];
    if (typeof sortValue === 'string') {
        return sortValue.toLowerCase();
    }
    else if (typeof sortValue === 'boolean') {
        return sortValue ? 1 : 0;
    }
    else {
        return sortValue;
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { defaultSortingDataAccessor, setUpFilterPredicate };
//# sourceMappingURL=mapp-ui-common-tablefilter.mjs.map
