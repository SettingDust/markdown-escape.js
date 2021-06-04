const assert = require('assert')
const commonmark = require('commonmark')
const escape = require('./')

const examples = [
  ['#1!', '#1!'],
  ['1 < 2', '1 &lt; 2'],
  ['* and text', '* and text'],
  ['> not a quote', '&gt; not a quote'],
  ['< not a tag >', '&lt; not a tag &gt;'],
  ['[]', '[]'],
  ['-', '-'],
  /* eslint-disable-next-line */
  ['____', '_\_\_\_']
]

examples.forEach(function (example) {
  const escaped = escape(example[0])
  const rendered = render(escaped)
  assert(
    rendered.indexOf(example[1]) > -1,
    '“' + example[0] + '” becomes “' + example[1] + '”'
  )
})

// Test skips.

assert(
  escape('https://example.com', ['slashes']) ===
  'https://example.com',
  'skip slashes'
)

assert(
  escape('one_two', ['underscores']) ===
  'one_two',
  'skip underscores'
)

function render (markup) {
  const reader = new commonmark.Parser()
  const writer = new commonmark.HtmlRenderer()
  const parsed = reader.parse(markup)
  return writer.render(parsed)
}
