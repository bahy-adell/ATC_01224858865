"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
class Features {
    constructor(queryString, mongooseQuery) {
        this.queryString = queryString;
        this.mongooseQuery = mongooseQuery;
    }
    pagination(NumOfEvents) {
        const page = this.queryString.page || 1;
        const limit = this.queryString.limit || 5;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;
        const pagination = {};
        pagination.currentPage = Number(page);
        pagination.limit = Number(limit);
        pagination.totalPages = Math.ceil(NumOfEvents / limit);
        if (endIndex < NumOfEvents) {
            pagination.next = Number(page) + 1;
        }
        if (skip > 0) {
            pagination.prev = Number(page) - 1;
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;
        return this;
    }
    filter() {
        const queryObject = Object.assign({}, this.queryString);
        const excludedFields = ["page", "limit"];
        excludedFields.forEach(field => delete queryObject[field]);
        this.mongooseQuery = this.mongooseQuery.find(queryObject);
        return this;
    }
}
exports.default = Features;
class utils {
    constructor() { }
    generateReferenceCode() {
        return Math.floor(1000000 + Math.random() * 9000000).toString();
    }
}
exports.utils = utils;
