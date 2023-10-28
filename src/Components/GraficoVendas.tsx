import {
  ResponsiveContainer,
  XAxis,
  Line,
  CartesianGrid,
  Tooltip,
  LineChart,
  YAxis,
  Legend,
} from "recharts";
import { Ivenda } from "../Context/DataContext";

type VendaDia = {
  data: string;
  pago: number;
  processando: number;
  falha: number;
};

function transformData(data: Ivenda[]): VendaDia[] {
  const dias = data.reduce((acc: { [key: string]: VendaDia }, item) => {
    const dia = item.data.split(" ")[0];
    if (!acc[dia]) {
      acc[dia] = {
        data: dia,
        pago: 0,
        falha: 0,
        processando: 0,
      };
    }
    acc[dia][item.status] += item.preco;
    return acc;
  }, {});

  return Object.values(dias).map((dia) => ({
    ...dia,
    data: dia.data.substring(5),
  }));
}

const GraficoVendas = ({ data }: { data: Ivenda[] }) => {
  const transformedData = transformData(data);
  return (
    <ResponsiveContainer width="99%" height={400}>
      <LineChart data={transformedData}>
        <XAxis dataKey="data" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pago" stroke="#A36AF9" strokeWidth={3} />
        <CartesianGrid stroke="#f5f5f5" />
        <Line
          type="monotone"
          dataKey="processando"
          stroke="#FBCB21"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraficoVendas;
