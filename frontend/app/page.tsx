import SummaryStatWidget from "@/components/donutchart/summaryStatWidget";
import TableSort from "@/components/table/TableSort";

export default function Home() {
	return (
		<>
			<SummaryStatWidget />
			<div className="flex content-center p-8 sm:px-28">
				<TableSort/>
			</div>	
		</>
	);
}