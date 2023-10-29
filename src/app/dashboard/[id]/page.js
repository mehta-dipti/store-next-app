import Link from "next/link";
import { Card } from "../components/Card";
import styles from "@/app/dashboard/dashboard.module.scss";

export default async function Page({ params }) {
  const data = await getData(params.id);

  return (
    <div className={styles.dashboard}>
      <Link href="/dashboard">
        <h5 className={styles.back}>Back to all Stores</h5>
      </Link>
      <Card store={data} storeDetails={true}></Card>
    </div>
  );
}

async function getData(id) {
  const res = await fetch(`https://aisthetic.co/api/codingchallenge/stores/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
