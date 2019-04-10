import React from 'react'

const IndexPage = () => {
  return (
    <>
      {/* Style jsx solo añade estilos sobre este componente y sus etiquetas,
    entonces no se puede usar css sobre body, por ejemplo. Se podría usar <style jsx global>
    pero sería lo mismo que usar css convencional */}
      <style jsx>
        {`
          h1 {
            color: red;
          }
          p {
            color: #369;
          }
          img {
            max-width: 50%;
            display: block;
            margin: auto;
          }
          text-align: center;
        `}
      </style>
      <h1>Hola next!</h1>
      <p>Probando jsx</p>
      <img src="/static/papa-roach.jpg" alt="Image form static folder" />
    </>
  )
}

export default IndexPage
