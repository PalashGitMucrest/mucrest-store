import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const style = {
    height: '6rem',
    width: '10rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: '#999999',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    position: 'fixed',
    top: '4rem',
    left: '37rem'
  }
  function selectBackgroundColor(isActive, canDrop) {
    if (isActive) {
      return 'darkgreen'
    } else if (canDrop) {
      return 'darkkhaki'
    } else {
      return '#CCCCFF'
    }
  }
  export const Dustbin = ({ allowedDropEffect }) => {
    const [{ canDrop, isOver }, drop] = useDrop(
      () => ({
        accept: ItemTypes.BOX,
        drop: () => ({
          name: `${allowedDropEffect} Dustbin`,
          allowedDropEffect,
        }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      }),
      [allowedDropEffect],
    )
    const isActive = canDrop && isOver
    const backgroundColor = selectBackgroundColor(isActive, canDrop)
    return (
      <div ref={drop} style={{ ...style, backgroundColor }}>
        <h3>+</h3>

        {isActive ? 'Release to drop' : 'Drop here'}
      </div>
    )
  }