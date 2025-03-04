import {ReactNode, useState} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [showGlasses, setShowGlasses] = useState(false);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <div 
        className={styles.imageWrapper}
        onClick={() => setShowGlasses(!showGlasses)}
        >
          <img 
            src={require('./prabhav.png').default} 
            alt="Hero Image" 
            className={styles.heroImage}
          />
          <img 
            src={require('./thug_life.png').default} 
            alt="Hero Image" 
            className={`${styles.thugLifeGlasses} ${showGlasses ? styles.showGlasses : ""}`} 
          />
        </div>
        <div className={styles.heroSubtitleContainer}>
          <p className={styles.heroSubtitle}>
          I'm <span className={styles.heroSubtitleSpan}>Prabhav</span>. 
          I get a dopamine rush from learning new things—whether it's diving into new technology, optimizing systems, or tackling real-world challenges. 
          Always exploring, always evolving—because the thrill of problem-solving never gets old.
          </p>
        </div>
        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
