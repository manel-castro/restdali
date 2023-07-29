import i18next from "i18next";

export default async function Home({ params }: { params: { lang: string } }) {
  console.log(params);
  return <div>Hello contact {params.lang}</div>;
}
