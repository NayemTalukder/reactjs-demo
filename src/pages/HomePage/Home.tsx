import React, { ReactNode, useEffect, useState } from 'react'
import { HomeProps } from './interface'
import './scss/Home.scss'
import { PageLayout } from '../../components'
import { getAllDocs } from '../../services/firebase'
import { Items } from '../../services/firebase/model'
// import { useAppSelector } from '../../store'

const Home: React.FC<HomeProps> = () => {
  const [items, setItems] = useState<Array<Items>>([]);
  const [itemList, setItemList] = useState<ReactNode | null>([]);

  // Fetch All Items
  useEffect(() => {
    const fetchItems = async () => {
      const ItemList: Array<Items> = await getAllDocs('Items')
      setItems(ItemList)
    }
    if (items.length === 0) fetchItems()
    else {
      const list: Array<React.ReactNode> = []
      items.forEach((item) => {
        list.push(
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.stock_limit}</td>
          </tr>
        )
      })
      setItemList(list)
    }
  }, [items]);


  return (
    <PageLayout>
      <div className='Home'>
        {/* Heading */}
        <div className="HeadingContainer">
          <div className="Heading">
            Item Info List
          </div>
        </div>

        {/* Item Info List */}
        <div className="ItemInfoListContainer">
          <table className="table font-size-2-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Stock Limit</th>
              </tr>
            </thead>
            <tbody>{itemList}</tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  )
}

export { Home }
