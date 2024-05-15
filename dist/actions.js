async function loadAndDisplayPosts(title = '', page = 1) {
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
    postsContainer.innerHTML = `<p>${error.message}</p>`;
    loading = false;
  }
}
