export interface ChartData {
  labels: string[];
  datasets: ChartDataSet[];
}

type ChartDataSet = {
  label: string;
  data: string[];
  backgroundColor: string;
  borderWidth: number;
};
