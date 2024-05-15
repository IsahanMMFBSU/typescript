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
exports.loadAndDisplayPosts = void 0;
const queries_1 = require("./queries");
const display_1 = require("./display");
let loading = false;
let currentPage = 1;
const pageSize = 10;
const postsContainer = document.getElementById('posts-container');
function loadAndDisplayPosts() {
    return __awaiter(this, arguments, void 0, function* (title = '', page = 1) {
        try {
            loading = true;
            const posts = yield (0, queries_1.fetchPosts)(page, pageSize, title);
            currentPage = page + 1;
            const postsWithUser = yield Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                const user = yield (0, queries_1.fetchUser)(post.userId);
                post.user = user;
                return post;
            })));
            if (page === 1) {
                postsContainer.innerHTML = '';
            }
            (0, display_1.displayPosts)(postsWithUser, postsContainer);
            loading = false;
        }
        catch (error) {
            console.error('Error loading and displaying posts:', error);
            postsContainer.innerHTML = `<p>${error.message}</p>`;
            loading = false;
        }
    });
}
exports.loadAndDisplayPosts = loadAndDisplayPosts;
