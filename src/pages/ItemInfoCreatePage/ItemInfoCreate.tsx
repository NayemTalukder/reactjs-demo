import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { useAppSelector, useAppDispatch, setName, setType, setSubCategories, setUnitName, setStockLimit } from '../../store'
import { ItemInfoCreatePageProps } from './interface'
import { PageLayout, FormCard, FormItem, FormSubmitButton } from '../../components'
import { addItem } from '../../services/firebase'
import './scss/ItemInfoCreate.scss'

const ItemInfoCreatePage: React.FC<ItemInfoCreatePageProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [subCat, setSubCat] = useState<string>('');
  const [units, setUnits] = useState<string>('');
  const dispatch = useAppDispatch()
  const ItemInfoCreateState = useAppSelector((state) => state.ItemInfoCreate)

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value))
  }

  const onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setType(e.target.value))
  }

  const onSubCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCat(e.target.value)
  }

  const onSubCategoryAdd = () => {
    if (subCat !== '') dispatch(setSubCategories(subCat))
  }

  const onUnitNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnits(e.target.value)
  }

  const onUnitNameAdd = () => {
    if (units !== '') dispatch(setUnitName(units))
  }

  const onStockLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStockLimit(parseInt(e.target.value, 10)))
  }

  const onSubmit = async () => {
    setLoading(true)
    addItem(ItemInfoCreateState.name, ItemInfoCreateState.type, ItemInfoCreateState.subCategories, ItemInfoCreateState.unitName, ItemInfoCreateState.stockLimit).then(() => {
      alert('New Item Created.')
      window.location.reload()
    })

  }

  const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    marginTop: "1vw",
  };

  return (
    <PageLayout>
      <div className='ItemInfoCreate'>
        <FormCard formHeading='Create Item Info' >
          <>
            <FormItem label="Name" type="text" onChange={onNameChange} />
            <FormItem label="Type" type="text" onChange={onTypeChange} dropDown={ItemInfoCreateState.allTypes} />
            <FormItem
              label="Sub Category"
              type="text"
              onMultiAdd={onSubCategoryAdd}
              onChange={onSubCategoryChange}
              multiList={ItemInfoCreateState.subCategories}
              multiInput />
            <FormItem
              label="Unit Name"
              type="text"
              onMultiAdd={onUnitNameAdd}
              onChange={onUnitNameChange}
              multiList={ItemInfoCreateState.unitName}
              multiInput />
            <FormItem label="Stock Limit" type="number" onChange={onStockLimitChange} />
            <FormSubmitButton hide={loading} onSubmit={onSubmit} label='Create' />
            <ClipLoader color={`#fff`} loading={loading} cssOverride={override} size={15} />
          </>
        </FormCard>
      </div>
    </PageLayout>
  )
}

export { ItemInfoCreatePage }
