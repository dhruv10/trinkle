import Link from 'next/link';

const StatisticsContainer = ({ styles, totalDistance }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Trinkle</p>
      <p className={styles.subtitle}>Distance Measurement App</p>
      <p className={styles.distance}>
        {(totalDistance * 1000).toFixed(2) || 0} m
      </p>
      <p className={styles.text}>Or we can say {totalDistance || 0} Km(s)</p>
      <p className={styles.text}>
        is the total distance between all selected points on the map!
      </p>

      <br />
      <Link href='/about'>Know More &rarr;</Link>
    </div>
  );
};

export default StatisticsContainer;
