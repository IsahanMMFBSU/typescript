import { Post } from './types';

export function displayPosts(posts: Post[], container: HTMLElement): void {
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p>
        User: ${post.user ? post.user.name : 'Unknown'},
        Phone: ${post.user ? post.user.phone : 'Unknown'},
        Email: ${post.user ? post.user.email : 'Unknown'}
      </p>
    `;
    container.appendChild(postElement);
  });
}
