"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = exports.fetchPosts = void 0;
function fetchPosts(page_1, limit_1) {
    return __awaiter(this, arguments, void 0, function* (page, limit, title = '') {
        const url = new URL('https://jsonplaceholder.typicode.com/posts');
        url.searchParams.set('_page', page.toString());
        url.searchParams.set('_limit', limit.toString());
        if (title) {
            url.searchParams.set('title_like', title);
        }
        try {
            const response = yield fetch(url.toString());
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            return yield response.json();
        }
        catch (error) {
            throw new Error('Error fetching posts: ' + error.message);
        }
    });
}
exports.fetchPosts = fetchPosts;
function fetchUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
            }
            const userData = yield response.json();
            return {
                name: userData.name || 'Unknown',
                phone: userData.phone || 'Unknown',
                email: userData.email || 'Unknown'
            };
        }
        catch (error) {
            throw new Error('Error fetching user data: ' + error.message);
        }
    });
}
exports.fetchUser = fetchUser;
