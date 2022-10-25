import { Box } from './Box'
import { Dustbin } from './Dustbin'
import React from 'react'

export const Container = (props) => (
  <div>
    <div style={{ overflow: 'hidden', clear: 'both' }}>

      <Dustbin allowedDropEffect="any" />

    </div>

    <div style={{ overflow: 'hidden', clear: 'both' }}>
      
      <Box setOpen={props.setOpen} name="Add Folder" />

    </div>
  </div>
)
