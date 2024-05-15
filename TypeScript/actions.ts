import { fetchPosts, fetchUser } from './queries';
import { displayPosts } from './display';
import { Post, User } from './types';

let loading = false;
let currentPage = 1;
const pageSize = 10;

const postsContainer = document.getElementById('posts-container') as HTMLElement;

async function loadAndDisplayPosts(title: string = '', page: number = 1): Promise<void> {
  try {
    loading = true;
    const posts = await fetchPosts(page, pageSize, title);
    currentPage = page + 1;


    const postsWithUser = await Promise.all(posts.map(async post => {
      const user = await fetchUser(post.userId);
      post.user = user;
      return post;
    }));

    if (page === 1) {
      postsContainer.innerHTML = '';
    }

    displayPosts(postsWithUser, postsContainer);
    loading = false;
  } catch (error) {
    console.error('Error loading and displaying posts:', error);
    postsContainer.innerHTML = `<p>${(error as Error).message}</p>`;
    loading = false;
  }
}

export { loadAndDisplayPosts };
