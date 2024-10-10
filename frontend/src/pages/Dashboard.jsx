import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import { useSelector } from "react-redux";
import DashUser from "../components/DashUser";

const Dashboard = () => {
	const location = useLocation();
	const [tab, setTab] = useState("");
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			<div className="md:w-64">
				<DashSidebar />
			</div>
			{tab === "user" && <DashUser />}
		</div>
	);
};

export default Dashboard;
