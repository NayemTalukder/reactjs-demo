import { Items } from '../../services/firebase/model'
export interface ItemInfoProps {

}

export interface ItemInfoState {
  updateList: Array<Items>,
  deleteList: Array<Items>,
  currentId: string,
  recentEditedField: string,
  editedCat: string,
  editedUnitName: string,
  editedStockLimit: number,
}


