import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlog from './NewBlog';

const blog = {
  title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5,
};

describe('<NewBlog/>', () => {
  let component;
  const eventHandlers = {
    onCreate: jest.fn(),
  };

  /**
   * Set a form fields value with fireEvent
   * @param selector
   * @param value
   */
  const setFormField = (selector, value) => {
    const el = component.container.querySelector(selector);
    fireEvent.change(el, {
      target: { value },
    });
  };

  beforeEach(() => {
    component = render(
      <NewBlog onCreate={eventHandlers.onCreate} />,
    );
  });

  test('clicking button to create a new blog calls its event handler', () => {
    setFormField('.new-blog-input--title', blog.title);
    setFormField('.new-blog-input--author', blog.author);
    setFormField('.new-blog-input--url', blog.url);

    const el = component.container.querySelector('.new-blog--form');
    fireEvent.submit(el);
    expect(eventHandlers.onCreate.mock.calls).toHaveLength(1);
    expect(eventHandlers.onCreate.mock.calls[0][0].title).toBe(blog.title);
    expect(eventHandlers.onCreate.mock.calls[0][0].url).toBe(blog.url);
    expect(eventHandlers.onCreate.mock.calls[0][0].title).toBe(blog.title);
  });
});
