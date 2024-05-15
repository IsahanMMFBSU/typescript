import { Post, User } from './types';

export async function fetchPosts(page: number, limit: number, title: string = ''): Promise<Post[]> {
  const url = new URL('https://jsonplaceholder.typicode.com/posts');
  url.searchParams.set('_page', page.toString());
  url.searchParams.set('_limit', limit.toString());
  if (title) {
    url.searchParams.set('title_like', title);
  }
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching posts: ' + (error as Error).message);
  }
}

export async function fetchUser(userId: number): Promise<User> {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
    }
    const userData = await response.json();
    return {
      name: userData.name || 'Unknown',
      phone: userData.phone || 'Unknown',
      email: userData.email || 'Unknown'
    };
  } catch (error) {
    throw new Error('Error fetching user data: ' + (error as Error).message);
  }
}
