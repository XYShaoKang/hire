import { parseError } from './index'

test('Empty stack', () => {
  const error = {
    name: 'test error',
    message: 'test error',
  }

  const output = {
    message: 'test error',
    stack: [],
  }
  expect(parseError(error)).toMatchObject(output)
})

test('Chrome error', () => {
  const error = {
    name: 'test error',
    message: 'test error',
    stack: `TypeError: Error raised
  at bar http://192.168.31.8:8000/c.js:2:9
  at foo http://192.168.31.8:8000/b.js:4:15
  at calc http://192.168.31.8:8000/a.js:4:3
  at <anonymous>:1:11
  at http://192.168.31.8:8000/a.js:22:3
`,
  }

  const output = {
    message: 'test error',
    stack: [
      { line: 2, column: 9, filename: 'http://192.168.31.8:8000/c.js' },
      { line: 4, column: 15, filename: 'http://192.168.31.8:8000/b.js' },
      { line: 4, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
      { line: 22, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
    ],
  }
  expect(parseError(error)).toMatchObject(output)
})

test('Firefox error', () => {
  const error = {
    name: 'test error',
    message: 'test error',
    stack: `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`,
  }

  const output = {
    message: 'test error',
    stack: [
      { line: 2, column: 9, filename: 'http://192.168.31.8:8000/c.js' },
      { line: 4, column: 15, filename: 'http://192.168.31.8:8000/b.js' },
      { line: 4, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
      { line: 22, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
    ],
  }
  expect(parseError(error)).toMatchObject(output)
})
