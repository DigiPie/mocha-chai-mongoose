var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var _a = require("lodash"), isEqual = _a.isEqual, pick = _a.pick;
var ProductService = require("../services/ProductService");
module.exports = function (app) {
    /**
     * Returns all products in the collection.
     */
    app.get("/api/products", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var products, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ProductService.findAll()];
                case 1:
                    products = _a.sent();
                    res.send(products);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, next(err_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Saves a product to the collection.
     */
    app.post("/api/products", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var properties, product, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    properties = pick(req.body, "name", "price", "quantity", "isListed");
                    return [4 /*yield*/, ProductService.saveOne(properties)];
                case 1:
                    product = _a.sent();
                    res.send(product);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    return [2 /*return*/, next(err_2)];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Updates a product in the collection.
     * 0 to n properties can be specified for updating,
     * where n is the max number of properties the Product has
     * besides dateCreated and dateUpdated.
     */
    app.put("/api/products", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var _id, err, properties, product, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.body._id;
                    // If _id is not supplied, short-circuit and return a ValidationError
                    if (!_id) {
                        err = new Error("Missing parameter: '_id'.");
                        err.name = "ValidationError";
                        throw err;
                    }
                    properties = pick(req.body, "name", "price", "quantity", "isListed");
                    return [4 /*yield*/, ProductService.findByIdAndUpdate(_id, properties)];
                case 1:
                    product = _a.sent();
                    res.send(product);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    return [2 /*return*/, next(err_3)];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Deletes a product in the collection.
     */
    app.delete("/api/products", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var _id, err, query, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.body._id;
                    // If _id is not supplied, short-circuit and return a ValidationError
                    if (!_id) {
                        err = new Error("Missing parameter: '_id'.");
                        err.name = "ValidationError";
                        throw err;
                    }
                    return [4 /*yield*/, ProductService.findByIdAndRemove(_id)];
                case 1:
                    query = _a.sent();
                    res.send(query);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    next(err_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Catch-all error handler for unexpected errors.
     */
    app.use(function (err, req, res, next) {
        // If validation or cast error, return 400 Bad Request
        if (isEqual(err.name, "ValidationError") || isEqual(err.name, "CastError")) {
            res.status(400).send(err);
        }
        res.status(500).send(err);
    });
};
