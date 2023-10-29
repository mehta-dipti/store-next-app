import { Dashboard } from "./components/Dashboard";

async function getData() {
  const res = await fetch("https://aisthetic.co/api/codingchallenge/stores");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <Dashboard data={data} />;
}
