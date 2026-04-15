// microservice/jsonRead.ts
export default async function LerJSON(id: string) {

  const URL_BASE = process.env.NEXT_PUBLIC_BLOB_URL; 
  const caminhoNoBlob = `${URL_BASE}${id}.json`;

  try {
    const response = await fetch(caminhoNoBlob, {
      cache: 'no-store'
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    return null;
  }
}