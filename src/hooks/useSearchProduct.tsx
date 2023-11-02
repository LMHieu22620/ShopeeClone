import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'

import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { Schema, schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

export default function useSearchProduct() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}
