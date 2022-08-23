import React, { ReactNode, useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ItemInfoProps } from './interface'
import './scss/ItemInfo.scss'
import { useAppSelector, useAppDispatch, setShow, setMainHeader, setSubHeader, setUpdateList, setDeleteList, setCurrentId, setRecentEditedField, setEditedCat, setEditedUnitName, setEditedStockLimit, resetItemInfoState } from '../../store'
import { PageLayout, Modal, Button, Overlay } from '../../components'
import { getAllDocs } from '../../services/firebase'
import { Items } from '../../services/firebase/model'
import { updateItem, deleteItem } from '../../services/firebase/';

const ItemInfo: React.FC<ItemInfoProps> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Array<Items>>([]);
  const [itemList, setItemList] = useState<ReactNode | null>([]);

  const dispatch = useAppDispatch()
  const ItemInfoCreateState = useAppSelector((state) => state.ItemInfoCreate)
  const ItemInfoState = useAppSelector((state) => state.ItemInfo)

  const getOptions = (options: Array<string>, select: string = '') => {
    const allOptions: Array<ReactNode> = []
    options.forEach(drp =>
      allOptions.push(
        <option selected={select !== '' && select === drp ? true : false} value={drp}>{drp}</option>
      )
    )

    if (allOptions.length !== 0) return allOptions
    return <></>
  }

  const onPlusClick = (item: Items, type: string) => {
    dispatch(setCurrentId(item.id))
    dispatch(setRecentEditedField(type))
    dispatch(setMainHeader(item.name))
    dispatch(setSubHeader(type))
    dispatch(setShow(true))
  }

  const constructUpdateList = (item: Items) => {
    const tempArray: Array<Items> = []
    ItemInfoState.updateList.forEach(val => {
      if (val.id !== item.id) tempArray.push(val)
    })
    tempArray.push(item)
    dispatch(setUpdateList(tempArray))
  }

  const getNewItem = (item: Items) => {
    const newItem: Items = {
      id: item!.id,
      name: item!.name,
      stock_limit: item!.stock_limit,
      sub_category: item!.sub_category,
      type: item!.type,
      unit_name: item!.unit_name,
    }
    return newItem
  }

  const updateChanges = (item: Items) => {
    const newItem: Items = getNewItem(item)
    if (ItemInfoState.recentEditedField === 'Add Sub Category') {
      newItem.sub_category = [...newItem.sub_category, ItemInfoState.editedCat]
      dispatch(setEditedCat(''))
    } else if (ItemInfoState.recentEditedField === 'Add Unit Price') {
      newItem.unit_name = [...newItem.unit_name, ItemInfoState.editedUnitName]
      dispatch(setEditedUnitName(''))
    } else if (ItemInfoState.recentEditedField === 'Increase Stock Limit') {
      newItem.stock_limit = ItemInfoState.editedStockLimit
      dispatch(setEditedStockLimit(0))
    }
    return newItem
  }

  const onDone = () => {
    const tempArray: Array<Items> = []
    items.forEach(item => {
      if (item.id !== ItemInfoState.currentId) tempArray.push(item)
      else {
        const newItem: Items = updateChanges(item)
        tempArray.push(newItem)
        constructUpdateList(newItem)
      }
    })
    setItems(tempArray)
    dispatch(setShow(false))
    dispatch(setCurrentId(''))
  }

  const onClose = () => {
    dispatch(setEditedCat(''))
    dispatch(setEditedUnitName(''))
    dispatch(setEditedStockLimit(0))
    dispatch(setShow(false))
  }

  const onDeleteClick = (item: Items) => {
    const tempArray: Array<Items> = []
    items.forEach(val => {
      if (val.id !== item.id) tempArray.push(val)
    })
    setItems(tempArray)
    dispatch(setDeleteList(item))
  }

  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, item: Items) => {
    const newItem: Items = getNewItem(item)
    newItem.type = e.target.value
    constructUpdateList(newItem)
  }

  const constructListItems = () => {
    const list: Array<React.ReactNode> = []
    items.forEach((item) => {
      list.push(
        <tr key={item.id}>
          <td>
            <select onChange={(e) => onTypeChange(e, item)} className="selectField" name="type">
              {getOptions(ItemInfoCreateState.allTypes, item.type)}
            </select>
          </td>
          <td>{item.name}</td>
          <td className='d-flex'>
            <span className='flex-8'>
              <select className="selectField" name="subCategory">
                {getOptions(item.sub_category)}
              </select>
            </span>
            <span className='flex-2 mr-t_3 color-ip cursor-pointer'>
              <FiPlusCircle onClick={() => onPlusClick(item, 'Add Sub Category')} className='size-2' />
            </span>
          </td>
          <td className='d-flex'>
            <span className='flex-8'>
              <select className="selectField" name="unitName">
                {getOptions(item.unit_name)}
              </select>
            </span>
            <span className='flex-2 mr-t_3 color-ip cursor-pointer'>
              <FiPlusCircle onClick={() => onPlusClick(item, 'Add Unit Price')} className='size-2' />
            </span>
          </td>
          <td className='d-flex'>
            <span className='flex-8'>{item.stock_limit}</span>
            <span className='flex-2 mr-t_3 color-ip cursor-pointer'>
              <FiPlusCircle onClick={() => onPlusClick(item, 'Increase Stock Limit')} className='size-2' />
            </span>
          </td>
          <td>
            <span className='mr-t_3 cursor-pointer color-t'>
              <AiOutlineCloseCircle onClick={() => onDeleteClick(item)} className='size-2' />
            </span>
          </td>
        </tr>
      )
    })
    setItemList(list)
  }

  const onSave = () => {
    const promises: any[] = []
    setLoading(true)
    ItemInfoState.updateList.forEach(item => {
      promises.push(
        new Promise((resolve) => {
          resolve(updateItem(item))
        })
      )
    })


    ItemInfoState.deleteList.forEach(item => {
      promises.push(
        new Promise((resolve) => {
          resolve(deleteItem(item))
        })
      )
    })

    Promise.all(promises).then(() => {
      setLoading(false)
      window.location.reload()
    })
  }

  const onCancel = () => navigate("/", { replace: true })

  // Fetch All Items
  useEffect(() => {
    const fetchItems = async () => {
      const ItemList: Array<Items> = await getAllDocs('Items')
      setItems(ItemList)
    }
    if (items.length === 0 && ItemInfoState.deleteList.length === 0) {
      fetchItems()
    } else {
      constructListItems()
    }
  }, [items, ItemInfoState.updateList])

  const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    marginTop: "1vw",
  };

  return (
    <PageLayout>
      <div className='ItemInfo'>
        <Overlay toggle={loading} />
        <Modal onClose={onClose} onDone={onDone} />
        {/* Heading */}
        <div className="HeadingContainer">
          <div className="Heading">
            Item Information
          </div>
        </div>

        {/* Item Info List */}
        <div className="ItemInfoListContainer">
          <table className="table font-size-2-5">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Sub Category</th>
                <th>Unit Name</th>
                <th>Stock Limit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{itemList}</tbody>
          </table>
        </div>

        {/* Action Section */}
        <div className="ActionBar">
          <Button onClick={onCancel} label='Cancel' customClass='bg-purple' />
          <div
            className={`${(ItemInfoState.updateList.length === 0 && ItemInfoState.deleteList.length === 0) ? 'd-none' : 'd-flex'}`} >
            <Button hide={loading} onClick={onSave} label='Save' customClass='bg-green' />
            <ClipLoader color={`#fff`} loading={loading} cssOverride={override} size={15} />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export { ItemInfo }
