'use client'
import React, { useState, CSSProperties } from 'react'
import { FadeLoader } from 'react-spinners'

const override: CSSProperties = {
  display: 'block',
  margin: '100px auto',
  borderColor: 'green',
}

export default function Loading() {
  const [loading] = useState(true)
  const [color] = useState('#36d7b7')

  return (
    <div className="sweet-loading">
      <FadeLoader
        color={color}
        loading={loading}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
