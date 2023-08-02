import axios from "axios";
import { PaginasAccordion } from "../../(components)/paginas-accordion";

export default async function LandingPage() {

  const sections = await axios.get("/api/backoffice_api/sections", { baseURL: "localhost:8080" }).then(data => data.data).catch(err => console.log("error: ", err)) || []

  return <PaginasAccordion sections={sections} />;
}
