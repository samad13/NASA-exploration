const DEAFAULT_PAGE_NUMBER = 1;
const DEAFAULT_LIMIT_NUMBER = 0;

function getPagination(query){
    const page = Math.abs(query.page) ||DEAFAULT_PAGE_NUMBER ;
    const limit = Math.abs(query.limit)|| DEAFAULT_LIMIT_NUMBER;
    const skip = (page -1) * limit;

    return {
        skip,
        limit,
    }
}

module.exports = {
    getPagination,
}