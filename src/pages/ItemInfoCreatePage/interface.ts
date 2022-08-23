export interface ItemInfoCreatePageProps {

}

export interface ItemInfoCreateState {
  name: string,
  type: string,
  subCategories: Array<string>,
  unitName: Array<string>,
  stockLimit: number,
  allTypes: Array<string>,
}