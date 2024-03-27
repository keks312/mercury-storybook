import React from 'react';
import { DesignTokensTable } from 'react-design-tokens-table'
import tokens from './merged.tokens'

export const Tokens = () => {

  const [user, setUser] = React.useState();

   console.log(tokens.color.brand)

    return (
      <article>

      <section className="storybook-page">
        <h2>Pages in Storybook</h2>
        <p>
          We recommend building UIs with a{' '}
          <a href="https://componentdriven.org" target="_blank" rel="noopener noreferrer">
            <strong>component-driven</strong>
          </a>{' '}
          process starting with atomic components and ending with pages.
        </p>
        </section>
        </article>
    )
}
