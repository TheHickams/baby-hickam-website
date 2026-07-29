import type { SiteConfig } from "../config/site";
import {
  daysUntilDueDate,
  formatDueDate,
  formatMonthYear,
  isAfterDueDate,
} from "../utils/dueDate";

interface HeroProps {
  config: SiteConfig;
}

export function Hero({ config }: HeroProps) {
  const postDueDate = isAfterDueDate(config.dueDate);
  const daysRemaining = daysUntilDueDate(config.dueDate);

  return (
    <header className="hero">
      <div className="hero__art" aria-hidden="true">
        <img
          className="hero__palm"
          src={`${import.meta.env.BASE_URL}assets/palm-tree.png`}
          alt=""
          width="500"
          height="673"
          fetchPriority="high"
        />
        <img
          className="hero__clouds"
          src={`${import.meta.env.BASE_URL}assets/cloud-bank.png`}
          alt=""
          width="574"
          height="135"
        />
        <img
          className="hero__birds"
          src={`${import.meta.env.BASE_URL}assets/seagulls.png`}
          alt=""
          width="432"
          height="185"
        />
        <img
          className="hero__sun"
          src={`${import.meta.env.BASE_URL}assets/sun.png`}
          alt=""
          width="210"
          height="203"
        />
        <img
          className="hero__castle"
          src={`${import.meta.env.BASE_URL}assets/sandcastle-and-toys.png`}
          alt=""
          width="427"
          height="317"
        />
        <img
          className="hero__bear"
          src={`${import.meta.env.BASE_URL}assets/teddy-bear.png`}
          alt=""
          width="368"
          height="350"
        />
      </div>

      <div className="hero__inner">
        <div className="hero__title-wrap">
          <img
            className="hero__shell"
            src={`${import.meta.env.BASE_URL}assets/seashell-flourish.png`}
            alt=""
            width="580"
            height="208"
          />
          <p className="eyebrow">A little love is on the way</p>
          <h1>{config.babyName}</h1>
          <div className="hero__flourish" aria-hidden="true">
            <span />
            <span className="hero__heart">♥</span>
            <span />
          </div>
        </div>

        <div className="hero__content">
          <div className="hero__message">
            <p>
              {postDueDate
                ? config.copy.afterDueDateMessage
                : config.copy.beforeDueDateMessage}
            </p>
          </div>

          <div className="due-card" aria-label="Due date">
            <img
              className="due-card__shell"
              src={`${import.meta.env.BASE_URL}assets/seashell-flourish.png`}
              alt=""
              width="580"
              height="208"
            />
            {!postDueDate && <span className="due-card__label">Expected</span>}
            <strong className="due-card__date">
              {postDueDate
                ? formatMonthYear(config.dueDate)
                : formatDueDate(config.dueDate)}
            </strong>
            <img
              className="due-card__wave"
              src={`${import.meta.env.BASE_URL}assets/wave-flourish.svg`}
              alt=""
              width="150"
              height="30"
            />
            {!postDueDate && (
              <div
                className="due-card__countdown"
                aria-label={`${daysRemaining} days to go`}
              >
                <strong>{daysRemaining}</strong>
                <span>Days to Go</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
