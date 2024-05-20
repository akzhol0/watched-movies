import { useContext } from "react";
import { FilmsProps } from "../../service/types";
import MyButton from "../UI/MyButtons/MyButton";
import { contextData } from "../context/logic";

type CardProps = {
  item: FilmsProps;
};

function Card({ item }: CardProps) {
  const {deleteMovie} = useContext(contextData);

  const spread = [...String(item.rating)];
  const rating = spread.join(".");

  return (
    <div className="w-full h-[500px] relative flex flex-col overflow-hidden rounded-lg text-white">
      <span className="overflow-hidden">
        <img
          src={item.imageCover}
          className="w-full h-[400px] overflow-hidden object-cover hover:scale-105 duration-150"
        />
      </span>
      <strong className="mt-4 cursor-pointer hover:underline">
        {item.title}
      </strong>
      <small className="mt-2">
        {item?.releaseYear}, {item.showType}
      </small>
      <div className="px-2 cursor-default rounded-[6px] bg-blue-600 absolute top-3 left-3">
        <p>{rating}</p>
      </div>
      <div onClick={() => deleteMovie(Number(item.id))} className="px-2 absolute bottom-[104px] right-0">
        <MyButton className="bg-red-600 hover:bg-red-700 rounded-[7px] text-sm">Delete</MyButton>
      </div>  
    </div>
  );
}

export default Card;
