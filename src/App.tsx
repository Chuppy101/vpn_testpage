import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ShareQuestCard } from './components/ShareQuestCard';
import { WheelQuestCard } from './components/WheelQuestCard';
import { heroQuest, pageMeta, secondaryQuests } from './data/pageData';

function App() {
  return (
    <div className="page">
      <Header />

      <main className="page__main">
        <section className="account">
          <h1 className="account__page-title">{pageMeta.title}</h1>

          <div className="account__section-header">
            <h2 className="account__section-title">{pageMeta.sectionTitle}</h2>

            <button className="account__close" type="button" aria-label="Закрыть раздел квестов">
              <span />
              <span />
            </button>
          </div>

          <div className="account__content">
            <div className="account__top">
              <WheelQuestCard />
              <ShareQuestCard quest={heroQuest} featured />
            </div>

            <div className="account__grid">
              {secondaryQuests.map((quest) => (
                <ShareQuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
