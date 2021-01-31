import Head from 'next/head'
import styles from '../styles/About.module.css'

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Trinkle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Trinkle!</a>
        </h1>

        <p className={styles.description}>
          Created by{' '}
          <code className={styles.code}>Dhruv Bhatnagar</code>
        </p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h3>What &rarr;</h3>
            <p>A geospatial distance measurement app.</p>
          </a>

          <a href="#" className={styles.card}>
            <h3>Why &rarr;</h3>
            <p>It's an assignment for SDE role in a data company.</p>
          </a>

          <a
            href="https://github.com/dhruv10"
            className={styles.card}
          >
            <h3>Where &rarr;</h3>
            <p>You can find the code for this app on my GitHub.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
