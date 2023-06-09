import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import useDataQuery from '../queries/queryData';
import useDeleteMutation from '../queries/deleteMutation';
import Link from 'next/link';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });
type Data = {
  name: string;
  age: number;
  id: string;
};

export default function Home() {
  const { isLoading, data } = useDataQuery();
  const [id, setId] = useState('');
  const { deleteMutation } = useDeleteMutation(id);
  const handleDeletion = (e: string) => {
    setId(e);
    deleteMutation.mutateAsync();
  };

  return (
    <>
      <Head>
        <title>Api route test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className={styles.grid}>
              {data?.map((item: Data) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.flexContainer}>
                    <div className="">
                      <Link href={`/api/${item.id}`}>Nome:{item.name}</Link>
                      <Link href={`/api/${item.id}`}>Idade:{item.age}</Link>
                    </div>
                    <div className={styles.flexButtons}>
                      <Link href={`/editUser/${item.id}`}>Editar</Link>
                      <button onClick={() => handleDeletion(item.id)}>
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link href={'newUser'} className={styles.button}>
            Criar novo usuario
          </Link>
        </div>
      </main>
    </>
  );
}
