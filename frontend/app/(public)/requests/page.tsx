import ActionButton from "@/components/action/button";
import RequestsToolBar from "@/components/action/requestsToolbar";
import { SecondaryPanel } from "@/components/layouts/secondaryPanel";
import { ThreeColumnLayout } from "@/components/layouts/threeColumnLayout";
import TableTabs from "@/components/tableTab/tab";
import { faBoxesPacking, faClipboardCheck, faList, faPenNib, faPencil, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RequestsPage() {
	return (
		<ThreeColumnLayout
			startContent={<RequestsToolBar />}
			middleContent={<TableTabs />}
			endContent={
				<SecondaryPanel>
					<div className="flex gap-2 items-center">
						<span className="font-semibold">Details</span>
						<div className="bg-green-400 w-3 rounded-full aspect-square"></div>
					</div>
					<div className="flex gap-2 items-center text-slate-400 text-xs">
						<span>Edit</span>
						<FontAwesomeIcon icon={faPencil} />
					</div>

					<div className="mt-5 bg-slate-100 rounded-md flex flex-col p-5">
						<span className="font-semibold">Oops! There's nothing to show here.</span>
						<span className="text-xs font-light">Select a request to view details.</span>
					</div>
				</SecondaryPanel>
			}
		/>
	);
}