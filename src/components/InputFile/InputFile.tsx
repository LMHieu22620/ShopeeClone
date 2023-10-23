import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG', {
        position: 'top-center'
      })
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  const handleClickImage = () => {
    inputRef.current?.click()
  }
  return (
    <>
      {' '}
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={inputRef}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleClickImage}
      >
        Chọn ảnh
      </button>
    </>
  )
}
