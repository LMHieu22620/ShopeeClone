import {
  FloatingArrow,
  FloatingPortal,
  type Placement,
  arrow,
  shift,
  useFloating,
  useHover,
  useInteractions,
  safePolygon
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useId, useRef, useState, type ElementType } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  placement?: Placement
}

export default function Popover({ children, renderPopover, className, as: Element = 'div', placement }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const id = useId()
  const { refs, floatingStyles, context, middlewareData, x, y } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })

  const hover = useHover(context, {
    handleClose: safePolygon()
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <FloatingPortal id={id}>
            <motion.div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                <FloatingArrow ref={arrowRef} context={context} fill='white' />
                {renderPopover}
              </div>
            </motion.div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </Element>
  )
}
