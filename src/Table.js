import React from 'react';

/**
 * Generic table component that renders rows based on provided column
 * definitions and data. Columns should be an array of objects with
 * `key` and `title` properties.
 */
export default function Table({ columns, data }) {
  return React.createElement(
    'table',
    { border: 1, cellPadding: 4, cellSpacing: 0 },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        columns.map((col) =>
          React.createElement('th', { key: col.key }, col.title)
        )
      )
    ),
    React.createElement(
      'tbody',
      null,
      data.map((row, rowIndex) =>
        React.createElement(
          'tr',
          { key: rowIndex },
          columns.map((col) =>
            React.createElement('td', { key: col.key }, row[col.key])
          )
        )
      )
    )
  );
}
