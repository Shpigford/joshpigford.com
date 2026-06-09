import { Fragment } from 'react'

// Equivalent of Rails' simple_format helper: double newlines become
// paragraphs, single newlines become <br>.
export default function SimpleFormat({ text }: { text: string }) {
  const paragraphs = text.replace(/\r\n?/g, '\n').split(/\n\n+/)

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {paragraph.split('\n').map((line, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
      ))}
    </>
  )
}
