import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blogs = [
  {
    title: 'React patterns', author: 'Edsger W. Dijkstra',
  },
  {
    title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5,
  },
];

describe('<Blog/> with title and author only', () => {
  const blog = blogs[0];
  let component;

  beforeEach(() => {
    component = render(
      <Blog blog={blog} onLike={() => {}} onRemove={() => {}} />,
    );
  });

  test('renders title', () => {
    const el = component.container.querySelector('.blog-title');
    expect(el).toHaveTextContent(blog.title);
  });

  test('renders author', () => {
    const el = component.container.querySelector('.blog-author');
    expect(el).toHaveTextContent(blog.author);
  });

  test('does not render likes', () => {
    const el = component.container.querySelector('.blog-likes');
    expect(el).toBeEmpty();
  });

  test('does not render url', () => {
    const el = component.container.querySelector('.blog-url');
    expect(el).toBeEmpty();
  });
});

describe('<Blog/>', () => {
  const blog = blogs[1];
  let component;
  const eventHandlers = {
    onLike: jest.fn(),
  };

  beforeEach(() => {
    component = render(
      <Blog blog={blog} onLike={eventHandlers.onLike} onRemove={() => {}} />,
    );
  });

  test('renders likes', () => {
    const el = component.container.querySelector('.blog-likes');
    expect(el).toHaveTextContent(blog.likes);
  });

  test('render url', () => {
    const el = component.container.querySelector('.blog-url');
    expect(el).toHaveTextContent(blog.url);
  });

  test('clicking the like button twice calls its event handler twice', () => {
    const el = component.container.querySelector('.blog-button--like');
    fireEvent.click(el);
    fireEvent.click(el);
    expect(eventHandlers.onLike.mock.calls).toHaveLength(2);
  });
});
