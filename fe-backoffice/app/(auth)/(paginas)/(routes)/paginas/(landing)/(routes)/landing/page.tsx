import axios from "axios";
import { PaginasAccordion } from "../../(components)/paginas-accordion";

export default async function LandingPage() {

  // const sections = await axios.get("http://be-auth-srv:9001/api/backoffice/sections").then(data => data.data).catch(err => console.log("error: ", err)) || []

  return <PaginasAccordion />;
}
