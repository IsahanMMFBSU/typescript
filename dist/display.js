export function displayPosts(posts, container) {
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p>User: ${post.user.name}, Phone: ${post.user.phone}, Email: ${post.user.email}</p>
    `;
    container.appendChild(postElement);
  });
}
