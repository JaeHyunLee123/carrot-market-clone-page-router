import useSWR from "swr";
import { Favorite, Item as IItem, Transaction } from "@prisma/client";
import Item from "./item";

interface IItemListProp {
  kind: "favs" | "sales" | "purchases";
}

interface IItemWithCount extends IItem {
  _count: {
    favorites: number;
  };
}
interface ITransactionWithItem extends Transaction {
  item: IItemWithCount;
}

interface IFavoriteWithItem extends Favorite {
  item: IItemWithCount;
}

interface IItemsResponse {
  [key: string]: ITransactionWithItem[] | IFavoriteWithItem[];
}

const ItemList = ({ kind }: IItemListProp) => {
  const { data } = useSWR<IItemsResponse>(`/api/users/me/${kind}`);

  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          key={record.id}
          id={record.item.id}
          title={record.item.name}
          price={record.item.price}
          hearts={record.item._count.favorites}
          imageId={record.item.imageId}
        />
      ))}
    </>
  ) : null;
};

export default ItemList;
