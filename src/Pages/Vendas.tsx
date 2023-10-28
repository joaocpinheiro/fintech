import { useData } from "../Context/DataContext";
import VendaItem from "../Components/VendaItem";
import { useParams } from "react-router-dom";

const Vendas = () => {
  const { data } = useData();
  if (data === null) return null;

  return (
    <div>
      <ul>
        {data.map((venda) => (
          <li key={venda.id}>
            <VendaItem venda={venda} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vendas;
