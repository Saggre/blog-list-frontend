import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

describe('<Togglable/> with title and author only', () => {
  const blog = {
    title: 'React patterns', author: 'Edsger W. Dijkstra',
  };

  let component;

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        onLike={() => {}}
        onRemove={() => {}}
      />,
    );
  });

  test('renders title', () => {
    const el = component.container.querySelector('.blog-title');
    expect(el).toHaveTextContent(
      'React patterns',
    );
  });

  test('renders author', () => {
    const el = component.container.querySelector('.blog-author');
    expect(el).toHaveTextContent(
      'Edsger W. Dijkstra',
    );
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
