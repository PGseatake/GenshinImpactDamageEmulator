"use strict";
if (!Array.prototype.contains) {
    Array.prototype.contains = function (value) {
        for (const v of this) {
            if (v === value)
                return true;
        }
        return false;
    };
    Array.prototype.weakContains = function (value) {
        for (const v of this) {
            if (v == value)
                return true;
        }
        return false;
    };
}
