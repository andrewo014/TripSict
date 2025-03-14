import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./Trip.module.css"; 

const formatDate = (date: Date): string => {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st,"
      : day % 10 === 2 && day !== 12
      ? "nd,"
      : day % 10 === 3 && day !== 13
      ? "rd,"
      : "th,";
  const month = date.toLocaleString("en-US", { month: "short" }); 
  const year = date.getFullYear();
  return `${month} ${day}${suffix} ${year}`;
};

const Dashboard: React.FC = () => {
  const { data: session } = useSession(); 
  const [name, setName] = useState<string>("Guest");

  useEffect(() => {
    if (session) {
      console.log("This is the session: ", session);
      const userName = session?.user?.name ?? "Guest";
      setName(userName); 
    }
  }, [session]);

  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <div className={styles.myDashboard}>
      <div className={styles.welcomeBack}>
        <h4 className={styles.myDashboardLittleText}>Welcome back, {name}</h4>
        <h1 className={styles.myDashboardText}>Dashboard</h1>
      </div>
      <h1 className={styles.currentDate}>{formattedDate}</h1>
    </div>
  );
};

export default Dashboard;
