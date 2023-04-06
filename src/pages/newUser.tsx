import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import useCreateDataMutation from '../queries/dataMutation';

const inter = Inter({ subsets: ['latin'] });
const NewUser = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const { createDataMutation } = useCreateDataMutation();
  const router = useRouter();

  const handleSubmit = () => {
    console.log('name', name);

    createDataMutation.mutateAsync({ name, age });
    router.push('/');
  };
  return (
    <>
      <Head>
        <title>Criar novo usuario</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Criar novo usuario</h1>

        <div className={styles.card}>
          <div className={styles.formContainer}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="age">Idade</label>
            <input
              type="text"
              name="age"
              id="age"
              onBlur={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              handleSubmit();
            }}
            className={styles.buttonForm}
          >
            Criar
          </button>
        </div>
      </main>
    </>
  );
};

export default NewUser;
