export const paginationHelper = async (query: any, page: any, limit: any, sort: any) => {
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const results = await query.sort(sort || {}).skip(skip).limit(pageSize);
    const total = await query.model.countDocuments(query.getQuery());

    return {
        results,
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
    };
};
