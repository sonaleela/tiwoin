// remove null | undefined from object
export function removeEmpty(obj: any) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

// empty filter object
export function emptyFilterObject() {
    return {
        pageNumber: null,
        startDate: null,
        endDate: null,
        sortBy: null,
        direction: null,
        page: null,
        date: null,
    }
};
