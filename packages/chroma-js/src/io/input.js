"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupInputAutodetect = exports.setupInputFormat = exports.input = void 0;
exports.input = {
    format: {},
    autodetect: [],
};
function setupInputFormat(fields, conf) {
    if (typeof conf !== 'function') {
        throw new TypeError(`conf is not allowed format, ${conf}`);
    }
    if (!Array.isArray(fields)) {
        fields = [fields];
    }
    fields.forEach(field => {
        if (typeof field !== 'string' || !field.length || field in exports.input.format) {
            throw new TypeError(`field ${field} is invalid or already exists same field name`);
        }
        exports.input.format[field] = conf;
    });
}
exports.setupInputFormat = setupInputFormat;
function setupInputAutodetect(conf) {
    if (typeof (conf === null || conf === void 0 ? void 0 : conf.p) !== 'number' || typeof (conf === null || conf === void 0 ? void 0 : conf.test) !== 'function' || exports.input.autodetect.includes(conf)) {
        throw new TypeError(`conf is not allowed autodetect, ${conf}`);
    }
    exports.input.autodetect.push(conf);
    exports.input.sorted = false;
}
exports.setupInputAutodetect = setupInputAutodetect;
exports.default = exports.input;
//# sourceMappingURL=input.js.map