import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const screenshots = [
    "/screenshots/1.png",
    "/screenshots/2.png",
    "/screenshots/3.png",
    "/screenshots/4.png",
    "/screenshots/5.png",
    "/screenshots/6.png",
    "/screenshots/7.png",
    "/bg-city.png",
  ];

  // обработка клавиш
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight")
        setCurrentImage((prev) => (prev + 1) % screenshots.length);
      if (e.key === "ArrowLeft")
        setCurrentImage(
          (prev) => (prev - 1 + screenshots.length) % screenshots.length
        );
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, screenshots.length]);

  // плавная анимация загрузки страницы
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* === Основная страница === */}
      <div className={`home-page ${loaded ? "loaded" : ""}`}>
        <section className="hero-section fade-in">
          <div className="hero-content">
            <h1>
              Мы нуждаемся <br />
              <span>именно в Тебе</span>
            </h1>
            <p>
              Мы ищем талантливых людей, способных наполнить город радостью,
              контентом и вдохнуть свежий воздух в наш город. Присоединяйся —
              реализуй свои идеи и получи заслуженную награду за вклад. <br />
              Твой талант — это наше будущее.
            </p>
            <a
              href="https://discord.gg/A8WHKYFxFJ"
              className="join-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Вступить
            </a>

            <div className="stats-section">
              <div className="stat">
                <img src="/icons/avatar.png" alt="Жители" />
                <div>
                  <h3>42+</h3>
                  <p>Жителя</p>
                </div>
              </div>
              <div className="stat">
                <img src="/icons/diamond_block.png" alt="Казна" />
                <div>
                  <h3>9+</h3>
                  <p>AP в казне</p>
                </div>
              </div>
              <div className="stat">
                <img src="/icons/diamond_ore.png" alt="Выплачено" />
                <div>
                  <h3>5+</h3>
                  <p>AP выплачено</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === Блок преимуществ === */}
        <section className="features-section fade-in">
          <h2>Что ждёт жителей города</h2>
          <div className="features-grid">
            <div className="feature-card">
              <img src="/icons/house.png" alt="Жильё" />
              <h3>Жильё</h3>
              <p>Строй собственный дом или живи в уже готовом.</p>
            </div>

            <div className="feature-card">
              <img src="/icons/work.png" alt="Работа" />
              <h3>Работа</h3>
              <p>
                Любая инициатива ценится: строй, организуй, развивай — мы
                вознаградим за старание.
              </p>
            </div>

            <div className="feature-card">
              <img src="/icons/event.png" alt="Ивенты" />
              <h3>Ивенты</h3>
              <p>
                Участвуй в конкурсах, мини-играх и городских праздниках. Веселье
                гарантировано!
              </p>
            </div>

            <div className="feature-card">
              <img src="/icons/testserver.png" alt="Тестовый сервер" />
              <h3>Тестовый Сервер</h3>
              <p>
                Тестовый сервер со всеми необходимыми плагинами, установленный
                на собственном хостинге. Нет ничего лучше, чем удобного
                пространства для творчества.
              </p>
            </div>
          </div>
        </section>

        {/* === Галерея === */}
        <section className="gallery-section fade-in">
          <h2>Вид на наш город</h2>
          <div className="gallery-grid">
            {screenshots.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Город ${i + 1}`}
                onClick={() => {
                  setCurrentImage(i);
                  setLightboxOpen(true);
                }}
              />
            ))}
          </div>
        </section>
      </div>

      {/* === Lightbox теперь вне страницы === */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={screenshots[currentImage]}
            alt="Просмотр"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage(
                (currentImage - 1 + screenshots.length) % screenshots.length
              );
            }}
          >
            ‹
          </button>
          <button
            className="nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage((currentImage + 1) % screenshots.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
