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
const actions_1 = require("./actions");
const searchInput = document.getElementById('search-input');
const postsContainer = document.getElementById('posts-container');
let debounceTimeout;
let loading = false;
let currentPage = 1;
const pageSize = 10;
function isBottomOfPage() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100; // Триггер предзагрузки за 100px до конца
}
function handleInput() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchTerm = encodeURIComponent(searchInput.value.trim());
        currentPage = 1;
        postsContainer.innerHTML = '';
        clearTimeout(debounceTimeout);
        debounceTimeout = window.setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield (0, actions_1.loadAndDisplayPosts)(searchTerm, 1);
        }), 500);
    });
}
searchInput.addEventListener('input', handleInput);
window.addEventListener('scroll', () => __awaiter(void 0, void 0, void 0, function* () {
    if (isBottomOfPage() && !loading) {
        const searchTerm = encodeURIComponent(searchInput.value.trim());
        yield (0, actions_1.loadAndDisplayPosts)(searchTerm, currentPage);
    }
}));
window.addEventListener('load', handleInput);
