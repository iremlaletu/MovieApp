import Banner from "@/components/Banner";
import RowsContainer from "@/components/RowsContainer";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <Banner />
      <RowsContainer />
    </div>
  );
}
