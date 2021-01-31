describe('Blog app', () => {
  const user = {
    username: 'username',
    password: 'password',
    name: 'Firstname Lastname',
  };

  const blogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
    },
  ];

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  describe('Login', () => {
    it('Login form is shown', () => {
      cy.contains('Log in to application');
    });

    it('fails with wrong credentials', () => {
      cy.get('.login-form input[autocomplete="username"]').type('foo');
      cy.get('.login-form input[autocomplete="current-password"]').type('bar');
      cy.get('.login-form .login-form-input--submit').click();

      cy.get('.notification').should('have.class', 'notification--error')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'logged in');
    });

    it('succeeds with correct credentials', () => {
      cy.get('.login-form input[autocomplete="username"]').type(user.username);
      cy.get('.login-form input[autocomplete="current-password"]').type(user.password);
      cy.get('.login-form .login-form-input--submit').click();

      cy.get('.notification').should('have.class', 'notification--success');
      cy.get('html').should('contain', 'logged in');
    });
  });

  describe('Blog app', () => {
    describe.only('When logged in', () => {
      const blog = blogs[0];

      beforeEach(() => {
        cy.login({ username: user.username, password: user.password });
      });

      it('A blog can be created', () => {
        cy.contains('new blog').click();
        cy.get('.new-blog-input--title').type(blog.title);
        cy.get('.new-blog-input--author').type(blog.author);
        cy.get('.new-blog-input--url').type(blog.url);
        cy.get('.new-blog-button--create').click();

        cy.get('.notification').should('have.class', 'notification--success')
          .and('contain', 'new blog');

        cy.get('html').should('contain', blog.title);
      });
    });
  });

  describe('Blog actions', () => {
    describe.only('When user is logged in and has added a blog', () => {
      const blog = blogs[0];

      beforeEach(() => {
        cy.login({ username: user.username, password: user.password });
        cy.addBlog(blog);
      });

      it('A blog can be liked', () => {
        cy.contains('view').click();
        cy.get('.blog-likes').contains(blog.likes.toString());
        cy.get('.blog-button.blog-button--like').click();
        cy.get('.blog-likes').contains((blog.likes + 1).toString());
      });

      it('A blog can be deleted', () => {
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.get('html').should('not.contain', blog.title);
      });
    });
  });

  describe('Blogs format', () => {
    describe.only('When there exist multiple blogs', () => {
      beforeEach(() => {
        cy.login({ username: user.username, password: user.password });
        blogs.forEach((blog) => cy.addBlog(blog));
      });

      it('Blogs are ordered primarily by likes', () => {
        let lastBlogLikes;

        cy.get('.blog').find('.blog-likes').each(($el, index, $list) => {
          const likes = parseInt($el.text(), 10);
          if (index > 0) {
            assert.isAtLeast(lastBlogLikes, likes);
          }
          lastBlogLikes = likes;
        });
      });
    });
  });
});
